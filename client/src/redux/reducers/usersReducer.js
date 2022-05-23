import {actionsUsers, usersActions} from "../actionsCreator/usersCreator";
import {UsersAPI} from "../../api/api";

const Initialstate = {
    users : [],
    following: []
}
export const usersReducer = (state = Initialstate,action) => {
    switch (action.type) {
        case actionsUsers.USERS_SET_USERS : {
            return {...state,users: action.payload}
        }
        case actionsUsers.USERS_SET_FOLLOWING : {
            return {...state,following:action.payload}
        }
        default :
            return state
    }
}
export const getUsers = () => async (dispatch,getState) => {
    const {token} = getState().authReducer
    const response = await UsersAPI.getUsers(token)
    dispatch(usersActions.setUsers(response.data.users))

}
export const getFollows = () => async(dispatch,getState) => {
    const {token} = getState().authReducer
    const response = await UsersAPI.getFollows(token)
    dispatch(usersActions.setFollowing(response.data))
}
export const followUser = (id) => async(dispatch,getState) => {
    const {token} = getState().authReducer
    const response = await UsersAPI.followUser(token,id)
    dispatch(usersActions.setFollowing(response.data))

}

export default usersReducer