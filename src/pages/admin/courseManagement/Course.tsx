import { Button, Modal, Table, TableColumnsType } from "antd";
import { useAddFacultiesMutation, useGetCoursesQuery } from "../../../redux/feature/admin/semesterManagement";
import { TCourse } from "../../../types";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForum from "../../../components/form/PHFroum";
import { useGetFacultyDataQuery } from "../../../redux/feature/admin/userManagment";
import PHSelect from "../../../components/form/PHSelect";

export type TTableDAta = Pick<TCourse, "title" | "code">;

const Course = () => {
  //   const [param, setParam] = useState<TQueryPArams[] | undefined>(undefined);
  const { data: courseData, isFetching } = useGetCoursesQuery(undefined);

  const tableData = courseData?.data?.map(({ _id, title, code }) => ({
    key: _id,
    title,
    code,
  }));

  const columns: TableColumnsType<TTableDAta> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return <AddFaculty facultyInfo={item} />;
      },
      width: "1%",
    },
  ];

  //   const onChange: TableProps<TTableDAta>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryPArams[] = [];

  //       filters?.name?.forEach((item) =>
  //         queryParams.push({ name: "name", value: item })
  //       );

  //       filters?.year?.forEach((item) =>
  //         queryParams.push({ name: "year", value: item })
  //       );
  //       setParam(queryParams);
  //     }
  //   };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      //   onChange={onChange}
    />
  );
};

const AddFaculty = ({facultyInfo}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetFacultyDataQuery(undefined);
  const [addFaculties, {isLoading: addIsLoading}] = useAddFacultiesMutation()

  const facultyOptions = data?.data?.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data.key);
    const facultyData = {
      courseId : facultyInfo.key,
      data
    }
    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Faculty
      </Button>
      <Modal
      footer={null}
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PHForum onSubmit={handleSubmit}>
          <PHSelect
            disabled={isLoading}
            options={facultyOptions}
            label="Add Faculty"
            name="faculties"
            mode="multiple"
          />
          <Button disabled={addIsLoading} htmlType="submit">Add Faculty</Button>
        </PHForum>
      </Modal>
    </>
  );
};

export default Course;
