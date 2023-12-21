import {createSlice} from "@reduxjs/toolkit"


interface Search {
    search: string
}

const initialState = {
    search: ""
}
const SearchReducerUser = createSlice({
    name: "reducer",
    initialState,
    reducers:{
        searchedUser: (state: Search, action) => {
            state.search = action.payload;
          },    
    }
})
export const { searchedUser} = SearchReducerUser.actions
export default SearchReducerUser.reducer 