import { TQueryPArams, TReduxResponse, TStudent } from "../../../types";
import { TFaculty } from "../../../types/faculty.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // student
    getStudentData: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPArams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TReduxResponse<TStudent[]>) => {
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    // student
    getFacultyData: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPArams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/faculty",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TReduxResponse<TFaculty[]>) => {
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentDataQuery,
  useGetFacultyDataQuery,
} = userManagementApi;
