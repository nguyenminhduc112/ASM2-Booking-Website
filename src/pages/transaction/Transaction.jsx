import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Layout/Wrapper'
import NavBar from '../../components/Layout/NavBar'
import FormReg from '../../components/Layout/FormReg/FormReg'
import Footer from '../../components/Layout/Footer/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TransactionTable from './components/TransactionTable'
import { fetchTransactionByEmail } from '../../utils/transaction'

const Transaction = () => {
    const email = useSelector(state => state.auth.emailUser)
    const [transactions, setTransactions] = useState([])
    const router = useNavigate()
    useEffect(() => {
        if (email) {
            fetchTransactionByEmail(email)
                .then(transactions => {
                    setTransactions(transactions)
                })
                .catch(err => console.log(err))
        } else {
            router('/')
        }
    }, [])
    return (
        <React.Fragment>
            <NavBar />
            <Wrapper >
                <h2 style={{ marginTop: 20, marginBottom: 5 }}>Your Transactions</h2>
                <TransactionTable transactions={transactions} />
            </Wrapper>
            <FormReg />
            <Footer />
        </React.Fragment>
    )
}

export default Transaction


