import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        try {
            const uploadRes =
                await axios.post("https://api.cloudinary.com/v1_1/dyplegxqx/image/upload", data);
            console.log(uploadRes);
            //bunu silende back endde silmeyi yazmadik haberin olsun

            const { url } = uploadRes.data;
            const newUser = { ...info, img: url, };
            let a = await axios.post("/auth/register", newUser);
            if (a.status === 200) {
                navigate("/users")
            }

        } catch (err) {
            console.log(err);
        }
    };



    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)//creating new url using local image
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                                </div>
                            ))}
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
