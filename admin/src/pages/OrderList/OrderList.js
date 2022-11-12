import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteOrder, getAllOrders, clearErrors, } from "../../reducers/orderReducer/oderAction";
import { DELETE_ORDER_RESET } from "../../reducers/orderReducer/oderTypes";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Box from '@mui/material/Box';
const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const { error, orders } = useSelector((state) => state.allorders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.updateDeleteOrder);
    const [rows, setRows] = useState([])

    const deleteOrderHandler = (id) => dispatch(deleteOrder(id))
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
            alert.success("Order Deleted Successfully");
            navigate("/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        {
            field: "id", headerName: "Order ID", minWidth: 100, flex: .3,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',

        },

        {
            field: "status",
            headerName: "Status",
            headerClassName: 'super-app-theme--header',
            flex: 0.2,
            cellClassName: (params) => {
                return params?.getValue(params?.id, "status").includes("Delivered")
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            width: 200,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "itemSize",
            headerName: "Item Size",
            type: "string",
            flex: 0.3,
            cellClassName: 'super-app-theme--cell',
            headerClassName: 'super-app-theme--header',

        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            flex: 0.2,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            type: "number",
            headerClassName: 'super-app-theme--header',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/orders/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];
    useEffect(() => {
        if (orders) {
            let a = orders?.map((item, index) => {
                return ({
                    itemsQty: ` ${item?.orderItems[0].quantity}       `,
                    id: item?._id,
                    status: item?.orderStatus,
                    amount: ` ${item?.totalPrice}`,
                    itemSize: item?.orderItems[0].size ? ` ${item?.orderItems[0].size}` : " any"
                })
            });
            setRows(a)
        }
    }, [orders])
    return (
        <Fragment>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="dashboard">
                        <div className="productListContainer" >
                            <h1 id="productListHeading">ALL ORDERS</h1>
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
                                    sx={{
                                        height: 400,
                                        width: '100%',

                                    }}
                                />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;