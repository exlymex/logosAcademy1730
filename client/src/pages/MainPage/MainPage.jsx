import React from 'react'
import {useSelector} from "react-redux";

const MainPage = () => {
    const {username} = useSelector(state => state.authReducer)
    return(
        <div>Hello,{username}</div>
    )
}
export default MainPage