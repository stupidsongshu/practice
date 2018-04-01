import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Comment from './Comment/Comment'
import Clock from './Clock/Clock'

const comment = {
  date: new Date(),
  text: 'I hope you enjoy lening React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
}

// function Clock() {
// 	return (
// 		<div>
// 			It is {new Date().toLocaleTimeString()}
// 		</div>
// 	)
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Comment
          date={comment.date}
          text={comment.text}
          author={comment.author}
          />
        <Clock increment={1} />
      </div>
    );
  }
}

export default App;
