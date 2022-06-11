
import {actionsForResume, resumeAction} from "../actionsCreator/resumeCreator";
import {UsersAPI} from "../../api/api";
import {toast} from "react-toastify";


const initialState = {
    canSave:false,
    fullname: '',
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
    userImage:null
}


export const resumeReducer = (state = initialState,action) => {
    switch(action.type){
        case actionsForResume.SET_DETAILS :
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
        case actionsForResume.SET_USER_IMAGE :
            return({
                ...state,
                userImage:action.payload
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
        dispatch(resumeAction.setValue(detail))
    }

}
export const postPhoto = (formData) => async(dispatch,getState) =>{
    const {token} = getState().authReducer
    const response = await UsersAPI.postImage(token,formData)
    dispatch(resumeAction.setUserImage(response.data.userImage))
}

export default resumeReducer