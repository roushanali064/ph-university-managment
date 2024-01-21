import { Button } from "antd";
import { FieldValues, useForm } from 'react-hook-form'
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch()

    const onSubmit = async (data: FieldValues) =>{
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
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" {...register('id')}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" {...register('password')}/>
            </div>
            <Button htmlType="submit">Login</Button>
        </form>
    );
};

export default Login;