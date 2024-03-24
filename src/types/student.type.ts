import { TAcademicSemester } from ".";
import { TAcademicDepartment } from "./academicDepartment.type";
import { TAcademicFAculty } from "./academicFaculty.type";

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  bloodGroup: string;
  localGuardian: LocalGuardian;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFAculty;
  admissionSemester: TAcademicSemester;
  profileImg: string;
  isDeleted: boolean;
  fullName: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type LocalGuardian = {
  name: string;
  relation: string;
  contactNo: string;
  address: string;
  _id: string;
};
