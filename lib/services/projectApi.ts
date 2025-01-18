import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:1337/api/"}),
    endpoints:(builder)=>({
        //можно все вынести в Context API
        getProjects: builder.query({query:({type, status})=>`projects?filters[type][$in]=${type}&filters[state][$in]=${status}&populate=*`}),
        getAricles: builder.query({query:()=>'articles?populate=*'})
    }),
})

export const {useGetProjectsQuery} = projectApi