import {Button, Error, Form, UserInput, Wrapper} from "@/styles/emotion"
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [joinError, setJoinError] = useState("");

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/join", {
                username, password, email, fullName
            });
            router.push("/login");
        } catch (error) {
            setUsernameError(error.response.data.data?.username);
            setPasswordError(error.response.data.data?.password);
            setEmailError(error.response.data.data?.email);
            setFullNameError(error.response.data.data?.fullName);
            setJoinError(error.response.data?.message);
        }

    }


    return (<Wrapper>
            <h1>회원가입</h1>
            <Form onSubmit={handleSubmit}>
                <div>아이디</div>
                <UserInput value={username} type={"text"} onChange={e => setUsername(e.target.value)}/>
                {usernameError && <Error>{usernameError}</Error>}
                <div>비밀번호</div>
                <UserInput value={password} type={"password"} onChange={e => setPassword(e.target.value)}/>
                {passwordError && <Error>{passwordError}</Error>}
                <div>이메일</div>
                <UserInput value={email} type={"text"} onChange={e => setEmail(e.target.value)}/>
                {emailError && <Error>{emailError}</Error>}

                <div>이름</div>
                <UserInput value={fullName} type={"text"} onChange={e => setFullName(e.target.value)}/>
                {fullNameError && <Error>{fullNameError}</Error>}
                {joinError && <Error>{joinError}</Error>}
                <Button type={"submit"}>회원가입</Button>
            </Form>
        </Wrapper>

    )
}
