import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


export interface Auth{
    auth: {
    address: string,
    email: string,
    image: string,
    key: string,
    name: string
    }
}
const initialState = {
    auth:{
        address: "",
        email: "",
        image: "",
        key: "",
        name: ""
    }
}
const Reducer = createSlice({
    name: "reducer",
    initialState,
    reducers:{
        getAuthData: (state: Auth, action) => {
            state.auth = action.payload
        },
      
    },
})
export const {getAuthData} = Reducer.actions
export default Reducer.reducer 