import React from 'react'
// CSS
import styles from './NavBar.module.css'
// Component
import Wrapper from './Wrapper'
// Data
import navBarData from "../../data/navBar.json";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, removeAuth } from '../../utils/auth';
import { authAction } from '../../store/reducers/authReducer';

const NavBar = () => {
    const router = useNavigate()
    const dispatch = useDispatch()
    let listContentItem = navBarData.map(item => {
        return <li key={item.type} className={item.active ? styles.active : ''} > <span className={`fa ${item.icon}`}></span> {item.type}</li>
    })
    const isAuthentication = useSelector(state => state.auth.isAuthentication)
    // redirect functions
    const redirectSignup = () => {
        router('/signup')
    }

    const redirectSignin = () => {
        router('/signin')
    }

    // Logout handler
    const logoutHandler = () => {
        dispatch(authAction.logout())
        removeAuth()
        router('/signin')
    }
    return (
        <div className={styles['navbar-wrapper']}>
            <Wrapper>
                <div className={styles['navbar-wrapper__header']}>
                    <Link to={'/'} className={styles['navbar-wrapper__header-title']}>Booking Website</Link>
                    {!isAuthentication && <div className={styles['navbar-wrapper__header-singup']}>
                        <button onClick={redirectSignup}>Reister</button>
                        <button onClick={redirectSignin}>Login</button>
                    </div>}
                    {isAuthentication && <div className={styles['navbar-wrapper__header-singup']}>
                        <p style={{ marginRight: 10 }}>{getAuth()}</p>
                        <button onClick={() => {
                            router('/transaction')
                        }}>Transaction</button>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>}
                </div>
                <nav className={styles['navbar-wrapper__nav']}>
                    <ul className={styles['navbar-wrapper__nav-menu']}>
                        {listContentItem}
                    </ul>
                </nav>
            </Wrapper>
        </div>
    )
}

export default NavBar
