import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {followUser, getFollows, getUsers} from "../../redux/reducers/usersReducer";
import UserCard from "./UserCard/UserCard";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
    const dispatch = useDispatch()
    const users = useSelector(state=>state.usersReducer.users)
    const followingArray = useSelector(state => state.usersReducer.following)
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getFollows())
    },[])
    const checkFollow = (user) => !!followingArray.find(u => u === user._id)
    return(
        <div className={styles.bodyContainer}>
            {users.map(user =>  <UserCard key={user._id} user={user} followUser={followUser} isFollowed = {checkFollow(user)}  />)}
        </div>
    )
}

export default UsersPage