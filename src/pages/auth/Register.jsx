import React from 'react'
// Styles
import styles from './Register.module.css'
// Compoents
import NavBar from '../../components/Layout/NavBar'
import FormReg from '../../components/Layout/FormReg/FormReg'
import Footer from '../../components/Layout/Footer/Footer'
import FormRegister from './components/FormRegister'
const Register = () => {
    return (
        <React.Fragment>
            <NavBar />
            <FormRegister />
            <FormReg />
            <Footer />
        </React.Fragment>
    )
}

export default Register
