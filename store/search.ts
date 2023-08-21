import {createSlice} from "@reduxjs/toolkit"


interface Search {
    text: string
}

const initialState = {
    text: ""
}
const SearchReducer = createSlice({
    name: "reducer",
    initialState,
    reducers:{
        searchPrescription: (state: Search, action) => {
            state.text = action.payload;
          },    
    }
})
export const { searchPrescription} = SearchReducer.actions
export default SearchReducer.reducer 