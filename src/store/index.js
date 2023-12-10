import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import searchReducer from "./reducers/searchReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer
    }
})

export default store