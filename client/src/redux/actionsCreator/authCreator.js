export const actionsForAuth = {
    SET_USERS : "SET_USERS",
    SET_ERRORS : "SET_ERRORS",
    SET_REGISTRATION: 'SET_REGISTRATION',
    DELETE_AUTH : 'DELETE_AUTH',
    IS_LOADING:'IS_LOADING',
    SET_IS_FIRST_LOADING:' SET_IS_FIRST_LOADING '
}
export const actionUsers = {
    setUsers : (id,token,username) => ({type:actionsForAuth.SET_USERS,token,id,username}),
    setRegistrationMessage : (message) => ({type:actionsForAuth.SET_REGISTRATION,payload:message}),
    setErrors : (errors) => ({type:actionsForAuth.SET_ERRORS,payload:errors}),
    deleteAuth : () => ({type:actionsForAuth.DELETE_AUTH}),
    isLoading : (value) => ({type:actionsForAuth.IS_LOADING,value}),
    setFirstLoading:(value) => ({type:actionsForAuth.SET_IS_FIRST_LOADING,payload:value})
}
