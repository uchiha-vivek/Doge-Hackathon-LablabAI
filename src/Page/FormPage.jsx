

import React from 'react'
import ChatComponent from '../components/chat-component'
import Header from '../components/header-component'

const FormPage = () => {
  return (
    <div>
    <Header />
    <div className="mt-20">
      <ChatComponent />
    </div>
  </div>
  
  )
}

export default FormPage