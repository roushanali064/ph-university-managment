import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHForum from "../../../components/form/PHFroum";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetCoursesQuery,
} from "../../../redux/feature/admin/semesterManagement";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const { data: courses, isLoading: coursesIsLoading } =
    useGetCoursesQuery(undefined);

  const preRequestCourseOption = courses?.data?.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast("Course Creating....");

    const semesterData = {
      ...data,
      code: Number(data?.code),
      credit: Number(data?.credit),
      preRequisiteCourse: data.preRequisiteCourse
        ? data.preRequisiteCourse.map((item: string) => ({
            course: item,
          }))
        : [],
    };
    console.log(semesterData);

    try {
      const res = (await addCourse(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course Add Successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForum onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="number" name="code" label="Code" />
          <PHInput type="number" name="credit" label="Credit" />

          <PHSelect
            label=" PreRequisite Course"
            name="preRequisiteCourse"
            mode="multiple"
            options={preRequestCourseOption}
            disabled={coursesIsLoading}
          />

          <Button disabled={isLoading} htmlType="submit">
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </PHForum>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
