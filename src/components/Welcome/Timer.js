import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { lifecycle } from 'recompose'

const Timer = ({ timeLeft }) => (
  <div className="Timer">
    <div className="counter">
      <div className="row clear">
        <div className="col-3">
          <div className="time">{timeLeft.days()}</div>
          <div className="title">Days</div>
        </div>
        <div className="col-3">
          <div className="time">{timeLeft.hours()}</div>
          <div className="title">Hours</div>
        </div>
        <div className="col-3">
          <div className="time">{timeLeft.minutes()}</div>
          <div className="title">Minutes</div>
        </div>
        <div className="col-3">
          <div className="time">{timeLeft.seconds()}</div>
          <div className="title">Seconds</div>
        </div>
      </div>
    </div>
  </div>
)

Timer.propTypes = {
  timeLeft: PropTypes.object.isRequired,
}

const enhance = lifecycle({
  state: { timeLeft: moment.duration(moment.utc('2017-11-27T12:00') - moment.utc()) },
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

export default enhance(Timer)
