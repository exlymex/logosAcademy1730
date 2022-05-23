import {actionsForAuth, actionUsers} from "../actionsCreator/authCreator";
import {checkAPI, loginAPI, registerAPI, UsersAPI} from "../../api/api";


const initialState = {
    isLoading: false,
    name: '',
    errorUsers: '',
    formError: '',
    token: null,
    userID: null,
    isRegistrated: '',
    isFirstLoading: true
}
const setAuthAction = ({userID, token, username}) => {
    return dispatch => {
        localStorage.setItem('userToken', token)
        localStorage.setItem('userID', userID)
        dispatch(actionUsers.setUsers(userID, token, username))
    }
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsForAuth.SET_USERS:
            return ({
                ...state,
                token: action.token,
                userID: action.id,
                username: action.username,
                isAuth: true
            })
        case actionsForAuth.SET_REGISTRATION:
            return {
                ...state,
                isRegistrated: action.payload
            }
        case actionsForAuth.SET_ERRORS:
            return {
                ...state,
                errorUsers: action.payload
            }
        case actionsForAuth.DELETE_AUTH :
            return {
                ...state,
                token: null,
                userID: null,
                isAuth: false,
                isRegistrated: false
            }
        case actionsForAuth.IS_LOADING :
            return {
                ...state,
                isLoading: action.value
            }
        case actionsForAuth.SET_IS_FIRST_LOADING :
            return {
                ...state,
                isFirstLoading: action.payload
            }
        default:
            return state

    }
}
export const registerUser = ({email, password, username}) => (dispatch) => {
    registerAPI.postsUsers({email, password, username})
        .then(response => {
            if (response.status === 201) {
                dispatch(actionUsers.setRegistrationMessage(response.data.message))
            } else {
                dispatch(actionUsers.setErrors(response.data.message))

            }
        })
}
export const loginUser = ({email, password}) => async (dispatch) => {
    dispatch(actionUsers.isLoading(true))
    await loginAPI.loginUsers({email, password})
        .then((response) => {
            if (response.message) {
                dispatch(setAuthAction({...response}))
            } else {
                dispatch(actionUsers.setErrors(response.data.message))
            }
            dispatch(actionUsers.isLoading(false))
        })

}
export const logoutUser = () => {
    return dispatch => {
        localStorage.clear()
        dispatch(actionUsers.deleteAuth())
    }
}
export const checkUserAuth = (token, userID) => (dispatch) => {
    checkAPI.checkAuth(token).then(response => {
        if (response.status === 204) {
            dispatch(actionUsers.setUsers(userID, token))
        }
    }).catch((e) => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userID')
    })
        .finally(() => {
            dispatch(actionUsers.setFirstLoading(false))
        })

}
export default authReducer