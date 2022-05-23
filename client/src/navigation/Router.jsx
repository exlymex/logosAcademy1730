import {useSelector} from "react-redux";
import Header from "../components/Header/Header";
import {BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
import {RouteConst} from "../common/RouteConst";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import MainPage from "../pages/MainPage/MainPage";
import ResumePage from "../pages/ResumePage/ResumePage";
import UsersPage from "../pages/UsersPage/UsersPage";

const Router = () => {
    const {token} = useSelector(state => state.authReducer)
    const isAuthenticated = !!token
    if (isAuthenticated) {
        return (
            <BrowserRouter>
                <div className='App'>
                    {<Header/>}
                    <Routes>
                        <Route path = {RouteConst.RESUME} element = {<ResumePage />} />
                        <Route path = {RouteConst.MAIN} element = {<MainPage />} />
                        <Route path = {RouteConst.USERS} element = {<UsersPage />} />
                        <Route path='/resume/:userId' element={<ResumePage/>}></Route>
                        <Route path = {'*'} element = {<Navigate to={RouteConst.MAIN} />} />
                        {/*<Route path = {RouteConst.REGISTRATION} element = {<RegistrationPage />} />*/}
                        {/*<Route path = {RouteConst.ADMIN} element = {<AdminPage />} />*/}
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <div className='App'>
                {<Header/>}
                <Routes>
                    {/*<Route path = {RouteConst.MAIN} element = {<MainPage />} />*/}
                    <Route path = {RouteConst.LOGIN} element = {<LoginPage />} />
                    <Route path = {RouteConst.REGISTRATION} element = {<RegistrationPage />} />
                    <Route path = {'*'} element = {<Navigate to={RouteConst.REGISTRATION} />} />
                    {/*<Route path = {RouteConst.ADMIN} element = {<AdminPage />} />*/}
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default Router