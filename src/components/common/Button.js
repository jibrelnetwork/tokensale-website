// @flow

import React from 'react'
import cx from 'classnames'

import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

type Props = {
    t: TFunction,
    value: string,
    size?: 'big' | 'small' | 'medium',
    colorStyle?: 'light' | 'dark' | 'transparent' | 'white',
    disabled?: boolean,
    className?: string,
    type?: 'submit' | 'button',
    onClick?: (e?: SyntheticEvent<HTMLButtonElement>) => void,
}

const Button = ({ t, value, size, colorStyle, disabled, className, onClick, type }: Props) => (
  <button
    type={type}
    disabled={disabled}
    className={cx('button', size, colorStyle, { disabled }, className)}
    onClick={(e: SyntheticEvent<HTMLButtonElement>) => !disabled && onClick && onClick(e)}
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
  onClick: () => undefined,
}

export default translate()(Button)
