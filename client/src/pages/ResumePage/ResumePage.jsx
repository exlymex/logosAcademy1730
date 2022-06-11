import React, {useEffect, useState} from "react";
import styles from './ResumePage.module.css'
import EditableTypography from "../../components/EditableTypography/EditableTypography";
import {usePrevious} from "../../hooks/usePrevious";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getDetails, postDetails, postPhoto} from "../../redux/reducers/resumeReducer";


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
    useEffect(() => {
        previous.update(details)
    }, [details.name])

    const [edit, setEdit] = useState(false)
    const [image,setImage] = useState(null)

    const previous = usePrevious(details)
    const changeTextHandler = (e) => {
        dispatch({type: 'CHANGE', payload: {...details, [e.target.name]: e.target.value}})
    }
    const setUserPhoto = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file",image);
        dispatch(postPhoto(formData))

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
                                value={details.fullname}
                                name={'fullname'}
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
                            <img src = {details.photo} alt={''} />
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
                                    value={details.coursesName}
                                    name={'coursesName'}
                                    placeholder={'courses name'}
                                    className={` ${styles.latoRegular}`}
                                />
                            </div>
                            <div className={styles.lato}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.courses}
                                    name={'courses'}
                                    placeholder={'courses place'}
                                    className={` ${ styles.lato}`}
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
                                    value={details.coursesNameSecond}
                                    name={'coursesNameSecond'}
                                    placeholder={'courses name'}
                                    className={`${styles.latoRegular} ${styles.marginTop} `}
                                />
                            </div>
                            <div className={styles.lato}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesSecond}
                                    name={'coursesSecond'}
                                    placeholder={'courses place'}
                                    className={` ${styles.lato}`}
                                />
                            </div>
                            <div className={styles.latoItalic}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.coursesTimeSecond}
                                    name={'coursesTimeSecond'}
                                    placeholder={'courses time'}
                                    className={` ${styles.latoItalic} `}
                                />
                            </div>

                        </div>
                        <div className={styles.raleway}>
                            <EditableTypography
                                edit={edit}
                                onChange={changeTextHandler}
                                value={details.coursesGratuationSecond}
                                name={'coursesGratuationSecond'}
                                placeholder={'courses gratuation'}
                                className={` ${styles.raleway}`}
                            />
                            {/*<h4 className={styles.raleway}>Gratuation on 2022</h4>*/}
                        </div>
                    </div>
                    {!edit && <hr/>}
                </div>
            </section>
            <section className={styles.work}>
                <div className={styles.container}>
                    <div className={styles.Grid}>
                        <div className={styles.workText}>
                            <h4 className={styles.raleway}>Work</h4>
                        </div>
                        <div className={styles.workType}>
                            <div className={styles.latoRegular}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.job}
                                    name={'job'}
                                    placeholder={'job name'}
                                    className={` ${styles.latoRegular} `}
                                />
                            </div>
                            <div className={styles.lato}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.company}
                                    name={'company'}
                                    placeholder={'company name'}
                                    className={` ${styles.lato}`}
                                />
                            </div>
                            <div className={styles.latoItalic}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.companyExperience}
                                    name={'companyExperience'}
                                    placeholder={'company time'}
                                    className={` ${styles.latoItalic} `}
                                />
                            </div>
                        </div>
                        <div className={styles.workGratuating}>
                            <div className={styles.raleway}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.companyTime}
                                    name={'companyTime'}
                                    placeholder={'time at Company'}
                                    className={` ${styles.raleway}`}
                                />
                            </div>
                        </div>
                        <div className={styles.workClass}>
                            <div className={styles.latoRegular}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.jobSecond}
                                    name={'jobSecond'}
                                    placeholder={'job name'}
                                    className={` ${styles.latoRegular} ${styles.marginTop}`}
                                />
                            </div>
                            <div className={styles.lato}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.companySecond}
                                    name={'companySecond'}
                                    placeholder={'company name'}
                                    className={` ${styles.lato}`}
                                />
                            </div>
                            <div className={styles.latoItalic}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.companyExperienceSecond}
                                    name={'companyExperienceSecond'}
                                    placeholder={'company time'}
                                    className={` ${styles.latoItalic} `}
                                />
                            </div>
                        </div>
                        <div className={styles.workGratuatingTwo}>
                            <div className={styles.raleway}>
                                <EditableTypography
                                    edit={edit}
                                    onChange={changeTextHandler}
                                    value={details.companyTimeSecond}
                                    name={'companyTimeSecond'}
                                    placeholder={'time at company'}
                                    className={` ${styles.raleway}`}
                                />
                            </div>
                        </div>
                    </div>
                    {!edit && <hr/>}
                </div>
            </section>
            <section className={styles.contact}>
                <div className={styles.contactIntro}>
                    <div className={`${styles.container}  ${styles.flex}`}>
                        <div className={styles.profile}>
                            <div className={styles.profileText}>
                                <h1 className={styles.profileTitle}>Profile</h1>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.profile}
                                        name={'profile'}
                                        placeholder={'time at company'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}

                                    />
                                </div>

                            </div>
                            <div className={styles.profileFullname}>
                                <h3>FULLNAME :</h3>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.fullname}
                                        name={'fullname'}
                                        placeholder={'fullname'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}
                                    />
                                </div>
                            </div>
                            <div className={styles.profileBirthDate}>
                                <h3>Age :</h3>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.age}
                                        name={'age'}
                                        placeholder={'Your age'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}
                                    />
                                </div>
                            </div>
                            <div className={styles.profileJob}>
                                <h3>JOB :</h3>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.position}
                                        name={'position'}
                                        placeholder={'Your position'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}
                                    />
                                </div>
                            </div>
                            <div className={styles.profileWebsite}>
                                <h3>Website :</h3>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.website}
                                        name={'website'}
                                        placeholder={'Your github'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}
                                    />
                                </div>
                            </div>
                            <div className={styles.profileEmail}>
                                <h3>EMAIL :</h3>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.email}
                                        name={'email'}
                                        placeholder={'Your email'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}
                                    />
                                </div>
                            </div>
                            <div className={styles.profileCity}>
                                <h3>CITY :</h3>
                                <div className={styles.profileText}>
                                    <EditableTypography
                                        edit={edit}
                                        onChange={changeTextHandler}
                                        value={details.city}
                                        name={'city'}
                                        placeholder={'Your city'}
                                        className={` ${styles.profileText} ${styles.colorWhite}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.skills}>
                            <h1 className={styles.skillsTitle}>Skills</h1>
                            <p className={styles.skillsText}>Lorem ipsum Qui veniam ut consequat ex ullamco nulla in non
                                ut esse in magna sint minim officia consectetur nisi commodo ea magna pariatur nisi
                                cillum.</p>
                        </div>
                        <div className={styles.mySkills}>

                            <form onSubmit={ (event) => setUserPhoto(event)}>
                                {!details.userImage || details.userImage === ''
                                    ? <img src = 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png' alt={''}/>
                                    : <img src = {details.userImage} alt={''}   />
                                }
                                <input multiple={false}  name="image" accept={'image/*'} type={'file'} onChange={(event) => {setImage(event.target.files[0])}}/>
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