import styled from '@emotion/styled'
import Link from "next/link";
export const Email = styled.div`
  color: red;
`

export const EmailInput = styled.input`
  width: 500px;
`
export const  Wrapper =styled.div`
  display: flex;
  width: 100%;
  margin-top: 100px;
  padding-bottom: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 10px gray;
  border: 1px solid black;
  min-width: 500px;
`

export  const UserInput = styled.input`
  width: 350px;
  height: 30px;
  border-radius: 1em;
  border: 1px solid gray;
  margin-bottom: 10px;
  margin-top: 5px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Button  = styled.button`
  background: orange;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #b06c00;
  margin-top: 1em;
  height: 50px;
`
export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 22px;
  margin-top: 30px;
  min-width: 500px;
  

`

export const Error = styled.div`
  color: red;
  font-size: 16px;
`

