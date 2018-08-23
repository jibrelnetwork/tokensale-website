// @flow

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'
import { withState } from 'recompose'
import { get, compose, isEmpty } from 'lodash/fp'

import Filter from './Filter'
import Balance from './Balance'
import Transaction from './Transaction'

import type { State } from '../../../modules'

type TransactionFilter = 'all' | 'incoming' | 'outgoing'

type Props = {
  t: TFunction,
  list: Array<any>,
  filter: TransactionFilter,
  setFilter: Function,
}

const Transactions = ({ t, list, filter, setFilter }: Props) => (
  <div className="Transactions">
    <div className="tabs clear">
      <Filter
        set={setFilter}
        active={filter}
        list={[
          { type: 'all', label: t('account.transactions.filters.all') },
          { type: 'incoming', label: t('account.transactions.filters.incoming') },
          { type: 'outgoing', label: t('account.transactions.filters.outgoing') },
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
            {t('account.transactions.empty')}
          </div>
        </div>
      )}
    </div>
  </div>
)

const filterTransactions = (transactions: Array<any>, type: TransactionFilter): Array<any> =>
  transactions.filter((transaction) => transaction.type === type)

const transactionSelector = (transactions: Array<any>, filter: TransactionFilter): Object => get(
  filter, {
    all: transactions,
    incoming: filterTransactions(transactions, 'incoming'),
    outgoing: filterTransactions(transactions, 'outgoing'),
  }
)

const mapStateToProps = (state: State, { filter }: {filter: TransactionFilter}) => ({
  list: transactionSelector(state.account.transactions, filter),
  balance: state.account.balance,
})

const enhance = compose(
  translate(),
  withState(
    'filter',
    'setFilter',
    'all',
  ),
  connect(
    mapStateToProps,
    null,
  ),
)

export default enhance(Transactions)
