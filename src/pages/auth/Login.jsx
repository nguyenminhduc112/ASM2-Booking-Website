import React from 'react'
// Styles
import styles from './Login.module.css'
// Compoents
import NavBar from '../../components/Layout/NavBar'
import FormReg from '../../components/Layout/FormReg/FormReg'
import Footer from '../../components/Layout/Footer/Footer'
import FormLogin from './components/FormLogin'
const Login = () => {
    return (
        <React.Fragment>
            <NavBar />
            <FormLogin />
            <FormReg />
            <Footer />
        </React.Fragment>
    )
}

export default Login
