import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForum from "../components/form/PHFroum";
import PHInput from "../components/form/PHInput";
const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
        const tostID = toast('Logging In')
        const userInfo = {
            id: data.id,
            password: data.password
        }
        try{

            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as unknown as TUser
            dispatch(setUser({user:user, token: res.data.accessToken}));
            toast('Logged in',{id: tostID, duration: 2000})
            navigate(`/${user.role}/dashboard`)
        }catch(err){
            toast('something wen wrong',{id: tostID, duration: 2000})
        }
  };

  return (
    <Row justify={'center'} align={'middle'} style={{height: '100vh'}}>
      <PHForum onSubmit={onSubmit}>
          <PHInput type={"text"} name={"id"} label={"ID:"} />
        
          <PHInput type={"text"} name={"password"} label={"Password"} />
        <Button htmlType="submit">Login</Button>
      </PHForum>
    </Row>
  );
};

export default Login;
