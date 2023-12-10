import { createSlice } from "@reduxjs/toolkit"
import { addDays } from "date-fns"
// Tạo một đối tượng DateTimeFormat với múi giờ Việt Nam
const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
const formatter = new Intl.DateTimeFormat('en-US', { timeZone: vietnamTimeZone });

const dateNow = formatter.format(new Date())
const dateAfter2day = formatter.format(addDays(new Date(), 2))
const searchReducer = createSlice({
    initialState: {
        address: '',
        dateStart: dateNow,
        dateEnd: dateAfter2day,
        numberPeople: 1,
        numberRoom: 1
    },
    name: 'search',
    reducers: {
        save(state, action) {
            state.address = action.payload.address
            state.dateStart = action.payload.dateStart
            state.dateEnd = action.payload.dateEnd
            state.numberPeople = action.payload.numberPeople ? action.payload.numberPeople : 1
            state.numberRoom = action.payload.numberRoom ? action.payload.numberRoom : 1
        },
    }
})

export const searchAction = searchReducer.actions

export default searchReducer.reducer