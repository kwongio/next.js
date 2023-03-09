import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/styles"

const JoinSchema = yup.object({
    username: yup.string().required("필수값이다"),
    email: yup.string().email("이메일형식으로 해라"),
    password: yup.string().min(4, "비밀번호는 최소 4글자리입니다"),
    fullName: yup.string(),
});


export default function Home() {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(JoinSchema)});
    const [error, setError] = useState("");
    const router = useRouter();
    const onClickSubmit = async (data) => {
        console.log(data);
        setError("");
        try {
            await axios.post("/join", {
                username: data.username,
                password: data.password,
                email: data.email,
                fullName: data.fullName
            });
            alert("회원가입성공");
            await router.push("/login");
        } catch (error) {
            setError(error.response.data.message);
        }
    }


    return (<Wrapper>
            <h1>회원가입</h1>
            <Form onSubmit={handleSubmit(onClickSubmit)}>
                <UserInput type="text" placeholder="username" {...register("username")}/>
                <Error>{errors.username?.message}</Error>
                <UserInput type="password" placeholder="password"{...register("password")}/>
                <Error>{errors.password?.message}</Error>
                <UserInput type="text" placeholder="email" {...register("email")}/>
                <Error>{errors.email?.message}</Error>
                <UserInput type="text" placeholder="fullName"{...register("fullName")}/>
                <Error>{errors.fullName?.message}</Error>
                {error && <Error>{error}</Error>}

                <Button>회원가입</Button>
            </Form>
        </Wrapper>

    )
}
