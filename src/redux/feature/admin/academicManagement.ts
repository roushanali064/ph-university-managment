import {
  TAcademicSemester,
  TQueryPArams,
  TReduxResponse,
} from "../../../types";
import { TAcademicFAculty } from "../../../types/academicFaculty.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
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
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useAddAcademicDepartmentMutation
} = academicManagementApi;
