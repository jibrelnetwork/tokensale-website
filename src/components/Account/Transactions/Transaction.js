import React from 'react'
import cx from 'classnames'
import numeral from 'numeral'
import { renameProps } from 'recompose'
import PropTypes from 'prop-types'

const Transaction = ({
  jnt,
  type,
  date,
  TXhash,
  TXtype,
  status,
  usdAmount,
  cryptoAmount,
}) => (
  <div className="Transaction">
    <div className={cx('item', type, status, 'clear')}>
      <div className="type" />
      <div className="jnt">
        {`${{ incoming: '+', outgoing: '-' }[type]} ${numeral(jnt).format('0 0')}`} JNT
      </div>
      <div className="amount">
        <div className="title">Amount</div>
        {/* eslint-disable camelcase */}
        <div className="value">{`${cryptoAmount} ${TXtype} / ${usdAmount} USD `}</div>
      </div>
      <div className="date">
        <div className="title">Date</div>
        <div className="value">{date}</div>
      </div>
      <div className="hash">
        <div className="title">TX hash</div>
        <div className="value">
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
  status: PropTypes.oneOf(['complete', 'waiting']).isRequired,
  usdAmount: PropTypes.number,
  cryptoAmount: PropTypes.number,
}

Transaction.defaultProps = {
  usdAmount: undefined,
  cryptoAmount: undefined,
}

const enhance = renameProps({
  amount_usd: 'usdAmount',
  amount_cryptocurrency: 'cryptoAmount',
})

export default enhance(Transaction)
