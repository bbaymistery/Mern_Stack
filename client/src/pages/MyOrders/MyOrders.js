/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { darken, lighten } from '@mui/material/styles';

import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";

import LaunchIcon from "@material-ui/icons/Launch";
import { clearErrorMyorders } from "../../redux/orderSlice";
import { getMyOrders } from "../../redux/apiCalls";
import Navbar from '../../components/Navbar/index'
const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { isFetchingMyOrders, errorMyOrders, myorders } = useSelector((state) => state.myOrders);
    const myProfileState = useSelector((state) => state.profile)
    const columns = [
        {
            field: "id", headerName: "Order ID", minWidth: 100, flex: .3,
            headerAlign: 'center',
            cellClassName: 'super-app-theme--cell',

        },

        {
            field: "status",
            headerName: "Status",

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
        },
        {
            field: "itemSize",
            headerName: "Item Size",
            type: "string",
            flex: 0.3,
            cellClassName: 'super-app-theme--cell',

        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            flex: 0.2,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const [rows, setRows] = useState([])

    useEffect(() => {
        if (myorders) {
            let a = myorders?.map((item, index) => {
                console.log(item, "item");

                return ({
                    itemsQty: item?.orderItems[0].quantity,
                    id: item?._id,
                    status: item?.orderStatus,
                    amount: item?.totalPrice,
                    itemSize: item?.orderItems[0].size ? item?.orderItems[0].size : "any"
                })
            });
            setRows(a)
        }
    }, [myorders])


    useEffect(() => {
        if (errorMyOrders) {
            alert.error(errorMyOrders);
            dispatch(clearErrorMyorders());
        }
        getMyOrders(dispatch)
    }, [dispatch, alert, errorMyOrders]);


    return (
        <>
            <Navbar />
            <div>
                {isFetchingMyOrders ? (
                    <Loader />
                ) : (
                    <div className="myOrdersPage" style={{ marginTop: "4.5rem" }}>
                        <Typography id="myOrdersHeading">
                            {myProfileState?.myProfile?.name ? myProfileState?.myProfile?.name : ""}'s Orders
                        </Typography>
                        {rows.length > 0 ?

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                options={{
                                    pageSize: 10,
                                    pageSizeOptions: [5, 10, 20],
                                }}
                                disableSelectionOnClick
                                className="myOrdersTable"
                                autoHeight
                                sx={{
                                    height: 400,
                                    width: '100%',
                                    '& .super-app-theme--cell': {
                                        backgroundColor: 'rgba(224, 183, 60, 0.55)',
                                        color: '#1a3e72',
                                        fontWeight: '600',
                                    },


                                }}
                            />
                            : "Oders  did not found"}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyOrders;
