export type TFaculty = {
    _id: string
    id: string
    user: string
    designation: string
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: string
    presentAddress: string
    permanentAddress: string
    profileImg: string
    academicDepartment: TAcademicDepartment
    academicFaculty: TAcademicFaculty
    isDeleted: boolean
    fullName: string
  }
  
  export type TName = {
    firstName: string
    middleName: string
    lastName: string
    _id: string
  }
  
  export type TAcademicDepartment = {
    _id: string
    name: string
    academicFaculty: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export type TAcademicFaculty = {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  