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
        case actionsUsers.USERS_FOLLOW : {
            if(state.following.includes(action.payload)){
                return {...state}
            }
            return {...state,following:[...state.following,action.payload] }
        }
        case actionsUsers.USERS_UNFOLLOW : {
            if(state.following.includes(action.payload)){
                const copy = [...state.following]
                copy.splice(copy.indexOf(action.payload),1)
                return {...state,following:copy}
            }
            return {...state,following:[...state.following,action.payload] }
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
    if(response.status === 201) {
        dispatch(usersActions.follow(id))
    }
}
export const unfollowUser = (id) => async(dispatch,getState) => {
    const {token} = getState().authReducer
    const response = await UsersAPI.unfollowUser(token,id)
    if(response.status === 201){
        dispatch(usersActions.unfollow(id))
    }

}
export default usersReducer