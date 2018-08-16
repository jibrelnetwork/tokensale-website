// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { ModalOpenButton } from '../../common'
import type { State } from '../../../modules'

import R from '../../../routes.yaml'

type Props = {
  t: TFunction,
  isLoggedIn: boolean,
}

const Verified = ({ t, isLoggedIn }: Props) => (
  <div className="email-verification">
    <div className="img verified" />
    <p>{t('auth.emailVerification.success')}</p>
    {isLoggedIn &&
      <Link to={R.VERIFY.path} className="button medium dark">{t('auth.emailVerification.continue')}</Link>
    }
    {!isLoggedIn &&
      <ModalOpenButton
        modalName="login"
        value="auth.emailVerification.complete"
      />
    }
  </div>
)

const mapStateToProps = (state: State) => ({
  isLoggedIn: !!state.auth.token,
})

export default compose(
  translate(),
  connect(mapStateToProps)
)(Verified)
