import { Button } from "antd";
import { useForm } from 'react-hook-form'
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/feature/auth/authSlice";
const Login = () => {
    const {register, handleSubmit} = useForm();
    const [login, {error}] = useLoginMutation();
    const dispatch = useAppDispatch()

    const onSubmit = async (data) =>{
        const userInfo = {
            id: data.id,
            password: data.password
        }
        
        const res = await login(userInfo).unwrap();
        const user = verifyToken(res.data.accessToken)
        console.log('res =>',res);
        console.log('user =>',user);
        dispatch(setUser({user:user, token: res.accessToken}))
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