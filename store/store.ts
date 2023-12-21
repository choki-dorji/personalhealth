import { configureStore } from "@reduxjs/toolkit";
import  reducer  from "./reducer.reducer";
import { AppSlice } from "./Medicine/medicine.api";
import searchReducer from "./search.reducer";
import timereducer from "./time.reducer";
import { FireSlice } from "./Fire/fire.api";
import searchuser from "./searchuser.reducer";
import api from "@/service/api";

// const store = configureStore({
//     reducer: {
//         user: reducer,
//         search: searchReducer,
//         time: timereducer,
//         searchuser: searchuser,
//        [AppSlice.reducerPath] : AppSlice.reducer,
//        [BloodSlice.reducerPath] : BloodSlice.reducer,
//        [FireSlice.reducerPath]: FireSlice.reducer
       
//     },
//     middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
//     .concat(AppSlice.middleware)
//     .concat(BloodSlice.middleware)
//     .concat(FireSlice.middleware)
    
// })
const store = configureStore({
    reducer: {
        user: reducer,
        search: searchReducer,
        time: timereducer,
        searchuser: searchuser,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  })

export default store;