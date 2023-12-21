import api from "@/service/api";
import { BMIData, Bmidata, BpData, UserDatabase, bloodData } from "@/types";

export const FireSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getFireData: builder.query<UserDatabase, void>({
            query: () => "user.json",
            providesTags: ["fire"]
          }),
        getFireDataid: builder.query({
          query: (id) => `user/${id}.json`,
          providesTags: ["fire"]
        }),
        editFire: builder.mutation({
          query: ({ id, data }) => ({
            url: `user/${id}.json`, // Change this to the appropriate endpoint
            method: 'PATCH', // Use PUT method for updating
            body: data,
          }),
        
          invalidatesTags: ['fire'],
        }),
})
})

export const {useGetFireDataQuery, useGetFireDataidQuery, useEditFireMutation } =
FireSlice;