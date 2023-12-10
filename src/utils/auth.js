export const setAuth = (username) => {
    localStorage.setItem('auth', username)
}

export const getAuth = () => {
    return localStorage.getItem('auth')
}

export const removeAuth = () => {
    return localStorage.removeItem('auth')
}

export const checkAuth = () => {
    const isAuthentication = getAuth()
    if (isAuthentication) {
        return true
    } else {
        return false
    }
}