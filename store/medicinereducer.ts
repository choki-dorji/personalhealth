import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Prescription, Presc } from "@/types";
import { Alarmdata, Alldata } from "@/types";


export const AppSlice = createApi({
  reducerPath: "AppSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ['alarm', "prescription"],
  endpoints: (builder) => ({
    getAlarm: builder.query<Alarmdata, void>({
      query: () => "api/alarm",
      providesTags: ['alarm']
    }),
    postAlarm: builder.mutation({
        query: (data) => ({
            url: '/api/alarm', // Change this to the appropriate endpoint
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
            url: '/api/HealthData', // Change this to the appropriate endpoint
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
        url: `/api/HealthData/${id}`, // Change this to the appropriate delete endpoint
        method: 'DELETE',
      }),
      invalidatesTags: ['prescription'],
    }),
    editPrescription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/HealthData/${id}`, // Change this to the appropriate endpoint
        method: 'PATCH', // Use PUT method for updating
        body: data,
      }),
    
      invalidatesTags: ['prescription'],
    }),
    getAllPrescription : builder.query<Alldata, void>({
      query: () => `api/HealthData/all`,
      providesTags: ['prescription']
    }),
    deleteAlarm : builder.mutation({
      query: (id) => ({
        url: `/api/alarm/${id}`, // Change this to the appropriate delete endpoint
        method: 'DELETE',
      }),
      invalidatesTags: ['alarm']
      
    })

    // blood pressure graph data
   

   
   
  }),
});

export const { useDeleteAlarmMutation, useGetAllPrescriptionQuery, useGetAlarmQuery, useEditPrescriptionMutation ,usePostAlarmMutation, useGetPrescriptionQuery, usePostPrescriptionMutation, useGetDetailPrescriptionQuery, useDeletePrescriptionMutation } =
  AppSlice;
