import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/feature/admin/academicManagement";
import { TQueryPArams } from "../../../../types";
import { TAcademicFAculty } from "../../../../types/academicFaculty.type";
import { useState } from "react";

type TTableData = Pick<TAcademicFAculty, "name">;

const AcademicFaculty = () => {
  const [params, setParam] = useState<TQueryPArams[] | undefined>(undefined);
  const { data: academicFaculties, isFetching } =
    useGetAllAcademicFacultyQuery(params);

  const tableData = academicFaculties?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const filterData = academicFaculties?.data?.map(({ name }) => ({
    text: name,
    value: name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: filterData,
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryPArams[] = [];

      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParam(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
