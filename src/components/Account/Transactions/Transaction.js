import cx from 'classnames'
import React from 'react'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { renameProps } from 'recompose'

const Transaction = ({
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
        {`${{ incoming: '+', outgoing: '-' }[type]} ${numeral(jnt).format('0 0')}`} JNT
      </div>
      <div className="amount">
        <div className="title">Amount</div>
        <div className="value">
          {type === 'outgoing' || isPresale
            ? '–'
            : `${cryptoAmount} ${TXtype} / ${usdAmount} USD`
          }
        </div>
      </div>
      <div className="date">
        <div className="title">Date</div>
        <div className="value">{date}</div>
      </div>
      <div className="hash">
        <div className="title">{isPresale ? 'Comment' : 'TX hash'}</div>
        <div className="value">
          {isPresale
            ? TXhash
            : (status !== 'complete')
              ? '–'
              : (
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
              )
          }
        </div>
      </div>
    </div>
  </div>
)

Transaction.propTypes = {
  jnt: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired,
  date: PropTypes.string.isRequired, // ?
  TXhash: PropTypes.string.isRequired,
  TXtype: PropTypes.oneOf(['BTC', 'ETH']).isRequired,
  /* optional */
  status: PropTypes.oneOf(['complete', 'waiting', 'not_confirmed']),
  usdAmount: PropTypes.number,
  isPresale: PropTypes.bool,
  cryptoAmount: PropTypes.number,
}

Transaction.defaultProps = {
  status: 'waiting',
  usdAmount: undefined,
  isPresale: false,
  cryptoAmount: undefined,
}

const enhance = renameProps({
  is_presale: 'isPresale',
  amount_usd: 'usdAmount',
  amount_cryptocurrency: 'cryptoAmount',
})

export default enhance(Transaction)
