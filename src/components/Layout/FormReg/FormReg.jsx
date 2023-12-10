import React from 'react'
// CSS
import styles from './FormReg.module.css'
import Wrapper from '../Wrapper'
// DOM

const FormReg = () => {
    return (
        <div className={styles.wrapperFormReg}>
            <Wrapper>
                <h2 className={styles.title}>Save time, save money!</h2>
                <p className={styles.des}>Sign up and we'll send the best deals to you</p>
                <form>
                    <div className={styles.formGroup}>
                        <input type="email" className={styles.formInput} placeholder='Your Email' />
                        <button type='submit' className={styles.button}>Subscribe</button>
                    </div>
                </form>
            </Wrapper>
        </div>
    )
}

export default FormReg
