import React from 'react'
import cx from 'classnames'
import numeral from 'numeral'
import PropTypes from 'prop-types'

const Transaction = ({ jnt, type, date, hash, status, amount }) => (
  <div className="Transaction">
    <div className={cx('item', type, status, 'clear')}>
      <div className="type" />
      <div className="jnt">
        {`${{ incoming: '+', outgoing: '-' }[type]} ${numeral(jnt).format('0 0')}`} JNT
      </div>
      <div className="amount">
        <div className="title">Amount</div>
        <div className="value">{amount}</div>
      </div>
      <div className="date">
        <div className="title">Date</div>
        <div className="value">{date}</div>
      </div>
      <div className="hash">
        <div className="title">TX hash</div>
        <div className="value">
          <a href={`https://etherscan.io/tx/${hash}`} target="_blank">{hash}</a>
        </div>
      </div>
    </div>
  </div>
)

Transaction.propTypes = {
  jnt: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired,
  date: PropTypes.string.isRequired, // ?
  hash: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['complete', 'waiting']).isRequired,
}

export default Transaction
