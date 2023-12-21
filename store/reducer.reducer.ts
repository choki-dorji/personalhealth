import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// import { products } from "@/components/Card/Card"

// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//     const response = await fetch('http://localhost:3000/api/addpost');
//     return response.json()
//   });

interface User{
    email: string;
    password: string;
}

interface Users{
    user: User[]
}

const initialState = {
    user: []
}
const Reducer = createSlice({
    name: "reducer",
    initialState,
    reducers:{
        getItem: (state, action) => {
            state.user = action.payload
        },
      
    },
})
export const {getItem} = Reducer.actions
export default Reducer.reducer 