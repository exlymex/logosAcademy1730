import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {followUser, getFollows, getUsers} from "../../redux/reducers/usersReducer";
import UserCard from "./UserCard/UserCard";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
    const dispatch = useDispatch()
    const users = useSelector(state=>state.usersReducer.users)
    const following = useSelector(state => state.usersReducer.following)
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getFollows())
    },[])


    return(
        <div className={styles.bodyContainer}>
            {users.map(user =>  <UserCard key={user._id} user={user} followUser={followUser} following = {following} />)}
        </div>
    )
}

export default UsersPage