// Write your code here
import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timerLimit: 25, timeInSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeInSeconds = () => {
    const {timerLimit, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onClickStartPauseButton = () => {
    const {isTimerRunning, timeInSeconds, timerLimit} = this.state
    const isTimerCompleted = timeInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onDecreaseTimer = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onIncreaseTimer = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  onClickResetButton = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false, timerLimit: 25, timeInSeconds: '00'})
  }

  renderTimerLimitController = () => {
    const {timerLimit, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="timer-title">Set Timer limit</p>
        <div className="timer-limit-buttons-container">
          <button
            type="button"
            className="increase-decrease-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimer}
          >
            -
          </button>
          <div className="timer-limit-container">
            <p className="set-timer">{timerLimit}</p>
          </div>
          <button
            type="button"
            className="increase-decrease-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const playAndPauseImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altPlayPauseText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-pause-reset-container">
        <button
          type="button"
          className="button-icon"
          onClick={this.onClickStartPauseButton}
        >
          <img
            src={playAndPauseImage}
            alt={altPlayPauseText}
            className="play-pause-image"
          />
          <p className="start-pause-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="button-icon"
          onClick={this.onClickResetButton}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="play-pause-image"
          />
          <p className="start-pause-text">Reset</p>
        </button>
      </div>
    )
  }

  onRunningTimer = () => {
    const {timerLimit, timeInSeconds} = this.state
    const totalTimeInSeconds = timerLimit * 60 - timeInSeconds
    const minutes = Math.floor(totalTimeInSeconds / 60)
    const seconds = Math.floor(totalTimeInSeconds % 60)
    const minutesInStringFormat = minutes <= 9 ? `0${minutes}` : minutes
    const SecondsInStringFormat = seconds <= 9 ? `0${seconds}` : seconds

    return `${minutesInStringFormat}:${SecondsInStringFormat}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="responsive-timer-container">
          <div className="show-timer-limit-container">
            <div className="display-timer">
              <h1 className="timer-limit-value">{this.onRunningTimer()}</h1>
              <p className="timer-limit-text">{labelText}</p>
            </div>
          </div>
          <div className="timer-controllers-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
