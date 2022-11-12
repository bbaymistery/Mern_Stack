import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../../components/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Navbar from '../../components/Navbar/index'
import img from "../../images/Profile.png";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../redux/apiCalls";
import { getCookie } from "../../helpers/cokieesFunc";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { clearErrorUpdateProfile } from "../../redux/profileReducer";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isUpdated, error, isFetching, myProfile: user } = useSelector((state) => state.profile);


  const [avatar, setAvatar] = useState(img);
  const [avatarPreview, setAvatarPreview] = useState(img);

  const [form, setForm] = useState({ name: "", email: "", });
  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    let finalForm;
    if (avatar.includes("static")) {
      finalForm = { ...form };
    } else {
      finalForm = { ...form, avatar, };
    }
    updateProfile(dispatch, finalForm, navigate)
    console.log(finalForm);

  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };


  useEffect(() => {
    if (user) {
      //bunu yazdkki me/update sehfesine gedende formlarin icin eski degerlere gore gelsin
      setForm({
        ...form,
        name: user.name,
        email: user.email,
        username: user.username,
        lastname: user.lastname

      });
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      navigate("/profile");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrorUpdateProfile())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isUpdated]);

  useEffect(() => {
    if (!user.avatar.url) {
      setAvatarPreview(img)
    }
  }, [user])

  return (
    <Fragment>
      <Navbar />
      {isUpdated ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName" >
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="updateProfileName" >
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Lastname"
                    required
                    name="lastname"
                    value={form.lastname}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="updateProfileName" >
                  <AccountCircleIcon />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    name="username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                {
                  !form.name ||
                    !form.email ||
                    !form.username || !form.lastname
                    ?
                    ""
                    :
                    <input
                      type="submit"
                      value={`${isFetching ? "Loading" : "Update"}`}
                      className="updateProfileBtn"
                    />
                }
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
