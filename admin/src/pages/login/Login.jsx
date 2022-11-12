import Sidebar from "../../components/sidebar/Sidebar"
import "./login.scss"
import styled from "styled-components";
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearErrors, login } from '../../reducers/userReducer/userAction';
const Login = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [password, setPassword] = useState("elgun");
  const [email, setEmail] = useState("elgun.ezmemmedov@gmail.com")

  const { loading: isFetching, error } = useSelector((state) => state.user)

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
  }, [error, dispatch, alert])
  return (
    <div className="list">
      <div className="listContainer">
        <Container>
          <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
              <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={handleClick}>{isFetching ? "Loading" : "Login"}</Button>
              <Link onClick={() => navigate("/password/forgot")} >DO NOT YOU REMEMBER THE PASSWORD?</Link>
              {error && <Error>Something went wrong...</Error>}
              <br />
            </Form>
          </Wrapper>
        </Container>
      </div>
    </div>
  )
}

const Error = styled.span`
margin-top: 10px;
  color: red;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
      rgba(248, 154, 154, 0.5)
    ),
    url("https://wallpaperaccess.com/full/16676.jpg")
      top;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AbsoluteP = styled.p`
position: absolute;
right: 30px;
font-weight: bold;
transform: capitalize;
bottom: 20px;
  color: #7f7f88;
cursor: pointer;

`
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;

`;



export default Login