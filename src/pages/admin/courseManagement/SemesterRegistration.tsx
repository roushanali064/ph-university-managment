import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHForum from "../../../components/form/PHFroum";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAcademicSemesterQuery } from "../../../redux/feature/admin/academicManagement";
import { semesterStatus } from "../../../constant/semester";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddsSemesterRegistrationMutation } from "../../../redux/feature/admin/semesterManagement";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const { data: academicSemester, isLoading: academicSemesterLoading } =
    useGetAcademicSemesterQuery([{name: 'sort', value: 'year'}]);
    const [addsSemesterRegistration, {isLoading}] = useAddsSemesterRegistrationMutation()

  const academicDepartmentOptions = academicSemester?.data?.map((item) => ({
    label: `${item.name} ${item.year}`,
    value: item._id,
  }));


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast("Semester Registering");
    
    const semesterData = {
        ...data,
        minCredit: Number(data.minCredit),
        maxCredit: Number(data.maxCredit)
    }

    try {
      const res = (await addsSemesterRegistration(
        semesterData
      )) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Registered successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForum onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicDepartmentOptions}
            disabled={academicSemesterLoading}
          />
          <PHSelect
            label=" Status"
            name="status"
            options={semesterStatus}
          />
          <PHDatePicker label="Start Date" name="startDate"/>
          <PHDatePicker label="End Date" name="endDate"/>
          <PHInput type="number" name="minCredit" label="Min Credit"/>
          <PHInput type="number" name="maxCredit" label="Max Credit"/>
          <Button disabled={isLoading} htmlType="submit">
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </PHForum>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
