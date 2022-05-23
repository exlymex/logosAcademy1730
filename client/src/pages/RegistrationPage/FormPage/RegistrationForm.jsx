import React from "react";
import style from './RegistrationForm.module.css'
import {Button, Form} from "rsuite";
import {Field} from '../../../components/RSUITEComponents/rsuiteComp'

const RegistrationForm = ({formValue, setFormValue, formError, setFormError, formRef, handleSubmit,formModel,redirect,isRegistrated}) => {

    return (
        <div className={style.forms}>
            <div className={style.formContent}>
                <div className={style.loginForm}>
                    <div className={style.title}>Registration</div>
                    <div className={style.inputBoxes}>
                        <Form
                            ref={formRef}
                            formValue={formValue}
                            onChange={setFormValue}
                            onCheck={setFormError}
                            formError={formError}
                            model={formModel}
                        >
                            {/*<div className={style.inputBox}>*/}
                            {/*    <i className="fas fa-envelope"></i>*/}
                            {/*    <Field name="name" label="Enter your name"/>*/}
                            {/*</div>*/}
                            <div className={style.inputBox}>
                                <i className="fas fa-lock"></i>
                                <Field name="username"  label="Your name" />
                            </div>
                            <div className={style.inputBox}>
                                <i className="fas fa-envelope"></i>
                                <Field name="email"   label="Enter your email" />
                            </div>
                            <div className={style.inputBox}>
                                <i className="fas fa-lock"></i>
                                <Field name="password" type={'password'}  label="Enter your password" />
                            </div>

                            <div className={style.text}><a href="#">Forgot password?</a></div>
                            <div className={`${style.button} ${style.inputBox}`}>
                                <Form.Group>
                                    <Button  className={'man'} color="violet" appearance="ghost" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form.Group>
                            </div>
                            <div className={`${style.text} ${style.signUpText}`}>Already have an account? <label className={style.signUp} onClick={redirect}>Login
                                now</label>
                                {isRegistrated ? <div>User was created</div> : ''}
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegistrationForm