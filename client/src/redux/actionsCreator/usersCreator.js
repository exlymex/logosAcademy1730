export const actionsUsers = {
    USERS_SET_USERS: 'USERS_SET_USERS',
    USERS_SET_FOLLOWING:'USERS_SET_FOLLOWING',
    USERS_FOLLOW : 'USERS_FOLLOW',
    USERS_UNFOLLOW :'USERS_UNFOLLOW'
}
export const usersActions = {
    setUsers: (users) => ({type:actionsUsers.USERS_SET_USERS,payload:users}),
    setFollowing: (following) => ({type:actionsUsers.USERS_SET_FOLLOWING,payload:following}),
    follow : (id) => ({type:actionsUsers.USERS_FOLLOW,payload:id}),
    unfollow : (id) => ({type:actionsUsers.USERS_UNFOLLOW,payload:id})
}