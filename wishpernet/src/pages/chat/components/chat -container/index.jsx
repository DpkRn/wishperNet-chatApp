import React from 'react'
import ChatHeader from './components/chat-header'
import MessageContainer from './components/message-container'
import MessageBar from './components/message-bar'

function ChatContainer() {
  return (
    <div className='fixed top-0 h-[100%] w-[100%] bg-[#1c1d25] flex flex-col md:static md:flex-1'>
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default ChatContainer