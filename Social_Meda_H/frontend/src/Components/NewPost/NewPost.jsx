import { Box, Button, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../../Actions/PostAction";
import { loadUser } from "../../Actions/UserActions";
// import { createNewPost } from "../../Actions/Post";
// import { loadUser } from "../../Actions/User";
import "./NewPost.css";
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFileName(file?.name);
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  //*newww
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    //*newwwwww
    dispatch(loadUser()); //bunu yazdikki Nexpostccreate edenen sonra Ozprofilegelende postlarm update olunsun
    navigate("/account");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {/* {image && <img src={image} alt="post" />} */}
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          image && <img src={image} alt="post" />
        )}
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={handleImageChange}
        />
        <span>{imageFileName}</span>
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
