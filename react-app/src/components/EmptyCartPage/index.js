import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import "./emptyCartPage.css";

const EmptyCartPage = () => {
    return (

        <div className="emptyCartMsgContainer">
            <div>
                <div>
                    <h1 className="emptyCartMsg">Your cart is empty.</h1>
                </div>
                <div className="homePageLinkContainer">
                    <NavLink to="/" className="homePageLink">
                        Discover something unique to fill it up
                    </NavLink>
                </div>
            </div>

            {/* <div className="emptyCartMsgContainer">
                <h3>Looking for more of your finds?</h3>
                <button className="cartFavoriteButton"><NavLink to="/current-user/favorites" id="cartFavoriteButtonText">View your favorites</NavLink></button>
            </div> */}
        </div>
    )
}

export default EmptyCartPage;
