import { NavLink } from "react-router-dom";

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
        </div>
    )
}

export default EmptyCartPage;
