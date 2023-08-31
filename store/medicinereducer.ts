import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Prescription, Presc, graphdata } from "@/types";
import { Alarmdata, Alldata, editPrescription } from "@/types";
import { UserData } from "@/types";


export const AppSlice = createApi({
  reducerPath: "AppSlice",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_NEXT_DOMAIN }),
  tagTypes: ['alarm', "prescription"],
  endpoints: (builder) => ({
    getAlarm: builder.query<Alarmdata, void>({
      query: () => "api/alarm",
      providesTags: ['alarm']
    }),
    postAlarm: builder.mutation({
        query: (data) => ({
            url: 'api/alarm', // Change this to the appropriate endpoint
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ['alarm']
    }),
    getPrescription: builder.query<Prescription, void>({
      query: () => "api/HealthData",
      providesTags: ['prescription']
    }),
    postPrescription: builder.mutation({
        query: (data) => ({
            url: 'api/HealthData', // Change this to the appropriate endpoint
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ['prescription']
    }),
    getDetailPrescription : builder.query({
      query: (id) => `api/HealthData/${id}`,
      providesTags: ['prescription']
    }),
    deletePrescription: builder.mutation<Presc, string>({
      query: (id) => ({
        url: `api/HealthData/${id}`, // Change this to the appropriate delete endpoint
        method: 'DELETE',
      }),
      invalidatesTags: ['prescription'],
    }),
    // the type of th builder.mttatuib will be first one will be the types of response and second one will be th type of payload
    editPrescription: builder.mutation<Presc, editPrescription>({
      query: ({ id, data }) => ({
        url: `api/HealthData/${id}`, // Change this to the appropriate endpoint
        method: 'PATCH', // Use PUT method for updating
        body: data,
      }),
    
      invalidatesTags: ['prescription'],
    }),
    getAllPrescription : builder.query<graphdata, string>({
      query: (id) => `/api/HealthData/all/${id}`,
      providesTags: ['prescription']
    }),
    deleteAlarm : builder.mutation({
      query: (id) => ({
        url: `api/alarm/${id}`, // Change this to the appropriate delete endpoint
        method: 'DELETE',
      }),
      invalidatesTags: ['alarm']
      
    }),
    getAlluser: builder.query<UserData, void>({
      query : () => "api/allusers"
    })

    // blood pressure graph data
   

   
   
  }),
});

export const { useGetAlluserQuery, useDeleteAlarmMutation, useGetAllPrescriptionQuery, useGetAlarmQuery, useEditPrescriptionMutation ,usePostAlarmMutation, useGetPrescriptionQuery, usePostPrescriptionMutation, useGetDetailPrescriptionQuery, useDeletePrescriptionMutation } =
  AppSlice;
