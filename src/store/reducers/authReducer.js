import { createSlice } from "@reduxjs/toolkit"
import { checkAuth, getAuth } from "../../utils/auth"


const authReducer = createSlice({
    initialState: {
        isAuthentication: checkAuth(),
        emailUser: getAuth()
    },
    name: 'auth',
    reducers: {
        login(state, action) {
            state.isAuthentication = true
            state.emailUser = action.payload.email
        },
        logout(state) {
            state.isAuthentication = false
        }
    }
})

export const authAction = authReducer.actions

export default authReducer.reducer