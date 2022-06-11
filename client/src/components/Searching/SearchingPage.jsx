import React, {useState} from 'react'
import style from './SearchingPage.module.css'



const SearchingPage = ({setCurrentOption,currentOption,searchingWord,setSearchingWord}) => {
    const changeSearch =  (event) => {
        setCurrentOption(event.target.options[event.target.selectedIndex].value)
    }

    return (
        <div className={style.bodyContainer}>
            <form className={style.searchForm}>
                <div className={style.innerForm}>
                    <div className={`${style.inputField} ${style.firstWrap}`}>
                        <div className={style.inputSelect}>
                            <select  className={style.searchSelect} value = {currentOption} onChange={(e) => changeSearch(e)}>
                                <option value = 'username'  >Username</option>
                                <option value = 'age'>Age</option>
                                <option value = 'position'>Position</option>
                                <option value = 'city'>City</option>
                            </select>
                        </div>
                    </div>
                    <div className={`${style.inputField} ${style.secondWrap}`}>
                        <input className={style.searchInput} value={searchingWord} type={"text"} placeholder={'Searching...'} onChange={(e) => setSearchingWord(e.target.value)} />
                    </div>
                    <div className={`${style.inputField} ${style.thirdWrap}`}>
                        <button className={style.searchButton}>
                            <svg className={style.searchLoop} aria-hidden="true" data-prefix="fas"
                                 data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SearchingPage