import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { editAproduct, getProductInfo } from '../../store/products';
import './UpdateProduct.css'

function UpdateProduct() {
    const { product_id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const currentProductInfo = useSelector((state) => state?.products?.productDetail);


    console.log(currentProductInfo)
    const [updatedProductInfo, setUpdatedProductInfo] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        preview_image_url: ''
    })
    // const [updatedName, setUpdatedName] = useState(currentProductInfo?.name)
    // const [updatedDescription, setUpdatedDescription] = useState(currentProductInfo?.description)
    // const [updatedPrice, setUpdatedPrice] = useState(currentProductInfo?.price)
    // const [updatedQuantity, setUpdatedQuantity] = useState(currentProductInfo?.quantity)
    // const [updatedPreviewImg, setUpdatedPreviewImg] = useState(currentProductInfo?.preview_image_url)

    const [errors, setErrors] = useState({});

    // const updatedProductInfo = {
    //     id: product_id,
    //     updatedName,
    //     updatedDescription,
    //     updatedPrice,
    //     updatedQuantity,
    //     updatedPreviewImg
    // }

    useEffect(() => {
        if (product_id) {
            dispatch(getProductInfo(parseInt(product_id)))
        }
    }, [dispatch, product_id])

    useEffect(() => {
        if (currentProductInfo && currentProductInfo.id) {
            setUpdatedProductInfo({
                name: currentProductInfo.name || '',
                description: currentProductInfo.description || '',
                price: currentProductInfo.price || '',
                quantity: currentProductInfo.quantity || '',
                preview_image_url: currentProductInfo.preview_image_url || ''
            })
        }
    }, [currentProductInfo])

    useEffect(() => {
        return () => {
            setUpdatedProductInfo({
                name: '',
                description: '',
                price: '',
                quantity: '',
                preview_image_url: ''
            })
        }
    }, [])


    // const errorCollector = {};
    // useEffect(() => {
    //     const validImgFormats = [
    //         ".jpg",
    //         ".png",
    //         "jpeg",
    //         "http:",
    //         "https",
    //         "ftp:/",
    //         "ftps:",
    //     ];

    //     const formatError = "Image must be .jpg, .jpeg or .png format.";
    //     const imageRequired = "Preview image is required.";
    //     const nameError1 = "Product name must be between 3 and 30 characters long.";
    //     const nameError2 = "Name must include alphabetic characters";
    //     const descError1 = "Description must be between 3 and 255 characters.";
    //     const descError2 = "Description must be alphabetic characters";
    //     const priceError = "Price must be a valid number greater than 0.";
    //     const quantityError = "Quantity must be a valid number greater than 0.";

    //     console.log(updatedProductInfo)


    //     if (updatedProductInfo.name.length < 3 || updatedProductInfo.name.length > 30) {
    //         errorCollector.name = nameError1;
    //     }
    //     if (updatedProductInfo.name.length && updatedProductInfo.name.trim() === "") {
    //         errorCollector.name = nameError2;
    //     }
    //     if (updatedProductInfo.description.length < 3 || updatedProductInfo.description.length > 255) {
    //         errorCollector.description = descError1;
    //     }
    //     if (updatedProductInfo.description.length && updatedProductInfo.description.trim() === "") {
    //         errorCollector.description = descError2;
    //     }
    //     if (updatedProductInfo.price <= 0) {
    //         errorCollector.price = priceError;
    //     }
    //     if (updatedProductInfo.quantity <= 0) {
    //         errorCollector.quantity = quantityError;
    //     }
    //     if (!updatedProductInfo.preview_image_url) {
    //         errorCollector.previewImg = imageRequired;
    //     }
    //     if (!validImgFormats.includes(updatedProductInfo.preview_image_url.slice(-4).toLowerCase())) {
    //         errorCollector.wrongFormat = formatError;
    //     }

    //     setErrors(errorCollector);

    // }, [updatedProductInfo.name, updatedProductInfo.description, updatedProductInfo.price, updatedProductInfo.quantity, updatedProductInfo.preview_image_url]);

    const handleProductUpdate = (e) => {
        e.preventDefault()

        dispatch(editAproduct(product_id, updatedProductInfo)).then(() => history.push(`/products/${product_id}`))
    }

    return (
        <>
            <div className="editListingContainer">
                <form onSubmit={handleProductUpdate}>
                    <h1>Update Your Product</h1>
                    <ul></ul>
                    <li>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={updatedProductInfo}
                                onChange={(e) => setUpdatedProductInfo({ ...updatedProductInfo, name: (e.target.value) })}
                                required
                            />
                        </label>
                        {errors && errors.name && <p className="errorDiv">{errors.name}</p>}
                    </li>
                    <li>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={updatedProductInfo}
                                onChange={(e) => setUpdatedProductInfo({ ...updatedProductInfo, description: (e.target.value) })}
                                required
                            />
                        </label>
                        <p className="errorDiv">{errors.description}</p>
                    </li>
                    <li>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={updatedProductInfo}
                                onChange={(e) => setUpdatedProductInfo({ ...updatedProductInfo, price: (e.target.value) })}
                                required
                            />
                        </label>
                        {errors && errors.price && <p className="errorDiv">{errors.price}</p>}
                    </li>
                    <li>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                name="quantity"
                                value={updatedProductInfo}
                                onChange={(e) => setUpdatedProductInfo({ ...updatedProductInfo, quantity: (e.target.value) })}
                                required
                            />
                        </label>
                        {errors && errors.quantity && (
                            <p className="errorDiv">{errors.quantity}</p>
                        )}
                    </li>
                    <li>
                        <label>
                            Preview Image:
                            <input
                                type="text"
                                name="preview_image_url"
                                value={updatedProductInfo}
                                onChange={(e) => setUpdatedProductInfo({ ...updatedProductInfo, preview_image_url: (e.target.value) })}
                                required
                            />
                        </label>
                        {errors && errors.previewImg && (
                            <p className="errorDiv">{errors.previewImg}</p>
                        )}
                        {errors && errors.wrongFormat && (
                            <p className="errorDiv">{errors.wrongFormat}</p>
                        )}
                    </li>
                    <button className="submitBtn" type="submit">
                        Update Product
                    </button>
                </form>
            </div>
        </>
    )




}

export default UpdateProduct;
