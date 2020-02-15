/**
 * It's a React component that used to count to a target number at a specified duration. 
 * @author SevensChan
 */
import * as React from 'react'
import * as PropTypes from 'prop-types'
import { requestAnimationFrame, cancelAnimationFrame } from 'animation-frame-polyfill'

class ReactCountTo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            localStartVal: 0, // 需要记录当前数到的数，为支持pause功能
            localDuration: 0, // 需要记录当前剩余时间，为支持pause功能
            displayValue: '', // 当前展示
            isCountDown: false, // 是否倒数
            startTime: null, // 动画记录项
            paused: false,  // 是否暂停
            counterId: null, // 动画ID
            startVal: 0,
            duration: 0,
        }
    }

    componentDidMount () {
        const { startVal, endVal, duration, autoplay } = this.props
        this.setState({
            displayValue: this.formatNumber(startVal),
            startVal,
            duration,
            isCountDown: startVal > endVal,
        }, () => {
            if (autoplay) {
                this.start()
            }
        })
    }

    componentWillReceiveProps (nextProps) {
        const { startVal, endVal } = nextProps
        this.setState({
            displayValue: this.formatNumber(startVal),
            isCountDown: startVal > endVal,
            ...nextProps
        })
    }

    /**
     * Start running ainimation
     */
    start() {
        this.setState({
            startTime: null,
            paused: false,
            counterId: requestAnimationFrame((timestamp) => this.process(timestamp))
        })
    }

    /**
     * Pause
     */
    pause() {
        this.setState({
            paused: true
        })
    }

    /**
     * resume
     */
    resume() {
        this.setState({
            paused: false,
            startTime: null,
            startVal: this.state.localStartVal,
            duration: this.state.localDuration,
            counterId: requestAnimationFrame((nexttime) => this.process(nexttime))
        })
    }

    /**
     * stop
     */
    stop() {
        const { counterId } = this.state
        cancelAnimationFrame(counterId)
        this.setState({
            paused: false,
            startTime: null,
            startVal: this.props.startVal,
            duration: this.props.duration,
            displayValue: this.formatNumber(this.props.startVal),
        })
    }

    /**
     * reset
     */
    reset() {
        this.stop()
    }

    process(timestamp) {
        const { startTime, duration, startVal, isCountDown, paused } = this.state
        const { endVal, onDone, useEasing, easingFunc } = this.props
        const curStartTime = startTime || timestamp
        const curCurrentTime = timestamp
        const progress = curCurrentTime - curStartTime
        console.log('progress: ', progress);
        let printVal
        if (isCountDown) {
            printVal = useEasing && easingFunc ? startVal - easingFunc(progress, 0, startVal - endVal, duration) : startVal - ((startVal - endVal) * (progress / duration))
            printVal = useEasing && easingFunc ? easingFunc(progress, startVal, endVal - startVal, duration) : printVal < endVal ? endVal : printVal
        } else {
            printVal = startVal + ((endVal - startVal) * (progress / duration))
            printVal = printVal > endVal ? endVal : printVal
        }

        const displayValue = this.formatNumber(printVal)

        if (progress < duration && !paused) {
            this.setState({
                displayValue,
                startTime: startTime || timestamp,
                localStartVal: printVal,
                localDuration: duration - progress,
                counterId: requestAnimationFrame((nexttime) => this.process(nexttime))
            })
        } else {
            if (!paused) {
                this.setState({
                    // 直接规整
                    displayValue: this.formatNumber(endVal)
                }, () => {
                    onDone && onDone()
                })
            }
        }
    }

    /**
     * Format the value
     */
    formatNumber(num) {
        const { decimals, separator } = this.props
        let numStr =  Number(num).toFixed(decimals) + ''
        if (separator) {
            numStr = this.toThousands(numStr, separator)
        }
        return numStr
    }
    
    toThousands(num, separator) {
        var num = (num || 0).toString(),
            result = '';
        while (num.length > 3) {
            result = separator + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        return result.replace(separator + '.', '.');
    }

    render() {
        const {
            displayValue
        } = this.state
        const {
            prefix,
            suffix,
            prefixClassName,
            prefixStyle,
            suffixClassName,
            suffixStyle
        } = this.props

        return (
            <div 
                className={this.props.className || ''}
                style={{
                    display: 'inline',
                    ...(this.props.style || {})
                }}
                >
                <span className={prefixClassName} style={prefixStyle}>{prefix}</span>
                <span>{displayValue}</span>
                <span className={suffixClassName} style={suffixStyle}>{suffix}</span>
            </div>
        )
    }
}

ReactCountTo.propTypes = {
  // Start value
  startVal: PropTypes.number,

  // End value
  endVal: PropTypes.number,

  // Duration of animation
  duration: PropTypes.number,

  // Auto play
  autoplay: PropTypes.bool,

  // Decimal digit
  decimals: PropTypes.number,

  // Prefix
  prefix: PropTypes.string,
  
  // Suffix
  suffix: PropTypes.string,

  // Separator
  separator: PropTypes.string,

  // use Easing
  useEasing: PropTypes.bool,

  // easing function
  easingFunc: PropTypes.func,

  // onDone callback
  onDone: PropTypes.func,

  // Style
  prefixClassName: PropTypes.array,

  prefixStyle: PropTypes.object,

  suffixClassName: PropTypes.array,

  suffixStyle: PropTypes.object
}

ReactCountTo.defaultProps = {
    startVal: 0,
    endVal: 2020,
    duration: 3000,
    autoplay: false,
    decimals: 0,
    prefix: '',
    suffix: '',
    separator: '',
    useEasing: true,
    easingFunc: (t, b, c, d) => {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    },
    prefixClassName: [],
    prefixStyle: {},
    suffixClassName: [],
    suffixStyle: {}
  }

  export default ReactCountTo