import { push } from 'react-router-redux'
import * as AUTH from '../constants/auth';

export const logout = (store) => (next) => (action) => {
  if (action.type === AUTH.LOGOUT) {
    if (store.getState().router.location.pathname !== '/welcome') {
      store.dispatch(push('/welcome'))
    }
    return next(action);
  } else {
    return next(action);
  }
}
