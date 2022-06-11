import React, {useEffect, useState} from 'react'
import styles from './UserCard.module.css'
import img from '../../../resources/photos/icons8-user-50.png'
import {Link} from "react-router-dom";
import {RouteConst} from "../../../common/RouteConst";
import {followUser, unfollowUser} from "../../../redux/reducers/usersReducer";
import {useDispatch} from "react-redux";
const UserCard = ({user,isFollowed}) => {
    const {username,_id,userImage,city,position} = user
    const dispatch = useDispatch()
    return (
              <div className={styles.cardContainer}>
                  {userImage ?  <span className={styles.pro}>PRO</span> : <span className={styles.pro}>SIMPLE</span>}
                  {userImage
                      ?  <img className={styles.round} src={user.userImage} alt="user" />
                      :  <img className={styles.round} src="https://png.pngtree.com/png-vector/20190728/ourlarge/pngtree-avatar-user-profile-flat-color-icon-vector-icon-banner-png-image_1619399.jpg" alt="user"/>
                  }

                {/*<img className={styles.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user"/>*/}
                <h3 className={styles.userName}>{username}</h3>
                <h6 className={styles.userTitle}>{city}</h6>
                <p className={styles.fontP}>{position}</p>
                <div className={styles.userButtons}>
                    {isFollowed
                        ?
                        <div className={styles.followingButton} onClick={() => dispatch(unfollowUser(_id))}>
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