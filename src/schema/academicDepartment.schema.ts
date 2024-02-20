import { z } from "zod";

export const academicDepartmentSchema = z.object({
    name: z.string({required_error: 'Please fill the Department Name'}),
    academicFaculty: z.string({required_error: 'please select academic faculty'})
})