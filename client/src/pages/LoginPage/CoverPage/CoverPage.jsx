import React from "react";
import style from './CoverPage.module.css'
import img from "./frontImg.jpg";

const CoverPage = () => {
    return(
        <div className={style.cover}>
            <div className={style.front}>
                <div className={style.text}>
                    <img className={style.img} src={img} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default CoverPage