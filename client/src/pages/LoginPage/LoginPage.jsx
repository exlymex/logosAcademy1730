import React from "react";
import style from './LoginPage.module.css'
import CoverPage from "./CoverPage/CoverPage";
import FormPage from "./FormPage/FormPage";
import {useRef, useState} from "react";
import {Schema} from "rsuite";
import {loginUser} from "../../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {actionUsers} from "../../redux/actionsCreator/authCreator";
import Preloader from "../../components/Loading/loading";
// import "rsuite/dist/rsuite.min.css";

const LoginPage = () => {
    const dispatch = useDispatch()
    const {errorUsers} = useSelector((state) => state.authReducer)
    const isLoading = useSelector((state) => state.authReducer.isLoading)
    const navigate = useNavigate()

    const redirect = () => {
        navigate('/registration')
    }
    const {StringType} = Schema.Types;
    const formRef = useRef();
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
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
    const handleSubmit = () => {
        if (!formRef.current.check()) {
            return;
        }
        dispatch(loginUser({...formValue}))

    }
    const model = Schema.Model({
        email: StringType()
            .isRequired('This field is required.')
            .isEmail( 'It is not email'),
        password: StringType()
            .minLength(8, 'Password is too short')
            .isRequired('This field is required.'),
    });
    return(
<>
    {isLoading && <Preloader/> }
        <div className={style.body}>
                <div className={style.container}>
                    <CoverPage/>
                    <FormPage
                        formValue={formValue}
                        setFormValue={setFormValue}
                        formError={formError}
                        setFormError={setFormError}
                        formRef={formRef}
                        handleSubmit={handleSubmit}
                        formModel={model}
                        redirect={redirect}
                    />
                </div>
            }
        </div>

</>
    )
}

export default LoginPage