import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, updateProduct, getProductDetails, } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getProductDetails, updateProduct, clearErrors } from "../../reducers/productsReducer/productAction";
import './newProduct.css';
import { UPDATE_PRODUCT_RESET } from "../../reducers/productsReducer/productTypes";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const { error, product } = useSelector((state) => state.productDetails);
  const alertAlert = useAlert()
  const { loading, error: updateError, isUpdated, } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);//which is  sent api
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["tshirt", "coats", "jeans",];

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [productId, dispatch])


  useEffect(() => {

    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [product])

  // console.log(product);
  useEffect(() => {

    if (error) {
      alertAlert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alertAlert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alertAlert.success("Product Updated Successfully");
      navigate("/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, alertAlert, updateError,]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    if (!name || !price || !description || !category || !Stock || images.length === 0) return alert("Fill blank")
    let myForm = { name, stock: Stock, price, images, description, category }
    console.log(myForm);
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview([...imagesPreview, reader.result]);
          setImages([...images, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
console.log(images,"omages");

  return (
    <Fragment>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="dashboard">
            <div className="newProductContainer" >
              <form className="createProductForm"


                encType="multipart/form-data" onSubmit={updateProductSubmitHandler}  >
                <h1>Update product</h1>
                <div>
                  <SpellcheckIcon />
                  <input type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <AttachMoneyIcon />
                  <input type="number" placeholder="Price" required onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>

                <div>
                  <DescriptionIcon />
                  <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1" ></textarea>
                </div>

                <div>
                  <AccountTreeIcon />
                  <select value={category} onChange={(e) => setCategory(e.target.value)}    >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <StorageIcon />
                  <input type="number" placeholder="Stock" required onChange={(e) => setStock(e.target.value)} value={Stock} />
                </div>

                <div id="createProductFormFile">
                  <input type="file" name="avatar" accept="image/*" onChange={updateProductImagesChange} multiple />
                </div>

                {images.length ? "" : <p>Previous Images You should select New Images</p>}
                <div id="createProductFormImage">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img  key={index} src={image.url} alt="Old Product Preview" />
                    ))}
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  {loading ? "Loading" : "Create"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;