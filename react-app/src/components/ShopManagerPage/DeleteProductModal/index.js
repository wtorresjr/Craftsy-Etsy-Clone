import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../store/products";
import { useModal } from "../../../context/Modal";
import "./DeleteProductModal.css";

function DeleteProductModal({ product }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
        closeModal();
    };

    return (
        <>
        <div className='delete-product-modal-wrapper'>
          <h1 className="delete-product-modal-h1">Delete a Review</h1>
          <p>Are you sure you want to delete the product: <span style={{fontWeight:'600'}}>{product.name}</span>?</p>
              <div className='buttons-mgmt-div'>
                <button className='yes-button' onClick={handleDelete}>Yes</button>
                <button className='no-button' onClick={closeModal}>No</button>
              </div>
        </div>
        </>
    );
}

export default DeleteProductModal;
