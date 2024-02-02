import React from 'react'
import UserItem from './component/userItem'
import UserList from './component/userList'
import ReplyList from './component/replyList'

const App = () => {
  return (
    <div className='app'>
      <UserList/>
      <ReplyList/>
    </div>
  )
}

export default App