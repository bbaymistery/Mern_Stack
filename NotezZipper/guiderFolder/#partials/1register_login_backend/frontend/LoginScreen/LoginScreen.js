import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import MainScreen from "../../MainScreen";
import Error from "../../Error";
import Loading from "../../Loading";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate({ pathname: "/mynotes" }, { replace: true });
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const url = "/api/users/login";
      const sentData = {
        email,
        password,
      };
      setLoading(true);
      const { data } = await axios.post(url, sentData, config);
      console.log(data);
      /* data is
      mongooseile create eledigimizdir
      email: "e@mail.ru"
isAdmin: false
name: "Elgun"
password: "$2a$10$9Q0H/mF3m.BMIRMnGijG0eBEHcA41th9fddOpFh3kXkDvBwf8oVki"
statusCode: "You logged in succesfully"
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmE2NzUxNTRmZTc2Y2Y2YjBmNjc5YSIsImlhdCI6MTY1MTE0MzYyMywiZXhwIjoxNjUzNzM1NjIzfQ.xO0dKYbbRsji2nMS0LGH-jDwLnX1djnfelQmvBcHGhE"
_id: "626a675154fe76cf6b0f679a"
      */
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <MainScreen title={"Login"}>
      <div className="loginContainer">
        {/* {error && <Error variant="danger"> {error}</Error>} */}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
