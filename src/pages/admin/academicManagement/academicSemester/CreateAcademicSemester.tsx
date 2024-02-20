import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForum from "../../../../components/form/PHFroum";
import { Button, Col, Flex } from "antd";
import { semesters } from "../../../../constant/semester";
import PHSelect from "../../../../components/form/PHSelect";
import { monthOption } from "../../../../constant/golobal";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schema/AcademicSemester.Schema";
import { useAddAcademicSemesterMutation } from "../../../../redux/feature/admin/academicManagement";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global.type";
import { TAcademicSemester } from "../../../../types";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  label: String(currentYear + number),
  value: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester, { isLoading }] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast("Semester Creating");

    const name = semesters[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForum
          resolver={zodResolver(academicSemesterSchema)}
          onSubmit={onSubmit}
        >
          <PHSelect label="Name" name="name" options={semesters} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOption}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOption} />
          <Button disabled={isLoading} htmlType="submit">
            {isLoading ? "Creating" : "Create Semester"}
          </Button>
        </PHForum>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
