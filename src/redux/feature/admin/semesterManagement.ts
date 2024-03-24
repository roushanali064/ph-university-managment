import {
  TCourse,
  TQueryPArams,
  TReduxResponse,
  TSemesterRegistration,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const semesterManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  semester registration
    getRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPArams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/semesterRegistration",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TReduxResponse<TSemesterRegistration[]>) => {
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
      providesTags: ['semesterRegistration']
    }),
    addsSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semesterRegistration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['semesterRegistration']
    }),
    updateSemesterStatus: builder.mutation({
      query: (args) => ({
        url: `/semesterRegistration/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ['semesterRegistration']
    }),
    //  courses
    getCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPArams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TReduxResponse<TCourse[]>) => {
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
      providesTags: ['courses']
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['courses']
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ['courses']
    }),
  }),
});

export const {
  useAddsSemesterRegistrationMutation,
  useGetRegisteredSemesterQuery,
  useUpdateSemesterStatusMutation,
  useGetCoursesQuery,
  useAddCourseMutation,
  useAddFacultiesMutation
} = semesterManagementApi;
