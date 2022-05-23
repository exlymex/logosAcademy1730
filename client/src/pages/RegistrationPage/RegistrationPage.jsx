import React, {useEffect} from "react";
import style from './RegistrationPage.module.css'
import CoverPage from "./CoverPage/CoverPage";
import RegistrationForm from "./FormPage/RegistrationForm";
import {useRef, useState} from "react";
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Schema} from "rsuite";
import { registerUser} from "../../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {actionUsers} from "../../redux/actionsCreator/authCreator";

//state
const RegistrationPage = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const isRegistrated = useSelector((state) => state.authReducer.isRegistrated)
    const {errorUsers} = useSelector((state) => state.authReducer)
    const {StringType} = Schema.Types;
    const formRef = useRef();
    const [formError, setFormError] = useState({});

    const [formValue, setFormValue] = useState({
        username: "",
        email:'',
        password: '',
    });
    useEffect(()=>{
        if(errorUsers){
            toast.error(errorUsers, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => {
                    dispatch(actionUsers.setErrors(''))
                }
            });
        }
    },[errorUsers])
    useEffect(()=>{
        if(isRegistrated){
            toast.success(isRegistrated, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => {
                    dispatch(actionUsers.setRegistrationMessage(''))
                }
            });
        }
    },[isRegistrated])

    const handleSubmit = () => {
        if (!formRef.current.check()) {
            return;
        }
        dispatch(registerUser({...formValue}))

    }
    const redirect = () => {
        navigate('/login')
    }
    const model = Schema.Model({
        username: StringType()
            .isRequired('This field is required.')
            .minLength(2, 'Name is too short'),
        password: StringType()
            .minLength(8, 'Password is too short')
            .isRequired('This field is required.'),
        email:StringType()
            .isEmail('Enter valid email')
            .isRequired('This field is required')
    });
    return(
        <div className={style.body}>
            <div className={style.container}>
                <CoverPage/>
                <RegistrationForm
                    formValue = {formValue}
                    setFormValue = {setFormValue}
                    formError={formError}
                    setFormError={setFormError}
                    formRef={formRef}
                    handleSubmit = {handleSubmit}
                    formModel = {model}
                    redirect = {redirect}
                    isRegistrated = {isRegistrated}
                />
..
            </div>
        </div>
    )
}

export default RegistrationPage