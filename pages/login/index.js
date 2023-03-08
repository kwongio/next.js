import React, {useState} from 'react';
import axios from "axios";
import {Button, Error, Form, UserInput, Wrapper} from "@/styles/emotion";
import {useRouter} from "next/router";

const Index = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/login", {
            username, password
        }).then(res => {
            localStorage.setItem("jwt", res.headers["authorization"]);
            router.push("/");
        }).catch(error => setErrorMessage(error.response.data.message))
    }


    return (<Wrapper>
            <h1>로그인</h1>
            <Form onSubmit={handleSubmit}>
                아이디
                <UserInput value={username} type={"text"} onChange={e => setUsername(e.target.value)}/>
                비밀번호
                <UserInput value={password} type={"password"} onChange={e => setPassword(e.target.value)}/>
                {errorMessage && <Error>{errorMessage}</Error>}
                <Button type={"submit"}>로그인</Button>
            </Form>
        </Wrapper>

    );
};

export default Index;