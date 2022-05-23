
import React from "react";
import gif from '../../assets/photos/1483.gif'
import styles from './loading.module.css'
const Preloader = () => {
    return(
        <div>
            <img className={styles.gif} src={gif}/>
        </div>
    )

}
export default Preloader