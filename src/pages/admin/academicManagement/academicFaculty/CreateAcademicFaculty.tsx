import { Button, Col, Flex } from "antd";
import PHForum from "../../../../components/form/PHFroum";
import PHInput from "../../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicFacultySchema } from "../../../../schema/academicFacultySchema.schema";
import { useAddAcademicFacultyMutation } from "../../../../redux/feature/admin/academicManagement";
import { TResponse } from "../../../../types";
import { toast } from "sonner";
import { TAcademicFAculty } from "../../../../types/academicFaculty.type";


const CreateAcademicFaculty = () => {
    const [addAcademicFaculty, {isLoading}] = useAddAcademicFacultyMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
        const toastId = toast("Academic Faculty Adding");
        const facultyData = {
            name: data?.name
        }
        console.log(data);
        
        try {
            const res = (await addAcademicFaculty(facultyData)) as TResponse<TAcademicFAculty>;
            console.log(res);
            if (res.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("Academic Faculty Added", { id: toastId });
            }
          } catch (err) {
            toast.error("something went wrong", { id: toastId });
          }
    }

    return (
        <Flex justify="center" align="center">
      <Col span={6}>
        <PHForum
          resolver={zodResolver(academicFacultySchema)}
          onSubmit={onSubmit}
        >
          <PHInput label="Academic Faculty Name" name="name" type="text"/>
          <Button disabled={isLoading} htmlType="submit">
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </PHForum>
      </Col>
    </Flex>
    );
};

export default CreateAcademicFaculty;