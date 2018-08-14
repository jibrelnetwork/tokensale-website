// @flow

import type { State } from '../modules'
import type { AccountState } from '../modules/account'

export const accountSelector = (state: State): AccountState => state.account
