import { TAcademicSemester } from "."

export type TCourses = {
    _id: string
    title: string
    prefix: string
    code: number
    credit: number
    preRequisiteCourse: TPreRequisiteCourse[] | []
    isDeleted: boolean
  }
  
  export type TPreRequisiteCourse = {
    course: TCourse
    isDeleted: boolean
    _id: string
  }

  export type TSemester = {
    _id: string;
    academicSemester: TAcademicSemester;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export type TCourse = {
    _id: string
    title: string
    prefix: string
    code: number
    credit: number
    preRequisiteCourse?: TPreRequisiteCourse2[]
    isDeleted: boolean
    __v: number
  }
  
  export type TPreRequisiteCourse2 = {
    course: string
    isDeleted: boolean
    _id: string
  }
  