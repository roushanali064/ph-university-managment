import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getAcademicSemester: builder.query({
            query: ()=>({
                url: '/academic-semester',
                method: 'GET'
            })
        })
    })
})

export const {useGetAcademicSemesterQuery} = academicSemesterApi