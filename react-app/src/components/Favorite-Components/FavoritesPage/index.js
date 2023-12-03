import { useEffect, Redirect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as favoriteActions from "../../../store/favorite";
import FavoritesTile from "../FavoritesTile";
import NoFavorites from "./NoFavorites";
import "./FavoritesPage.css";

function FavoritesPage() {
  const dispatch = useDispatch();
  const allFavorites = useSelector((state) => state.favorite.allFavorites);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(favoriteActions.loadCurrUserFavorites());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;
  return (
    <>
      <div className="favoritespage-container">
        {allFavorites?.length ? <h1 className="favoritespage-header">Favorite items <span>{allFavorites.length} items</span></h1> : null}
        <div className="favoritetiles">
          {allFavorites ? (
            allFavorites.map((favorite) => {
              return <FavoritesTile key={favorite.id} favorite={favorite} />;
            })
          ) : (
            <NoFavorites />
          )}
        </div>
      </div>
    </>
  );
}

export default FavoritesPage;
