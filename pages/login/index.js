import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles";
import {useState} from "react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {accessTokenState} from "@/src/commons/recoil";

const LoginSchema = yup.object({
    username: yup.string().required("필수값이다"), password: yup.string().required("필수값이다").min(4, "4자리"),
});

const Index = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({resolver: yupResolver(LoginSchema)});
    const [error, setError] = useState("");
    const router = useRouter();
    // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
    const onClickSubmit = async (data) => {
        try {
            const response = await axios.post("/login", {
                username: data.username, password: data.password
            });
            localStorage.setItem("jwt", response.headers["authorization"]);
            // setAccessToken(response.headers["authorization"]);
            await router.push("/");
        } catch (error) {
            setError("아이디 또는 비밀번호가 틀렸습니다.");
        }
    }


    return (<Wrapper>
        <h1>로그인</h1>
        <Form onSubmit={handleSubmit(onClickSubmit)}>
            <UserInput type="text" placeholder="username"  {...register("username")}/>
            <Error>{errors.username?.message}</Error>
            <UserInput type="password" placeholder="password" {...register("password")}/>
            <Error>{errors.password?.message}</Error>
            {error && <Error>{error}</Error>}
            <Button>로그인</Button>
        </Form>
    </Wrapper>);
};

export default Index;