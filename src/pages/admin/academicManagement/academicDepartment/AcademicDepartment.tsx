import { Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/feature/admin/academicManagement";
import { TAcademicDepartment } from "../../../../types/academicDepartment.type";

type TTableData = {
    name: string;
    academicFaculty: string
}

const AcademicDepartment = () => {
    const {data: academicDepartment, isFetching} = useGetAllAcademicDepartmentQuery(undefined)

    const tableData = academicDepartment?.data?.map((item: TAcademicDepartment)=>({
        key: item._id,
        name: item.name,
        academicFaculty: item.academicFaculty.name
    }))

    const columns: TableColumnsType<TTableData> = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Academic Faculty",
          dataIndex: "academicFaculty",
          key: "academicFaculty",
        },
      ];


    return (
        <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
    );
};

export default AcademicDepartment;