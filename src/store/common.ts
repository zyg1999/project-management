import { getModuleInfo, getModuleGetter, immerReducer } from '@utils/get-module-action';

const namespace = 'common';
const model = {
  namespace,
  state: {},
  effects: {
    async getData() {
      await console.log('aa')
    },
  },
  reducers: {
    updateState(state: any, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
const {
  action, getLoading,
} = getModuleInfo(namespace, model.effects, model.reducers);
export const common = {
  action,
  getLoading,
  register: immerReducer(model),
  getState:  getModuleGetter<any>(namespace),
};
