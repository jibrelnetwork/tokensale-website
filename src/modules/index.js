// @flow

import * as auth from './auth'
import * as tokens from './tokens'
import * as modals from './modals'

import type { ModalState, PopupNames } from './modals'
import type { AuthState } from './auth'
import type { TokenState } from './tokens'

export type State = {
  +modals: ModalState,
  +auth: AuthState,
  +tokens: TokenState,
}

export type { PopupNames }

export { auth, modals, tokens }
