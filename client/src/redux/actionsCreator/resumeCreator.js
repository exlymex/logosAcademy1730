export const actionsForResume = {
    SET_VALUE : "SET_VALUE",
    SET_DETAILS:'SET_DETAILS',
    CAN_SAVE : 'CAN_SAVE'
}
export const resumeAction = {
    setValue : (props) => ({type:actionsForResume.SET_VALUE,payload:props}),
    setDetails : (props) => ({type:actionsForResume.SET_DETAILS,payload:props}),
    canSave : (props) => ({type:actionsForResume.CAN_SAVE,payload:props})
}
