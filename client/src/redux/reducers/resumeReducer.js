
import {actionsForResume, resumeAction} from "../actionsCreator/resumeCreator";
import {UsersAPI} from "../../api/api";
import {toast} from "react-toastify";
import {actionUsers} from "../actionsCreator/authCreator";

const initialState = {
    canSave:false,
    email: '',
    username : '',
    name: '',
    title: '',
    aboutMe: '',
    courses: '',
    coursesName: '',
    coursesTime: '',
    coursesGratuation: '',
    coursesSecond: '',
    coursesNameSecond: '',
    coursesTimeSecond: '',
    coursesGratuationSecond: '',
    photo: ''
}


export const resumeReducer = (state = initialState,action) => {
    switch(action.type){
        case actionsForResume.SET_DETAILS :
            console.log(action.payload)
            return({
                ...state,
                ...action.payload
            })
        case actionsForResume.CAN_SAVE :
            return({
                ...state,
                canSave:action.payload
            })
        case 'CHANGE' :
            return({
                ...state,
                ...action.payload
            })
        default:
            return state

    }
}
export const getDetails = (userId) => async (dispatch,getState) => {
    const {token} = getState().authReducer
    const response = await UsersAPI.getDetails(token,userId)
    dispatch(resumeAction.setDetails(response.data.user))
}
export const postDetails = (userId,detail) => async (dispatch,getState) => {
    const {token} = getState().authReducer

    const response = await UsersAPI.postDetails(token,userId,detail)
    if(response.status === 400){
        toast.error(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }else{
        console.log(detail)
        dispatch(resumeAction.setValue(detail))
    }

}

export default resumeReducer