import { useParams } from "react-router-dom";


const StudentDetails = () => {
    const {studentId} = useParams()
    return (
        <div>
            <p>i am student {studentId}</p>
        </div>
    );
};

export default StudentDetails;