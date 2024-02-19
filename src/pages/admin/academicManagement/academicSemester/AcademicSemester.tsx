import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicSemesterQuery } from "../../../../redux/feature/admin/academicManagement";
import { TAcademicSemester, TQueryPArams } from "../../../../types";
import { useState } from "react";

export type TTableDAta = Pick<TAcademicSemester, 'name' | 'year' | 'startMonth' | 'endMonth'>

const AcademicSemester = () => {
  const [param, setParam] = useState<TQueryPArams[] | undefined>(undefined)
  const { data: semesterData } = useGetAcademicSemesterQuery(param);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key:_id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TTableDAta> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn',
        },
        {
          text: 'Fall',
          value: 'Fall',
        },
        {
          text: 'Summer',
          value: 'Summer',
        },
      ]
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      filters: [
        {
          text: '2024',
          value: '2024',
        },
        {
          text: '2025',
          value: '2025',
        },
        {
          text: '2026',
          value: '2026',
        },
        {
          text: '2027',
          value: '2027',
        },
      ]
    },
    {
      title: 'Start Month',
      dataIndex: 'startMonth',
      key: 'startMonth'
    },
    {
      title: 'End Month',
      dataIndex: 'endMonth',
      key: 'endMonth'
    },
  ];

  const onChange: TableProps<TTableDAta>['onChange'] = (pagination, filters, sorter, extra) => {
    if(extra.action === 'filter'){
      const queryParams: TQueryPArams[] = [];

      filters?.name?.forEach((item)=>(
        queryParams.push({name: 'name', value: item})
      ))

      filters?.year?.forEach((item)=>(
        queryParams.push({name: 'year', value: item})
      ))
      setParam(queryParams)
    }
  };

  return (
    <Table columns={columns} dataSource={tableData} onChange={onChange} />
  );
};

export default AcademicSemester;
