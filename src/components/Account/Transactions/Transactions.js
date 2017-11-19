import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get, compose } from 'lodash/fp'
import { lifecycle, withState } from 'recompose'
import * as actions from '../../../actions'
import Transaction from './Transaction'
import Filter from './Filter'

// Undefined state with empty transactions list

const Transactions = ({ list, balance, filter, setFilter }) => (
  <div className="Transactions">
    <div className="tabs clear">
      <Filter
        set={setFilter}
        active={filter}
        list={[
          { type: 'all', label: 'All transactions' },
          { type: 'incoming', label: 'Incoming transactions' },
          { type: 'outgoing', label: 'Outgoing transactions' },
          { type: 'jnt', label: 'JNT transfers' },
        ]}
      />
      <div className="button bordered pull-right">Withdraw</div>
      <div className="balance pull-right">{`Balance – ${balance} JNT`}</div>
    </div>
    <div className="transactions">
      {list.map((transaction) => (
        <Transaction key={transaction.hash} {...transaction} />
      ))}
    </div>
  </div>
)

Transactions.propTypes = {
  list: PropTypes.array.isRequired,
  filter: PropTypes.oneOf(['all', 'jnt', 'incoming', 'outgoing']).isRequired,
  balance: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
}

const filterTransactions = (transactions, type) =>
  transactions.filter((transaction) => transaction.type === type)

const transactionSelector = (transactions, filter) => get(
  filter, {
    jnt: [],
    all: transactions,
    incoming: filterTransactions(transactions, 'incoming'),
    outgoing: filterTransactions(transactions, 'outgoing'),
  }
)

const mapStateToProps = (state, { filter }) => ({
  list: transactionSelector(state.account.transactions, filter),
  balance: state.account.balance,
})

const mapDispatchToProps = {
  download: actions.account.transactions.download,
}

const enhance = compose(
  withState(
    'filter',
    'setFilter',
    'all',
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillMount() {
      // eslint-disable-next-line fp/no-this
      this.props.download()
    },
  }),
)

export default enhance(Transactions)
