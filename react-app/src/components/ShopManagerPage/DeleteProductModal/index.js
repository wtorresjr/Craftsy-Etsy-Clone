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
    }



    return (
        <>
            <div className="delete-product-container">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </>
    );
}

export default DeleteProductModal;
