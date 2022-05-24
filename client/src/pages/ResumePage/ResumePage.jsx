import React, {useEffect, useState} from "react";
import styles from './ResumePage.module.css'
import EditableTypography from "../../components/EditableTypography/EditableTypography";
import {usePrevious} from "../../hooks/usePrevious";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getDetails, postDetails} from "../../redux/reducers/resumeReducer";


const ResumePage = () => {
    const {userId} = useParams()
    const myUserId = useSelector(state => state.authReducer.userID)

    const details = useSelector(state => state.resumeReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!userId) {
            dispatch(getDetails(myUserId))
        } else {
            dispatch(getDetails(userId))
        }

    }, [userId])


    const [edit, setEdit] = useState(false)

    const previous = usePrevious(details)

    const changeTextHandler = (e) => {
        dispatch({type: 'CHANGE', payload: {...details, [e.target.name]: e.target.value}})
    }
    const getUserPhoto = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        if(!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            console.log(base64)
        }
        reader.readAsDataURL(file);
    }
    const toggle = () => {
        setEdit(!edit);
    }
    const save = (detail) => {
        dispatch(postDetails(userId || myUserId, detail))
        setEdit(false);
    }
    const cancel = () => {
        dispatch({type: 'CHANGE', payload: previous.value});
        setEdit(false);
    }
    return (
        <div>
            <div className={styles.headerWrap}>
                {!userId ?
                    edit ? <>
                            <button onClick={() => save(details)}>Save</button>
                            <button onClick={cancel}>Cancel</button>
                        </>

                        :
                        <button className={`${styles.buttonEdit} ${styles.button36}`} onClick={toggle}>Edit</button>
                    : null
                }
                <div className={styles.container}>
                    <div className={styles.text}>
                        <h1 className={styles.title}>
                            <EditableTypography
                                edit={edit}
                                onChange={changeTextHandler}
                                value={details.name}
                                name={'name'}
                                placeholder={'Name'}
                                className={`${styles.editableTypography} ${styles.nameInput}`}
                            />
                        </h1>
                        <h3 className={styles.aboutMe}>
                            <EditableTypography
                                edit={edit}
                                onChange={changeTextHandler}
                                value={details.title}
                                name={'title'}
                                placeholder={'About Me'}
                                className={`${styles.editableTypography} ${styles.titleInput}`}
                            /></h3>
                    </div>
                </div>
            </div>
            <section className={styles.about}>
                <div className={styles.intro}>
                    <div className={styles.container}>
                        <div className={styles.aboutText}>
                            <img src = {details.photo} />
                            <div className={styles.aboutBox}>
                                <h5 className={styles.aboutText}>ABOUT</h5>
                            </div>
                            <div className={styles.meBox}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.aboutMe}
                                    name={'aboutMe'}
                                    placeholder={'About me'}
                                    className={`${styles.editableTypography} ${styles.aboutMeInput}`}
                                />
                            </div>
                            <div className={styles.boxDownload}>
                                <p className={styles.aboutText}>Download PDF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.education}>
                <div className={styles.container}>
                    <div className={styles.Grid}>
                        <div className={styles.educationText}>
                            <h4 className={styles.raleway}>Education</h4>
                        </div>
                        <div className={styles.educationType}>
                            <div className={styles.latoRegular}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.courses}
                                    name={'courses'}
                                    placeholder={'courses ended'}
                                    className={` ${styles.latoRegular}`}
                                />
                            </div>
                            <div className={styles.lato}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesName}
                                    name={'coursesName'}
                                    placeholder={'courses name'}
                                    className={` ${styles.lato}`}
                                />
                            </div>
                            <div className={styles.latoItalic}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesTime}
                                    name={'coursesTime'}
                                    placeholder={'courses time'}
                                    className={` ${styles.latoItalic}`}
                                />
                            </div>
                        </div>
                        <div className={styles.educationGratuating}>
                            <div className={styles.raleway}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesGratuation}
                                    name={'coursesGratuation'}
                                    placeholder={'courses gratuation'}
                                    className={` ${styles.raleway}`}
                                />
                            </div>
                        </div>
                        <div className={styles.educationClass}>
                            <div className={styles.latoRegular}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesSecond}
                                    name={'coursesSecond'}
                                    placeholder={'courses ended'}
                                    className={` ${styles.latoRegular} ${styles.marginTop}`}
                                />
                            </div>
                            <div className={styles.lato}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesNameSecond}
                                    name={'coursesNameSecond'}
                                    placeholder={'courses name'}
                                    className={` ${styles.lato}`}
                                />
                            </div>
                            <div className={styles.latoItalic}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesTimeSecond}
                                    name={'coursesTimeSecond'}
                                    placeholder={'courses name'}
                                    className={` ${styles.latoItalic} `}
                                />
                            </div>

                        </div>
                        <div className={styles.educationGratuatingTwo}>
                            <h4 className={styles.raleway}>Gratuation on 2022</h4>
                        </div>
                    </div>
                    {!edit && <hr/>}
                </div>
            </section>
            <section className={styles.work}>
                <div className={styles.container}>
                    <div className={styles.Grid}>
                        <div className={styles.workText}>
                            <h4 className={styles.raleway}>Education</h4>
                        </div>
                        <div className={styles.workType}>
                            <h3 className={styles.latoRegular}>Master of Web Design</h3>
                            <p className={styles.lato}>IT Step School</p>
                            <p className={styles.latoItalic}>3 years Course</p>
                        </div>
                        <div className={styles.workGratuating}>
                            <h4 className={styles.raleway}>Gratuation on 2018</h4>
                        </div>
                        <div className={styles.workClass}>
                            <h3 className={styles.latoRegular}>Front-end developer</h3>
                            <p className={styles.lato}>Logos IT Academy</p>
                            <p className={styles.latoItalic}>6 month Course</p>
                        </div>
                        <div className={styles.workGratuatingTwo}>
                            <h4 className={styles.raleway}>Gratuation on 2022</h4>
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>
            <section className={styles.contact}>
                <div className={styles.contactIntro}>
                    <div className={`${styles.container} + ${styles.flex}`}>
                        <div className={styles.profile}>
                            <div className={styles.profileText}>
                                <h1 className={styles.profileTitle}>Profile</h1>
                                <p className={styles.profileText}>Lorem ipsum Qui veniam ut consequat ex ullamco nulla
                                    in non ut esse in magna sint minim officia consectetur nisi commodo ea magna
                                    pariatur nisi cillum.</p>
                            </div>
                            <div className={styles.profileFullname}>
                                <h3>FULLNAME :</h3>
                                <p>PAVLO BORYSOV</p>
                            </div>
                            <div className={styles.profileBirthDate}>
                                <h3>BIRTH DATE :</h3>
                                <p>13.09.2003</p>
                            </div>
                            <div className={styles.profileJob}>
                                <h3>JOB :</h3>
                                <p>Freelancer</p>
                            </div>
                            <div className={styles.profileWebsite}>
                                <h3>Website :</h3>
                                <p>www.website.com</p>
                            </div>
                            <div className={styles.profileEmail}>
                                <h3>EMAIL :</h3>
                                <p>pavloborisov44@gmail.com</p>
                            </div>
                        </div>
                        <div className={styles.skills}>
                            <h1 className={styles.skillsTitle}>Skills</h1>
                            <p className={styles.skillsText}>Lorem ipsum Qui veniam ut consequat ex ullamco nulla in non
                                ut esse in magna sint minim officia consectetur nisi commodo ea magna pariatur nisi
                                cillum.</p>
                        </div>
                        <div className={styles.mySkills}>
                            <form onSubmit={getUserPhoto}>
                                <input multiple={false} accept={'image/*'} type={'file'}/>
                                <button type='submit'> Upload photo</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}
export default ResumePage