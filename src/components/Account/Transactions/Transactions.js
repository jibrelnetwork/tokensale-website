import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { lifecycle, withState } from 'recompose'
import { get, compose, isEmpty } from 'lodash/fp'
import * as actions from '../../../actions'
import Transaction from './Transaction'
import Balance from './Balance'
import Filter from './Filter'

const Transactions = ({ list, filter, setFilter }) => (
  <div className="Transactions">
    <div className="tabs clear">
      <Filter
        set={setFilter}
        active={filter}
        list={[
          { type: 'all', label: 'All transactions' },
          { type: 'incoming', label: 'Incoming transactions' },
          { type: 'outgoing', label: 'JNT transfers' },
        ]}
      />
      <Balance />
    </div>
    <div className="transactions">
      {!isEmpty(list) ? (
        // eslint-disable-next-line react/no-array-index-key
        list.map((transaction, index) => <Transaction key={index} {...transaction} />)
      ) : (
        <div className="empty">
          <div className="icon" />
          <div className="text">
            The jWallet makes it easy and safe to store and transfer value of any tokens
          </div>
        </div>
      )}
    </div>
  </div>
)

Transactions.propTypes = {
  list: PropTypes.array.isRequired,
  filter: PropTypes.oneOf(['all', 'incoming', 'outgoing']).isRequired,
  setFilter: PropTypes.func.isRequired,
}

const filterTransactions = (transactions, type) =>
  transactions.filter((transaction) => transaction.type === type)

const transactionSelector = (transactions, filter) => get(
  filter, {
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
  requestStart: actions.account.transactions.request,
  requestCancel: actions.account.transactions.requestCancel,
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
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.requestStart() },
    componentWillUnmount() { this.props.requestCancel() },
    /* eslint-enable */
  }),
)

export default enhance(Transactions)
