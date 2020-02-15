import React from 'react'
import jsxToString from 'jsx-to-string'
import GithubCorner from 'react-github-corner'
import { ReactCountTo } from './lib'
import './demo.css'

export default class Demo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startVal: 2020,
            endVal: 1990,
            prefix: '¥',
            suffix: 'RMB'
        }
    }

    start(counter) {
        this.refs[counter].start()   
    }

    pause(counter) {
        this.refs[counter].pause()   
    }

    resume(counter) {
        this.refs[counter].resume()   
    }

    stop(counter) {
        this.refs[counter].stop()   
    }

    render() {
        const { startVal, endVal, prefix, suffix } = this.state

        return <div className={'demo'}>
           <GithubCorner bannerColor={'#159fee'} href={'https://github.com/superhos/react-countTo'}/> 
           <h1>React-CountTo</h1>
           <div className={'sample'}>
                <h2>Simple example</h2>
                <ReactCountTo className={'demo_1'} ref={'counter'} startVal={1990} endVal={2020} duration={1000}/>
                <div className={'control'}>
                    <button onClick={() => this.start('counter')}>Start</button>
                    <button onClick={() => this.pause('counter')}>Pause</button>
                    <button onClick={() => this.resume('counter')}>Resume</button>
                    <button onClick={() => this.stop('counter')}>Stop / Reset</button>
                </div>
                <div className={'code'}>
                    {jsxToString(<ReactCountTo className={'demo_1'} ref={'counter'} startVal={1990} endVal={2020} duration={1000}/>)}
                </div>
           </div>
           <div className={'sample'}>
                <h2>Count down example</h2>
                <ReactCountTo 
                    className={'demo_2'}
                    ref={'counter2'}
                    decimals={2}
                    prefix={prefix}
                    suffix={suffix}
                    startVal={startVal}
                    endVal={endVal}
                    prefixStyle={{marginRight: 10}}
                    suffixStyle={{marginLeft: 10}}
                    useEasing={false}
                    separator={','}/> 
                <div className={'control'}>
                    <label>startVal: <input value={startVal} onChange={(val) => this.setState({ startVal: +val.currentTarget.value})}/></label>
                    <label>endVal: <input value={endVal} onChange={(val) => this.setState({ endVal: +val.currentTarget.value})}/></label>
                    <label>prefix: <input value={prefix} onChange={(val) => this.setState({ prefix: val.currentTarget.value})}/></label>
                    <label>suffix: <input value={suffix} onChange={(val) => this.setState({ suffix: val.currentTarget.value})}/></label>
                    <div style={{marginTop: 20}}>
                        <button onClick={() => this.start('counter2')}>Start</button>
                        <button onClick={() => this.pause('counter2')}>Pause</button>
                        <button onClick={() => this.resume('counter2')}>Resume</button>
                        <button onClick={() => this.stop('counter2')}>Stop / Reset</button>
                    </div>
                </div>
                <div className={'code'}>
                    {jsxToString(<ReactCountTo 
                    className={'demo_2'}
                    ref={'counter2'}
                    decimals={2}
                    prefix={'¥'}
                    suffix={'RMB'}
                    startVal={startVal}
                    endVal={1990}
                    prefixStyle={{marginRight: 10}}
                    suffixStyle={{marginLeft: 10}}
                    useEasing={false}
                    separator={','}/> )}
                </div>
           </div>
        </div>
    }
}