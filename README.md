# React-countTo

> It's a react component that will count to a target number at a specified duration

 [![react](https://img.shields.io/badge/react-16.12.x-brightgreen.svg)](https://reactjs.org/)
 [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/superhos/react-countTo)
 [![npm](https://img.shields.io/npm/v/react-count-to.svg)](https://www.npmjs.com/package/react-count-to)
 [![npm](https://img.shields.io/npm/dm/react-count-to.svg)](https://npmcharts.com/compare/react-count-to)
 [![minified](https://badgen.net/bundlephobia/min/react-count-to)](https://bundlephobia.com/result?p=react-count-to)
 [![gzip](https://badgen.net/bundlephobia/minzip/react-count-to)](https://bundlephobia.com/result?p=react-count-to)

Inspire by [Vue-countTo](https://github.com/PanJiaChen/vue-countTo).

React-countTo is a easy component for counting to a target number at a specified duration.

## [Try the demo](http://superhos.github.io/reactCountTo/demo/)

### How to use?
```bash
npm install @sevenschan/react-count-to
```

### Example

```react
import { ReactCountTo } from '@sevenschan/react-count-to'

<ReactCountTo className={'demo_1'} ref={'counter'} startVal={1990} endVal={2020} duration={1000}/>
```

### Options
|    Property    |    Description   |   type   |	default	|
| -----------------  | ---------------- | :--------: | :----------: |
| startVal       | the value you want to begin at |Number| 0 |
| endVal         | the value you want to arrive at |Number | 2020 |
| duration  | duration in millisecond | Number | 3000 |
| autoplay     | when mounted autoplay | Boolean | true |
| decimals     | the number of decimal places to show | Number | 0 |
| separator     | the separator | String | , |
| prefix     | the prefix | String | '' |
| suffix     | the suffix | String | '' |
| prefixClassName     | the prefix's class| String | '' |
| prefixStyle     | the prefix's style| String | '' |
| suffixClassName     | the suffix's style| String | '' |
| suffixStyle     | the suffix's style| String | '' |
| useEasing     | is use easing function | Boolean | true |
| easingFn     | the easing function | Function | — |

** notes: when autoplay:true , it will auto start when startVal or endVal change **


### Functions
| Function Name | Description   |
| :--------:   | -----  |
|    start    |  start the countTo  |
|    pause   |  pause  the countTo |
|    resume    |  resume to countTo |
|    stop    |  stop the countTo |

### Events
| Event Name | Description   |
| :--------:   | -----  |
|    onDone    |  when animation is done will callback  |