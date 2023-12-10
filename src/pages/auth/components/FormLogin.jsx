import React from 'react'
import styles from './FormLogin.module.css'
import { setAuth } from '../../../utils/auth'
import { useDispatch } from 'react-redux'
import { authAction } from '../../../store/reducers/authReducer'
import { useNavigate } from 'react-router-dom'
const FormLogin = () => {
    const dispatch = useDispatch()
    const router = useNavigate()
    // Fetch Login
    const fetchLogin = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/auth/signin`, {
                method: 'post',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            })


            if (response.status === 200) {
                const result = await response.json()
                setAuth(result.email)
                dispatch(authAction.login({ email: result.email }))
                router('/')
            } else {
                alert('Login unsuccessful!')
            }

        } catch (error) {
            console.log(error)
        }
    }
    // handler submit
    const submitHandler = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        const data = {
            email,
            password
        }
        fetchLogin(data)
    }
    return (
        <React.Fragment>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <h1 className={styles.title}>Login</h1>
                    <input type="email" name='email' className={styles.input} placeholder='Email' required />
                    <input type="password" name='password' className={styles.input} placeholder='Password' required />
                    <button type='submit' className={styles.btn}>Login</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default FormLogin
