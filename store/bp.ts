// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BpData, Bmidata, BMIData, bloodData } from "@/types";

// export const BloodSlice = createApi({
//   reducerPath: "BloodSlice",
//   baseQuery: fetchBaseQuery({ baseUrl:  process.env.NEXT_PUBLIC_NEXT_DOMAIN }),
//   tagTypes: ['bp', "weight"],
//   endpoints: (builder) => ({
//     getBp: builder.query<BpData, void>({
//       query: () => "/api/bloobpressure",
//       providesTags: ["bp"]
//     }),
//     postBp: builder.mutation({
//         query: (data) => ({
//             url: 'api/bloobpressure', 
//             method: 'POST',
//             body: data,
            
//           }),
//           invalidatesTags: ["bp"]
//     }),
//     getBMI: builder.query<Bmidata, void>({
//       query: () => "api/weights",
//       providesTags:["weight"]
//     }),
//     postBMI: builder.mutation({
//       query: (data) => ({
//           url: 'api/weights', 
//           method: 'POST',
//           body: data,
//         }),
//         invalidatesTags: ["weight"]

//   }),
//   getBlooddata: builder.query<bloodData, void>({
//     query: () => "api/Graph/bloodpressure",
//     providesTags: ["bp"]
//   }),
//   getBMIData: builder.query<BMIData, void>({
//     query: () => "api/Graph/weights",
//     providesTags: ["weight"]
//   }),
  
   
//   }),
// });

import api from "@/service/api";
import { BMIData, Bmidata, BpData, bloodData } from "@/types";

const bpapi = api.injectEndpoints({
  endpoints: (builder) => ({
        getBp: builder.query<BpData, void>({
          query: () => "/api/bloobpressure",
          providesTags: ["bp"]
        }),
        postBp: builder.mutation({
            query: (data) => ({
                url: 'api/bloobpressure', 
                method: 'POST',
                body: data,
                
              }),
              invalidatesTags: ["bp"]
        }),
        getBMI: builder.query<Bmidata, void>({
          query: () => "api/weights",
          providesTags:["weight"]
        }),
        postBMI: builder.mutation({
          query: (data) => ({
              url: 'api/weights', 
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ["weight"]
    
      }),
      getBlooddata: builder.query<bloodData, void>({
        query: () => "api/Graph/bloodpressure",
        providesTags: ["bp"]
      }),
      getBMIData: builder.query<BMIData, void>({
        query: () => "api/Graph/weights",
        providesTags: ["weight"]
      }),
})
})

export const { useGetBMIDataQuery, useGetBpQuery, usePostBpMutation, useGetBMIQuery, usePostBMIMutation, useGetBlooddataQuery} =
bpapi;