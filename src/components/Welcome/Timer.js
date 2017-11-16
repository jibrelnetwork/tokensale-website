import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { withState, lifecycle } from 'recompose'

const Timer = ({ timeLeft }) => (
  <div className="Timer">
    {timeLeft.asMilliseconds() > 0 ? (
      <div className="counter">
        <div className="day">
          {timeLeft.days()}
        </div>
        <div className="hour">
          {timeLeft.hours()}
        </div>
        <div className="min">
          {timeLeft.minutes()}
        </div>
        <div className="sec">
          {timeLeft.seconds()}
        </div>
      </div>
    ) : (
      <div className="finish">
        ICO started!
      </div>
    )}
  </div>
)

Timer.propTypes = {
  timeLeft: PropTypes.object.isRequired,
}

const enhance = compose(
  withState(
    'timeLeft',
    'setTimeLeft',
    moment.duration(moment.utc('2017-11-27T12:00') - moment.utc())
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentWillMount() {
      const { timeLeft, setTimeLeft } = this.props;
      if (timeLeft.asMilliseconds() > 0) {
        this.timer = setInterval(
          () => setTimeLeft(timeLeft.subtract(1, 'seconds')), 1000
        )
      }
    },
    componentWillUnmount() {
      clearInterval(this.timer)
    },
    componentDidUpdate() {
      if (this.props.timeLeft.asMilliseconds() < 0) {
        clearInterval(this.timer)
      }
    },
  /* eslint-enable */
  })
)

export default enhance(Timer)
