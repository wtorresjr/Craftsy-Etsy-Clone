import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as favoriteActions from "../../store/favorite";
import FavoritesTile from "../HomePage/FavoritesTile";
import "./FavoritesPage.css";


function FavoritesPage () {
    const dispatch = useDispatch();
    const allFavorites = useSelector(state => state.favorite.allFavorites)
    const [favorited, setFavorited] = useState({})

    useEffect(() => {
        dispatch(favoriteActions.loadCurrUserFavorites())
    }, [dispatch])


    useEffect(() => {
        const initialFavoritedState = {}
        allFavorites?.forEach((favorite) => {
            initialFavoritedState[favorite.id] = true
        })
        setFavorited(initialFavoritedState)
    }, [allFavorites])

    const changeState = (id) => {
        setFavorited(prev=> ({
            ...prev,
            [id]: !prev[id]
        }))
        dispatch(favoriteActions.removeFromCurrUserFavorites(id))
    }

    console.log(favorited)


    return (
        <>
            <div className="favoritespage-container">
                {allFavorites &&
                    allFavorites.map((favorite) => {
                         return <FavoritesTile key={favorite.id} favorite={favorite} favorited={favorited} changeState={changeState} />
                    })
                }

            </div>
        </>
    )
}

export default FavoritesPage;
