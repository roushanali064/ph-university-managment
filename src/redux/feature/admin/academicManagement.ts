import {
  TAcademicSemester,
  TQueryPArams,
  TReduxResponse,
} from "../../../types";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";
import { TAcademicFAculty } from "../../../types/academicFaculty.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // academic semester
    getAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPArams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/academic-semester",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TReduxResponse<TAcademicSemester[]>) => {
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
      providesTags: ['academicSemester']
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['academicSemester']
    }),
    // academic faculty
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['academicFAculty']
    }),
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPArams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TReduxResponse<TAcademicFAculty[]>) => {
        return {
          meta: res?.meta,
          data: res?.data,
        };
      },
      providesTags: ['academicFAculty']
    }),
    // academic department
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['academicDepartment']
    }),
    getAllAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-department",
          method: "GET",
        };
      },
      transformResponse: (res: TReduxResponse<TAcademicDepartment[]>) => {
        return {
          meta: res?.meta,
          data: res?.data,
        };
      },
      providesTags: ['academicDepartment']
    }),
  }),
});

export const {
  useGetAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery
} = academicManagementApi;
