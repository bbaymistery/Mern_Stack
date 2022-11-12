import styled from "styled-components";
import { mobile } from "../responsive";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const Register = () => {
  const [file, setFile] = useState("");

  return (
    <Container>


      <Wrapper>
        <AbsoluteP> Login </AbsoluteP>
        <Title>CREATE AN ACCOUNT</Title>
        <div
          style={{
            display: 'flex',
            alignItems: "center"
            , justifyContent: "center"
          }}
        >
          <img
            style={{ width: "50px" }}
            src={
              file
                ? URL.createObjectURL(file)//creating new url using local image
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
          <label htmlFor="file" style={{ marginLeft: "10px" }}>
            <DriveFolderUploadOutlinedIcon className="icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />


          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:  linear-gradient(
    rgba(255, 255, 255, 0.5),
      rgba(248, 154, 154, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
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
font-size: 20px;
cursor: pointer;

`
const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;



export default Register;
