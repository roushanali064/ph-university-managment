import { Button, Col, Flex } from "antd";
import PHForum from "../../../../components/form/PHFroum";
import PHSelect from "../../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import PHInput from "../../../../components/form/PHInput";
import { useAddAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } from "../../../../redux/feature/admin/academicManagement";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../../schema/academicDepartment.schema";
import { toast } from "sonner";
import { TResponse } from "../../../../types";
import { TAcademicDepartment } from "../../../../types/academicDepartment.type";

type TOptions = {
  label: string;
  value: string;
};

const CreateAcademicDepartment = () => {
  const { data: academicFaculties } = useGetAllAcademicFacultyQuery(undefined);
  const [addAcademicDepartment, {isLoading}] = useAddAcademicDepartmentMutation()

  const academicFacultiesOptions = academicFaculties?.data?.map(
    ({ _id, name }) => ({
      label: name,
      value: _id,
    })
  ) as TOptions[];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast("Academic Department Creating");

      const academicDepartmentData = {
          name: data.name,
          academicFaculty: data.academicFaculty,
        };

        try {
            const res = (await addAcademicDepartment(
              academicDepartmentData
            )) as TResponse<TAcademicDepartment>;
            if (res.error) {
              toast.error(res.error.data.message, { id: toastId });
            } else {
              toast.success("Academic Department created", { id: toastId });
            }
          } catch (err) {
            toast.error("something went wrong", { id: toastId });
          }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForum
          resolver={zodResolver(academicDepartmentSchema)}
          onSubmit={onSubmit}
        >
          <PHInput name="name" type="text" label="Department Name" />
          <PHSelect
            label="Select Academic Faculty"
            name="academicFaculty"
            options={academicFacultiesOptions}
          />
          <Button disabled={isLoading} htmlType="submit">
            {isLoading ? "Department Creating" : "Create Department"}
          </Button>
        </PHForum>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
