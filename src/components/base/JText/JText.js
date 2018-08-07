// @flow

import React from 'react'
import classNames from 'classnames'
import { translate } from 'react-i18next'

import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction,
  value: string,
  align: null | 'center',
  fontCase: null | 'upper',
  whiteSpace: 'nowrap' | 'wrap',
  weight: null | 'bold' | 'bolder',
  color: 'blue' | 'gray' | 'red' | 'sky' | 'white' | 'default',
  size: 'small' | 'normal' | 'large' | 'header' | 'title' | 'mnemonic' | 'start1' | 'start2',
}

const JText = ({ t, value, size, color, weight, fontCase, whiteSpace, align }: Props) => (
  <span
    className={classNames(
      `j-text -${size} -${color} -${whiteSpace}`,
      align && `-${align}`,
      weight && `-${weight}`,
      fontCase && `-${fontCase}`,
    )}
  >
    {t(value)}
  </span>
)

JText.defaultProps = {
  align: null,
  weight: null,
  size: 'normal',
  color: 'gray',
  fontCase: null,
  whiteSpace: 'wrap',
}

export default translate()(JText)
