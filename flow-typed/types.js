// @flow

declare module 'types' {
  /**
   * General
   */
  declare type FSA = {
    +type: string,
    +payload: Object,
    +meta: Object,
    +error: boolean,
  }

  declare type Next = FSA => FSA
  declare type Dispatch = Object => Next
  declare type GetState = () => State

  declare type Store = {
    dispatch: Dispatch,
    getState: GetState,
  }

  /**
   * Account
   */
  declare type PopupState = 'close' | 'open' | 'shake' | 'opening' | 'closing'

  declare type PopupNames = 'login' | 'logout'

  declare type AccountState = {
    +modals: {
      +setAddress: PopupState,
      +setPassword: PopupState,
      +withdraw: PopupState,
      +kycStatus: PopupState,
      +loginModal: PopupState,
      +registerModal: PopupState,
      +resetPasswordEmail: PopupState,
      +resetPassword: PopupState,
    },
    +dashboard: {
      +accountData: {
        +firstName: string,
        +lastName: string,
        +email: string,
      },
      +isOpen: boolean,
    },
    +transactions: Array<any>,
    +balance: number,
    +btcAddress: ?string,
    +ethAddress: ?string,
    +address: ?string,
    +isAddressChangeRequested: boolean,
    +isWithdrawRequested: boolean,
    +passwordChangeConfirmModal: {
      +isOpen: boolean,
      +status: 'request' | // Request to password change sended to server
        'success' | // Email with password reset link sended to user
        'failure' | // Error of sending password reset link to user
        'confirm', // Waiting confirmation from user for password change
      +message: ?string,
    },
  }

  /**
   * Auth
   */
  declare type VerificationStatus = 'Preliminarily Approved' | 'Pending' | 'Approved' | 'Declined'

  declare type AuthState = {
    +token: ?string,
    +verifyStatus: ?VerificationStatus,
    +isSupportLinkShown: boolean
  }

  /**
   * Tokens
   */
  declare type TokenState = {
    +raised: number
  }

  /**
   * Verify
   */
  declare type VerifyState = {
    +stage: string
  }

  /**
   * Entire state
   */
  declare type State = {
    +account: AccountState,
    +auth: AuthState,
    +tokens: TokenState,
    +verify: VerifyState
  }
}
