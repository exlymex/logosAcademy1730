import './App.css';
import Router from "./navigation/Router";
import React,{useEffect} from "react";
import {actionsForAuth, actionUsers} from "./redux/actionsCreator/authCreator";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Loading from "./components/Loading/loading";
import {checkUserAuth} from "./redux/reducers/authReducer";


const App = () => {
    const dispatch = useDispatch()
    const {isFirstLoading} = useSelector(state => state.authReducer)
    useEffect(() => {
        const token = localStorage.getItem('userToken')
        const userID = localStorage.getItem('userID')
        dispatch(checkUserAuth(token,userID))
    },[] )

  return (
      <>
          {isFirstLoading ? <Loading/> : <Router/> }
          <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      </>

  )
}

export default App;
