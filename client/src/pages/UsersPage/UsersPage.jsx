import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {followUser, getFollows, getUsers} from "../../redux/reducers/usersReducer";
import UserCard from "./UserCard/UserCard";
import styles from "./UsersPage.module.css";
import SearchingPage from "../../components/Searching/SearchingPage";
import {useState} from "react";

const UsersPage = () => {
    const dispatch = useDispatch()
    const [currentOption, setCurrentOption] = useState('username')
    const [searchingWord, setSearchingWord] = useState('')
    const users = useSelector(state => state.usersReducer.users)
    const followingArray = useSelector(state => state.usersReducer.following)
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getFollows())
    }, [])
    const checkFollow = (user) => !!followingArray.find(u => u === user._id)
    return (
        <div className={styles.bodyContainer}>
            <SearchingPage setCurrentOption={setCurrentOption} setSearchingWord={setSearchingWord}
                           currentOption={currentOption} searchingWord={searchingWord}/>
            <div className={styles.cardContainer}>
                {users.filter(val => {
                    // console.log(val['username'])
                    if (searchingWord === '') {
                        return val
                    }else if (val[currentOption].toLowerCase().includes(searchingWord.toLowerCase())) {
                        return val
                    }
                }).map(user => <UserCard key={user?._id} user={user} followUser={followUser}
                                         isFollowed={checkFollow(user)}/>)}
            </div>

        </div>
    )
}
// else if(val.username.toLowerCase().includes(searchingWord.toLowerCase())){
//     return val
// }
export default UsersPage