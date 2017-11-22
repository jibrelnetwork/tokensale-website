import * as MODALS from '../../constants/account/modals'

export const changeState = (modalName, modalState) => ({
  type: MODALS.CHANGE_STATE,
  payload: { modalName, modalState },
})
