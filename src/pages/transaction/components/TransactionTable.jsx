import React from 'react'
import styles from './TransactionTable.module.css'
import { format } from 'date-fns'
import { covertCurrencyUSD } from '../../../utils/covertCurrency'
const TransactionTable = ({ transactions }) => {
    const listTransactionsRender = transactions.length > 0 ? transactions.map(((transaction, index) => {
        const dateStart = format(new Date(transaction.dateStart), 'dd/MM/yyyy')
        const dateEnd = format(new Date(transaction.dateEnd), 'dd/MM/yyyy')
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.hotel.name}</td>
                <td>{transaction.room.map(room => {
                    return room.numberRooms.map((number, index) => ((index + 1) < room.numberRooms.length) && (room.numberRooms.length !== 1) ? <span key={index}>{number}, </span> : <span key={index}>{number} </span>)
                })}</td>
                <td>{dateStart} - {dateEnd}</td>
                <td>{covertCurrencyUSD(transaction.price)}</td>
                <td>{transaction.payment}</td>
                <td><p className={transaction.status === 'Booked' ? styles.activeBooked : transaction.status === 'Checkin' ? styles.activeCheckin : styles.activeCheckout}>{transaction.status}</p></td>
            </tr>
        )
    })) : <tr><td colSpan={7}>Không có transations nào</td></tr>
    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hotel</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {listTransactionsRender}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default React.memo(TransactionTable)
