import React from "react";
import './FormPage.css'
import {Button, Form} from "rsuite";
import {Field} from '../../../components/RSUITEComponents/rsuiteComp'

const FormPage = ({formValue, setFormValue, formError, setFormError, formRef, handleSubmit,formModel,redirect}) => {

    return (
        <div className="forms">
            <div className="form-content">
                <div className="login-form">
                    <div className="title">Login</div>
                    <div className="input-boxes">
                        <Form
                            ref={formRef}
                            formValue={formValue}
                            onChange={setFormValue}
                            onCheck={setFormError}
                            formError={formError}
                            model={formModel}
                        >
                            <div className="input-box">
                                <i className="fas fa-user"></i>
                                <Field name="email" label="Your name"/>
                            </div>
                            <div className="input-box">
                                <i className="fas fa-lock"></i>
                                <Field name="password" type={'password'}  label="Your password" />
                            </div>

                            <div className="text"><a href="#">Forgot password?</a></div>
                            <div className='button input-box'>
                                <Form.Group>
                                    <Button color="violet" appearance="ghost" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form.Group>
                            </div>
                            <div className="text sign-up-text" onClick={redirect}>Don't have an account? <label className={'sign_up'} htmlFor="flip">Sigup
                                now</label>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPage