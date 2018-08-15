// @flow

import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { compose } from 'lodash/fp'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'

import type { TFunction } from 'react-i18next'

type Props = {
  t: TFunction,
  timeLeft: Object,
}

const Timer = ({ t, timeLeft }: Props) => (
  <div className="Timer">
    <div className="counter">
      <div className="row clear">
        <div className="col-3">
          <div className="time">{numeral(timeLeft.days()).format('00')}</div>
          <div className="title">{t('index.timer.days')}</div>
        </div>
        <div className="col-3">
          <div className="time">{numeral(timeLeft.hours() > 0 ? timeLeft.hours() : 0).format('00')}</div>
          <div className="title">{t('index.timer.hours')}</div>
        </div>
        <div className="col-3">
          <div className="time">{numeral(timeLeft.minutes() > 0 ? timeLeft.minutes() : 0).format('00')}</div>
          <div className="title">{t('index.timer.minutes')}</div>
        </div>
        <div className="col-3">
          <div className="time">{numeral(timeLeft.seconds() > 0 ? timeLeft.seconds() : 0).format('00')}</div>
          <div className="title">{t('index.timer.seconds')}</div>
        </div>
      </div>
    </div>
  </div>
)

const enhance = compose(
  translate(),
  lifecycle({
    state: { timeLeft: moment.duration(moment.utc('2018-10-26T12:00') - moment.utc()) },
    /* eslint-disable fp/no-this */
    componentWillMount() {
      const { timeLeft } = this.state
      if (timeLeft.asMilliseconds() > 0) {
        this.timer = setInterval(
          () => this.setState({
            timeLeft: timeLeft.subtract(1, 'seconds'),
          }),
          1000
        )
      }
    },
    componentWillUnmount() {
      clearInterval(this.timer)
    },
    componentDidUpdate() {
      if (this.state.timeLeft.asMilliseconds() < 0) {
        clearInterval(this.timer)
      }
    },
  /* eslint-enable */
  })
)

export default enhance(Timer)
