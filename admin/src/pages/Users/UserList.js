import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser, clearErrors, getAllUsers } from "../../reducers/userReducer/userAction";
import { DELETE_USER_RESET } from "../../reducers/userReducer/userTypes";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();

    const { error, users } = useSelector((state) => state.allUser);

    const { error: deleteError, isDeleted, message, } = useSelector((state) => state.updateDeleteUser);
    const deleteUserHandler = (id) => dispatch(deleteUser(id));
    // console.log(users, "userss");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success(message);
            navigate("/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

    const columns = [
        { field: "id", headerName: "User ID", maxWidth: 150, flex: 0.5, headerClassName: 'super-app-theme--header', },

        {
            field: "email", headerName: "Email", minWidth: 200, flex: 1, headerClassName: 'super-app-theme--header',
        },
        {
            field: "name", headerName: "Name", maxWidth: 100, flex: 0.3, headerClassName: 'super-app-theme--header',
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            maxnWidth: 80,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            }, headerClassName: 'super-app-theme--header',
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false, headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/users/${params.getValue(params.id, "id")}`}>
                            {/* updateUser comp una gonderir */}
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const [rows, setRows] = useState([])


    useEffect(() => {
        if (users) {
            let a = users?.map((item, index) => {
                return ({
                    id: item._id,
                    role: item.role,
                    email: item.email,
                    name: item.name,
                })
            });
            setRows(a)
        }
    }, [users])
    // console.log(rows);

    return (
        <Fragment>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="dashboard">
                        <div className="productListContainer" >
                            <h1 id="productListHeading">ALL USERS</h1>
                            <Box
                                sx={{
                                    height: 300,
                                    width: '100%',
                                    '& .super-app-theme--header': {
                                        backgroundColor: 'red',
                                    },
                                }}
                            >
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    options={{
                                        pageSize: 10,
                                        pageSizeOptions: [5, 10, 20],
                                    }}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    autoHeight
                                />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UsersList;