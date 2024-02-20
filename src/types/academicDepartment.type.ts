import { TAcademicFAculty } from "./academicFaculty.type";

export type TAcademicDepartment = {
    _id: string;
    name: string;
    academicFaculty: TAcademicFAculty;
    createdAt: string;
    updatedAt: string;
  }