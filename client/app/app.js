import './styles/main.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import socket_communication from './socket.js'

function App() {
  return (
    <div>
      <div id="message-container"></div>
      <form id="form">
        <label htmlFor="message-input">Message</label>
        <input type="text" id="message-input"></input>
        <button type="submit" id="send-button">Send</button>
        <label htmlFor="room-input">Room</label>
        <input type="text" id="room-input"></input>
        <button type="button" id="room-button">Join</button>
      </form>
    </div>
  )
}

const app = ReactDOM.createRoot(document.getElementById("app"))
app.render(<App />)
window.onload = socket_communication


if(module.hot) {
  module.hot.accept()
}