export const fetchAddTransaction = async (dataReserve) => {

    const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/transaction/add`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataReserve)
    })

    return response
}

export const fetchTransactionByEmail = async (email) => {
    const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/transactions/${email}`)
    const data = await response.json()
    return data
}

export const fetchTransactions = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/transactionsAll`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}