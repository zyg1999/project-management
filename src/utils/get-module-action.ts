import { map } from 'lodash';
import { Action } from 'redux';
import produce from 'immer';

export type IAction<T> = {
  [K in keyof (T & Action)]: (T & Action)[K];
};

// action函数的参数是不带type的，type会默认加上，所以要去除
type IActionFun<T> = (action: Pick<T, Exclude<keyof T, keyof Action>>) => { type: string; };

type IThunkAction<T> = {
  [K in keyof T]: T[K] extends (...args: infer B) => infer C
    ? (...args: B) => (_state: any, _action: any) => C
    : never
};
interface IThunk {
  [key: string]: (...args: any[]) => any;
}

// export type Reducer<S> = (state: S, action: AnyAction) => S;
type ReducerAction<T> = T extends () => any ? () =>  { type: string; } :
  T extends (state: any, action: infer M) => any
    ? IActionFun<M>
    : never;
type IReducerMap<T> = {
  [K in keyof T]: ReducerAction<T[K]>;
};
type IReducerAction<T> = T extends [infer M, any] | infer M ? IReducerMap<M> : never;

export interface IActions<T, K> {
  action: IThunkAction<T> & IReducerAction<K>;
  getLoading: {
    [key in keyof (T & K)]: (state: any) => boolean
  };
}
export function getModuleInfo<T extends {}, K extends {}>(namespace: string, effects: T, reducers: K) {
  const action: any = {};
  const getLoading: any = {};
  map(reducers, (_item, key) => {
    action[key] = (param: any) => ({ ...param, type: `${namespace}/${key}` });
    getLoading[key] = (state: any) => state.loading.effects[`${namespace}/${key}`];
  });
  map(effects, (func: any, key: string) => {
    if (action[key]) {
      throw Error('effects和reducers不能重名,key:' + key);
    }
    action[key] = (...args: any[]) => (_state: any, _action: any) => func(...args);
  });
  // tslint:disable-next-line:no-object-literal-type-assertion
  return { action, getLoading } as IActions<T, K>;
}

export interface IModuleGetter<T> {
  (state: any): T;
  <K extends keyof T>(state: any, key: K): T[K];
}

export function getModuleGetter<T>(namespace: string): IModuleGetter<T> {
  return <K extends keyof T>(state: any, key?: K) => {
    return key ? state[namespace][key] : state[namespace];
  };
}

export function getThunkAction<T extends IThunk>(plainObj: T) {
  const res: any = {};
  map(plainObj, (func: any, key: string) => {
    res[key] = (...args: any[]) => (_state: any, _action: any) => func(...args);
  });
  return res as IThunkAction<T>;
}

export function objectTransFormReducer(data: any) {
  return (curState: any = data.state, action: any) => {
    const runFunc = data.reducers[action.type.replace(data.namespace + '/', '')];
    if (runFunc && typeof runFunc === 'function') {
      return runFunc(curState, action);
    }
    return curState;
  };
}

export function immerReducer(reducerMap: any) {
  return (curState: any = reducerMap.state, action: any) => {
    const runFunc = reducerMap.reducers[action.type.replace(reducerMap.namespace + '/', '')];
    let ret: any;
    ret = produce(curState, (newState: any) => {
      if (runFunc && typeof runFunc === 'function') {
        const compatiableRet = runFunc(newState, action);
        if (compatiableRet !== undefined) {
          // which means you are use redux pattern
          // it's compatiable. https://github.com/mweststrate/immer#returning-data-from-producers
          return compatiableRet;
        }
      }
    });
    return ret === undefined ? {} : ret;
  };
}
