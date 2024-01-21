import { useGetAcademicSemesterQuery } from "../../../redux/feature/academicSemester/academicSemester";


const AcademicSemester = () => {

    const {data} = useGetAcademicSemesterQuery(undefined)
    console.log(data);

    return (
        <div>
            <h1>academic semester {data?.data.length}</h1>
        </div>
    );
};

export default AcademicSemester;