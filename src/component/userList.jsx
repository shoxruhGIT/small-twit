import React, { useEffect } from 'react'
import useFetch from '../hook/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { chatFetched, chatFetching } from './store/action/action';
import UserItem from './userItem';

const UserList = () => {
  const { request } = useFetch();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  useEffect(() => {
    dispatch(chatFetching());
    request("http://localhost:3001/comments").then((data) =>
      dispatch(chatFetched(data))
    );
  },[]);
  return (
    <div className='user-parent'>
      {data?.map(item=> (
        <UserItem key={item.id} {...item}/>
      ))}
    </div>
  )
}

export default UserList