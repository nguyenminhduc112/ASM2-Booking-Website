export const getUserByEmail = async (email) => {
    const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/user/${email}`)
    const data = await response.json()
    return data
}