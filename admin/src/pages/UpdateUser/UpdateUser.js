import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../reducers/userReducer/userTypes";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getUserDetails, updateUser, clearErrors } from "../../reducers/userReducer/userAction";
import './productList.css'
const UpdateUser = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id: userId } = useParams();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    const { loading, error, user } = useSelector((state) => state.userDetail);
    const { loading: updateLoading, error: updateError, isUpdated, } = useSelector((state) => state.updateDeleteUser);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm));
    };
    useEffect(() => {
        dispatch(getUserDetails(userId))
    }, [dispatch, userId])
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [dispatch, user])


    return (
        <Fragment>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />

                    <div className="dashboard">
                        <div className="newProductContainer">
                            {loading ? (
                                "Loading"
                            ) : (
                                <form className="createProductForm" onSubmit={updateUserSubmitHandler} >
                                    <h1> Update User</h1>

                                    <div style={{ display: 'flex', margin: '1rem 0rem' }}>
                                        <PersonIcon style={{ marginRight: '10px' }} />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{ padding: '0px 16px', border: "1px solid gray", outline: "none" }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', margin: '1rem 0rem' }}>
                                        <MailOutlineIcon style={{ marginRight: '10px' }} />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            style={{
                                                padding: '0px 16px', border: "1px solid gray", outline: "none"
                                            }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', margin: '1rem 0rem' }}>
                                        <VerifiedUserIcon style={{ marginRight: '10px' }} />
                                        <select style={{
                                            padding: '0px 16px', border: "1px solid gray", outline: "none"
                                        }} value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="">Choose Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            updateLoading ? true : false || role === "" ? true : false
                                        }
                                    >
                                        Update
                                    </Button>
                                </form >
                            )}
                        </div>
                    </div >
                </div>
            </div>
        </Fragment >
    );
};

export default UpdateUser;