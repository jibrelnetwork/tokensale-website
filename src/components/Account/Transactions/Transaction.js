import cx from 'classnames'
import React from 'react'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { translate } from 'react-i18next'
import { renameProps } from 'recompose'

const Transaction = ({
  t,
  jnt,
  type,
  date,
  TXhash,
  TXtype,
  status,
  usdAmount,
  isPresale,
  cryptoAmount,
}) => (
  <div className="Transaction">
    <div className={cx('item', type, status, isPresale && 'presale', 'clear')}>
      <div className="type" />
      <div className="jnt">
        {`${{ incoming: '+', outgoing: '-' }[type]} ${numeral(jnt).format('0,0')}`} JNT
      </div>
      <div className="amount">
        <div className="title">{t('account.transactions.transaction.amount')}</div>
        <div className="value">
          {type === 'outgoing' || isPresale
            ? '–'
            : `${cryptoAmount} ${TXtype} / ${usdAmount} USD`
          }
        </div>
      </div>
      <div className="date">
        <div className="title">{t('account.transactions.transaction.date')}</div>
        <div className="value">{date}</div>
      </div>
      <div className="hash">
        <div className="title">
          {isPresale
            ? t('account.transactions.transaction.comment')
            : t('account.transactions.transaction.TXHash')
          }
        </div>
        <div className="value">
          {isPresale
            ? TXhash
            : status === 'success' || status === 'pending'
              ? (
                <a
                  href={{
                    ETH: `https://etherscan.io/tx/${TXhash}`,
                    BTC: `https://blockchain.info/tx/${TXhash}`,
                  }[TXtype]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {TXhash ? `${TXhash.substr(0, 13)}...` : null}
                </a>
              ) : {
                not_confirmed: 'NOT CONFIRMED',
                confirmed: 'CONFIRMED',
                fail: 'FAILED',
              }[status]
          }
        </div>
      </div>
    </div>
  </div>
)

Transaction.propTypes = {
  t: PropTypes.func.isRequired,
  jnt: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired,
  date: PropTypes.string.isRequired, // ?
  TXhash: PropTypes.string.isRequired,
  TXtype: PropTypes.oneOf(['BTC', 'ETH']).isRequired,
  status: PropTypes.oneOf(['not_confirmed', 'confirmed', 'pending', 'success', 'fail']).isRequired,
  /* optional */
  usdAmount: PropTypes.number,
  isPresale: PropTypes.bool,
  cryptoAmount: PropTypes.number,
}

Transaction.defaultProps = {
  usdAmount: undefined,
  isPresale: false,
  cryptoAmount: undefined,
}

export default compose(
  translate(),
  renameProps({
    is_presale: 'isPresale',
    amount_usd: 'usdAmount',
    amount_cryptocurrency: 'cryptoAmount',
  })
)(Transaction)
