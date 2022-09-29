
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { clearErrors, deleteProduct, getAdminProduct } from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );
    const { error, products } = useSelector((state) => state.products);
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

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
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProduct());
    }, [dispatch, deleteError, error, alert, isDeleted, navigate]);
    const columns = [
        { field: "id", headerName: "Product ID", maxWidth: 200, flex: 0.35 },

        {
            field: "name",
            headerName: "Name",
            maxWidth: 350,
            flex: .3,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            maxWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            maxWidth: 270,
            flex: 0.2,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}  >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];
    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });
    console.log(products);
    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer" style={{ width: "1400px", marginLeft: "200px" }}>
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList