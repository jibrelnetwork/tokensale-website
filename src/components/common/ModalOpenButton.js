// @flow

import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import { showModal } from '../../modules/modals'
import type { PopupNames } from '../../modules/modals'

type Props = {
    t: TFunction,
    modalName: PopupNames,
    value: string,
    size?: 'big' | 'small' | 'medium',
    colorStyle?: 'light' | 'dark' | 'transparent' | 'white',
    disabled?: boolean,
    className?: string,
    onShowModalClick: (modalName: string) => void,
}

const Button = ({ t, value, size, colorStyle, disabled, className, onShowModalClick, modalName }: Props) => (
  <button
    disabled={disabled}
    className={cx('button', size, colorStyle, { disabled }, className)}
    onClick={() => !disabled && onShowModalClick(modalName)}
  >
    {t(value)}
  </button>
)

Button.defaultProps = {
  size: 'medium',
  colorStyle: 'dark',
  type: 'button',
  className: undefined,
  disabled: false,
}

const mapDispatchToProps = (dispatch: Function) => ({
  onShowModalClick: (modalName) => dispatch(showModal(modalName)),
})

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(Button)
