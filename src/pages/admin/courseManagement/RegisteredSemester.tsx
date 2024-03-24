import { Button, Dropdown, MenuProps, Table, TableColumnsType, Tag } from "antd";
import { useGetRegisteredSemesterQuery, useUpdateSemesterStatusMutation } from "../../../redux/feature/admin/semesterManagement";
import { TResponse, TSemesterRegistration } from "../../../types";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableDAta = Pick<
  TSemesterRegistration,
  "startDate" | "endDate" | "status"
>;

const items = [
  {
    label: 'Upcoming',
    key: 'UPCOMING'
  },
  {
    label: 'Ongoing',
    key: "ONGOING"
  },
  {
    label: 'Ended',
    key: 'ENDED'
  }
]

const RegisteredSemester = () => {
  const [semesterRegistrationId, setSemesterRegistrationId] = useState('')
  //   const [param, setParam] = useState<TQueryPArams[] | undefined>(undefined);
  const { data: RegisteredSemesterData, isFetching } =
    useGetRegisteredSemesterQuery([{ name: "sort", value: "year" }]);
  const [updateSemesterStatus,{isLoading: updateLoading}] = useUpdateSemesterStatusMutation()

  const tableData = RegisteredSemesterData?.data?.map(
    ({ _id, startDate, endDate, status, academicSemester }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusChange: MenuProps['onClick'] = async (data) =>{
    const toastId = toast('semester status updating....')
    const updateStatus = {
      id: semesterRegistrationId,
      data: {
        status: data.key
      }
    }
    try{
      const res = (await updateSemesterStatus(updateStatus)) as TResponse<any>
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      }else{
        toast.success(`Semester ${data.key} Now`, {id: toastId})
      }
    }catch(err){
      toast.error('something went wrong', {id: toastId})
    }
  }

  const columns: TableColumnsType<TTableDAta> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return <Dropdown menu={{items,onClick: handleStatusChange}} trigger={['click']}>
          <Button onClick={()=>setSemesterRegistrationId(item.key)}>Update</Button>
        </Dropdown>
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
      loading={isFetching || updateLoading}
      columns={columns}
      dataSource={tableData}
      //   onChange={onChange}
    />
  );
};

export default RegisteredSemester;
