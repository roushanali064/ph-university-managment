import { TAcademicSemester } from "."

export type TSemesterRegistration ={
    _id: string;
    academicSemester: TAcademicSemester;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }