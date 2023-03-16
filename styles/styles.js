import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  
`
export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px gray;
  border: 1px solid black;

`

export const UserInput = styled.input`
  width: 350px;
  height: 30px;
  border-radius: 1em;
  border: 1px solid gray;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 18px;
  padding: 10px;
  
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`


export const NavBarWrapper = styled.nav`
  min-width: 1300px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 22px;

`

export const Error = styled.div`
  color: red;
  font-size: 16px;
`

export const Button = styled.button`
  background: orange;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #b06c00;
  margin-top: 1em;
  height: 50px;
`

