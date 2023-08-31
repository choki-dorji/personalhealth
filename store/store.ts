import { configureStore } from "@reduxjs/toolkit";
import  reducer  from "./reducer";
import { AppSlice } from "./medicinereducer";
import { BloodSlice } from "./bp";
import searchReducer from "./search";
import timereducer from "./timereducer";
import { FireSlice } from "./firebase";
import searchuser from "./searchuser";

const store = configureStore({
    reducer: {
        user: reducer,
        search: searchReducer,
        time: timereducer,
        searchuser: searchuser,
       [AppSlice.reducerPath] : AppSlice.reducer,
       [BloodSlice.reducerPath] : BloodSlice.reducer,
       [FireSlice.reducerPath]: FireSlice.reducer
       
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
    .concat(AppSlice.middleware)
    .concat(BloodSlice.middleware)
    .concat(FireSlice.middleware)
    
})

export default store;