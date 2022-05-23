export const actionsUsers = {
    USERS_SET_USERS: 'USERS_SET_USERS',
    USERS_SET_FOLLOWING:'USERS_SET_FOLLOWING'
}
export const usersActions = {
    setUsers: (users) => ({type:actionsUsers.USERS_SET_USERS,payload:users}),
    setFollowing: (following) => ({type:actionsUsers.USERS_SET_FOLLOWING,payload:following})
}