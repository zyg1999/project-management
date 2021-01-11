class LocalStorage {
  constructor(private key: string) {
  }

  set(key: string, val: any) {
    if (typeof val !== 'string') {
      val = JSON.stringify(val);
    }
    window.localStorage.setItem(this._getKey(key), val);
  }

  get(key: string) {
    const res = window.localStorage.getItem(this._getKey(key));
    try {
      if (res) {
        return JSON.parse(res);
      }
    } catch (error) {}
    return res;
  }

  private _getKey(key: string) {
    return `lua-${this.key}-${key}`;
  }
}

export const luaLocal = new LocalStorage('tea');

export function isAuthenticated () {
	return _getCookie();
}

export function authenticateSuccess (token: string) {
	_setCookie(token);
}

export function logout () {
	_setCookie('');
}

function _getCookie () {
	if(luaLocal.get('token')){
	 return true;
	}else{
	 return false;
	}
}

export function _setCookie (token: string) {
	luaLocal.set("token",token);
}