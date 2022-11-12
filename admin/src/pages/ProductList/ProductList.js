import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import  { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAdminProduct, clearErrors, deleteProduct } from '../../reducers/productsReducer/productAction';
import Box from '@mui/material/Box';
import { DELETE_PRODUCT_RESET } from '../../reducers/productsReducer/productTypes';

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
            navigate("/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProduct());
    }, [dispatch, error, alert, deleteError, isDeleted, navigate]);
    useEffect(() => {
        dispatch(getAdminProduct());
        console.log("calisdir");
        
    }, [dispatch])
    
    //
    const columns = [
        { field: "id", headerName: "Product ID", maxWidth: 200, flex: 0.35, headerClassName: 'super-app-theme--header', },

        {
            field: "name",
            headerName: "Name",
            maxWidth: 350,
            flex: .3,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            maxWidth: 150,
            flex: 0.3,
             headerClassName: 'super-app-theme--header',
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            maxWidth: 270,
            flex: 0.2,
             headerClassName: 'super-app-theme--header',
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            headerClassName: 'super-app-theme--header',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/products/${params.getValue(params.id, "id")}`}>
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


    const [rows, setRows] = useState([])

    useEffect(() => {
        if (products) {
            let a = products?.map((item, index) => {
                return ({
                    id: item._id,
                    stock: item.Stock,
                    price: item.price,
                    name: item.name,
                })
            });
            setRows(a)
        }
    }, [products])
  return (
    <div className="list">
       <Sidebar />
      <div className="listContainer">
        <Navbar />
              <div className="dashboard">
                  <div className="productListContainer" style={{ width: "1400px",  }}>
                      <h1 id="productListHeading">ALL PRODUCTS</h1>

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
  )
}

export default ProductList