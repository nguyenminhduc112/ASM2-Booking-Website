import React, { useRef } from 'react'
import styles from './FormLogin.module.css'
import { setAuth } from '../../../utils/auth'
import { useDispatch } from 'react-redux'
import { authAction } from '../../../store/reducers/authReducer'
import { useNavigate } from 'react-router-dom'
const FormRegister = () => {
    const dispatch = useDispatch()
    const router = useNavigate()
    const inputPasswordRef = useRef()
    const inputConfirmPasswordRef = useRef()
    // Fetch Login
    const fetchLogin = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/auth/signup`, {
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
                alert('Register unsuccessful!')
                // inputPasswordRef.current.value = ''
                // inputConfirmPasswordRef.current.value = ''
            }

        } catch (error) {
            console.log(error)
        }
    }
    // handler submit
    const submitHandler = (e) => {
        e.preventDefault()
        const fullName = e.target[0].value
        const username = e.target[1].value
        const email = e.target[2].value
        const password = e.target[3].value
        const confirmPassword = e.target[4].value
        const phoneNumber = e.target[5].value
        // Validation
        if (password !== confirmPassword) {
            alert('Confirm password not true!')
            inputConfirmPasswordRef.current.value = ''
        } else {
            const data = {
                fullName,
                username,
                email,
                password,
                phoneNumber,
                isAdmin: false
            }
            fetchLogin(data)
        }

    }
    return (
        <React.Fragment>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <h1 className={styles.title}>Sign Up</h1>
                    <input type="text" name='fullname' className={styles.input} placeholder='Full name' />
                    <input type="text" name='username' className={styles.input} placeholder='Username' required />
                    <input type="email" name='email' className={styles.input} placeholder='Email' required />
                    <input type="password" name='password' className={styles.input} placeholder='Password' required ref={inputPasswordRef} />
                    <input type="password" name='confirmPassword' className={styles.input} placeholder='Confirm password' required ref={inputConfirmPasswordRef} />
                    <input type="text" name='phoneNumber' className={styles.input} placeholder='Phone number' required />
                    <button type='submit' className={styles.btn}>Register</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default FormRegister
