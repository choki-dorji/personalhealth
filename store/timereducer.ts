import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

interface User{
   time: number
}

const initialState = {
    user: 0
}
const timeReducer = createSlice({
    name: "reducer",
    initialState,
    reducers:{
        getSelectedTime: (state, action) => {
            state.user = action.payload
        },
      
    },
})
export const {getSelectedTime} = timeReducer.actions
export default timeReducer.reducer 