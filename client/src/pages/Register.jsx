import styled from "styled-components";
import { mobile } from "../responsive";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from '../components/Navbar/index';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";
import { clearErrorRegister, clearIsRegisteredSucces } from "../redux/userRedux";
import { useAlert } from "react-alert";
const Register = () => {
  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPas, setShowPas] = useState(false)
  const [avatar, setAvatar] = useState();

  const [file, setFile] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    username: "",
    lastname: "",
    password: "",
    name: ""
  })

  console.log(file);

  const { isFetching, error, isRegistered } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    if (
      !formValue.email ||
      !formValue.name ||
      !formValue.username ||
      !formValue.lastname ||
      !formValue.password
    ) {
      return alert("please fill all the blanks")
    }

    let form = null

    if (avatar) {
      form = { ...formValue, avatar }
    } else {
      form = { ...formValue, avatar: "" }
    }

    register(dispatch, { form }, navigate);

  };
  const handleChange = (e) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0])
  }
  useEffect(() => {
    if (error?.length) {
      alert.error(error);
      dispatch(clearErrorRegister())
    }
    if (isRegistered?.length) {
      alert.success(isRegistered);
      dispatch(clearIsRegisteredSucces())
    }
  }, [error, dispatch, alert, isRegistered])


  return (
    <>
      <Navbar />
      <Container>

        <Wrapper>
          <AbsoluteP onClick={() => navigate("/login")} > Login </AbsoluteP>
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
              onChange={(e) => handleImage(e)}
              style={{ display: "none" }}
            />
          </div>
          <Form>
            <Input placeholder="name" name="name" onChange={handleChange} />
            <Input placeholder="last name" name="lastname" onChange={handleChange} />
            <Input placeholder="username" name="username" onChange={handleChange} />
            <Input placeholder="email" name="email" onChange={handleChange} />
            <InputPas placeholder="password" name="password" type={showPas ? "text" : "password"} onChange={handleChange} />
            {/* <Input placeholder="confirm password" /> */}

            <div onClick={() => setShowPas(!showPas)} style={{ position: "absolute", left: '350px', bottom: '125px' }}>
              {showPas ? <VisibilityIcon style={{ fontSize: '1.1rem', cursor: 'pointer' }} /> : <VisibilityOffIcon style={{ fontSize: '1.1rem', cursor: 'pointer' }} />}
            </div>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button

              onClick={handleClick}
            >{isFetching ? "Loading" : "Create"}</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
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
const InputPas = styled.input`
  min-width: 350px;
  max-width: 350px;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
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
