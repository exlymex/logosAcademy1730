
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { RouteConst } from "../../common/RouteConst";
import {useDispatch, useSelector} from "react-redux";
import { logoutUser} from "../../redux/reducers/authReducer";
const Header = () => {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.authReducer)
    const isAuth = !!token
    const onLogout = () => {
        dispatch(logoutUser())
    }
    return (
        <nav className={styles.navigation}>
            <div className={styles.navContent}>
                <div>
                    <a className={styles.logo} >Rmaking</a>
                </div>
                {isAuth ?
                    <ul className={styles.navLinks}>
                        <Link to = {RouteConst.RESUME} className={styles.liLinks}>
                            <a className={styles.links} >Resume</a>
                        </Link>
                        <Link to = {RouteConst.USERS} className={styles.liLinks}>
                            <a className={styles.links} >Users</a>
                        </Link>
                        <Link to = {RouteConst.NOTES} className={styles.liLinks}>
                            <a className={styles.links} >Notes</a>
                        </Link>
                        <Link to = {RouteConst.RESUME} className={styles.liLinks}>
                            <a className={styles.links} onClick={onLogout}>Logout</a>
                        </Link>
                    </ul>
                    :
                    <ul className={styles.navLinks}>
                    <Link to = {RouteConst.REGISTRATION} className={styles.liLinks}>
                    <a className={styles.links}>Registration</a>
                    </Link>
                    <Link to = {RouteConst.LOGIN} className={styles.liLinks}>
                    <a className={styles.links} >Login</a>
                    </Link>
                    </ul>
                }
            </div>
        </nav>
    );
};

export default Header;