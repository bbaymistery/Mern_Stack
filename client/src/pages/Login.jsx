import { useNavigate } from "react-router";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from '../components/Navbar/index'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import { clearErrorLogin } from "../redux/userRedux";
import { useAlert } from 'react-alert'
const Login = () => {
  const [email, setEmail] = useState("elgun.ezmemmedov@gmail.com")
  const [password, setPassword] = useState("elgun");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert()

  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password }, navigate);

  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorLogin())
    }
  }, [error, dispatch, alert])

  return (
    <>
      <Navbar />
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

            <Link onClick={() => navigate("/register")} style={{ fontWeight: "bold", color: 'red' }}>CREATE A NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};
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
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  ${mobile({ width: "75%" })}
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


export default Login;
