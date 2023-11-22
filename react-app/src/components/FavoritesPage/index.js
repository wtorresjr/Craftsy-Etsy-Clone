import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as favoriteActions from "../../store/favorite";
import "./FavoritesPage.css";


function FavoritesPage () {
    const dispatch = useDispatch();
    const allFavorites = useSelector(state => state.favorite.allFavorites)
    const [favorited, setFavorited] = useState({})
    const [removeId, setRemoveId] = useState('')


    useEffect(() => {
        dispatch(favoriteActions.loadCurrUserFavorites())
    }, [dispatch])


    useEffect(() => {
        const initialFavoritedState = {}
        allFavorites.forEach((favorite) => {
            initialFavoritedState[favorite.id] = true
        })
        setFavorited(initialFavoritedState)
    }, [allFavorites])



    const changeState = (id) => {
        setFavorited(prev=> ({
            ...prev,
            [id]: !prev[id]
        }))
    }


    return (
        <div className="favorites-page-container">
            <h1 style={{'fontWeight':'300'}}>Favorite items <span style={{'color':'#717171', 'fontSize':'0.65em'}}>{allFavorites.length} items</span></h1>
            <div className="container-favorite-cards">
                {allFavorites.map((favorite) => {
                    return (
                    <div className="favorite-card" key={`favorite-card-${favorite.id}`}>
                        <div className="favorite-product-preview-img" title={favorite.name}>
                            <div
                                className="favoritesPage-heartFav"
                                key={`favorite-card-${favorite.id}`}
                                onClick={() => changeState(favorite.id)}>{favorited[favorite.id] ? <i className="fas fa-heart" style={{ color: "#c70000" }} key={`heartFav-${favorite.id}`}></i> : <i className="far fa-heart" style={{ color: "black" }}></i>}
                            </div>
                            <img src={favorite.preview_image_url[0]} alt={favorite.name}/>
                        </div>
                        <div className="favorite-product-description">
                            <ul>
                                <li>{favorite.name}</li>
                                <li style={{'fontWeight': '600'}}>${favorite.price.toFixed(2)}</li>
                                {favorite.id % 2 === 0 && <li className="free-shipping-label">FREE Shipping</li>}
                            </ul>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>

    )
}

export default FavoritesPage;
