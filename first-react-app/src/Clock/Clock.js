import React, { Component } from 'react'
import FormattedDate from './FormattedDate'

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            count: 0
        };
        this.count = 0;
        console.log('初始化')
    }

    componentWillUnmount() {
        console.log('componentUnmount')
        clearInterval(this.timerId)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.timerId = setInterval(() => {
            this.tick()
        }, 1000)
    }

    tick() {
        // this.setState({
        //     date: new Date(),
        //     // count: this.state.count++, // wrong
        //     count: this.state.count + 1,
        // })

        // 第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数
        this.setState((prevState, props) => {
            // console.log(prevState)
            // console.log(props)
            return {
                date: new Date(),
                count: prevState.count + props.increment
            }
        })

        this.count += 1
    }

    render() {
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
                <h2>子组件：<FormattedDate date={this.state.date} /></h2>
                <h2>次数1：{this.state.count}</h2>
                <h2>次数2：{this.count}</h2>
            </div>
        )
    }
}

export default Clock;
