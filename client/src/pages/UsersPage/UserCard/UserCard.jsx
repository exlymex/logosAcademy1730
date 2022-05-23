import React, {useEffect, useState} from 'react'
import styles from './UserCard.module.css'
import img from '../../../resources/photos/icons8-user-50.png'
import {Link} from "react-router-dom";
import {RouteConst} from "../../../common/RouteConst";
import {followUser} from "../../../redux/reducers/usersReducer";
import {useDispatch} from "react-redux";
const UserCard = ({user,following}) => {
    const {username,_id} = user
    const [followed,setFollowed] = useState(false)
    useEffect(() => {
        following.map(value => {
            if(value === _id){
                setFollowed(true)
            }else{
                setFollowed(false)
            }
        })
    },[following])

    const dispatch = useDispatch()
    return (
              <div className={styles.cardContainer}>
                <span className={styles.pro}>PRO</span>
                <img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user"/>
                <h3 className={styles.userName}>{username}</h3>
                <h6 className={styles.userTitle}>New York</h6>
                <p className={styles.fontP}>User interface designer and <br/> front-end developer</p>
                <div className={styles.userButtons}>
                    {followed
                        ?
                        <div className={styles.followingButton} onClick={() => dispatch(followUser(_id))}>
                            unFollowing
                        </div>
                        :
                        <div className={styles.followingButton} onClick={() => dispatch(followUser(_id))}>
                            Following
                        </div>
                    }

                    <Link to = {`${RouteConst.RESUME}/${user._id}`} className={styles.primary}>
                        CheckResume
                    </Link>
                </div>
                <div className={styles.skills}>
                    <h6>Skills</h6>
                    <ul className={styles.skillsArray}>
                        <li>UI / UX</li>
                        <li>Front End Development</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node</li>
                    </ul>
                </div>
            </div>
    )
}
export default UserCard