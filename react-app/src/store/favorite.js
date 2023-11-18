const VIEW = "favorites/VIEW_FAVORITE";
const ADD = "favorites/ADD_FAVORITE";
const REMOVE = "favorites/REMOVE_FAVORITE";


//Actions:
const viewFavorites = (favorites) => {
    return {
        type: VIEW,
        payload: favorites
    }
};

const addFavorite = (favorite) => {
    return {
        type: ADD,
        payload: favorite
    }
};

const removeFavorite = (favoriteId) => {
    return {
        type: REMOVE,
        payload: favoriteId
    }
};


//Thunk Action Creators:
//VIEW FAVORITES
export const loadCurrUserFavorites = () => async (dispatch) => {
    try {
        const response = await fetch('/api/current-user/favorites', {
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error(`There was an error in loading your favorites list: ${response.status}`)
        }
        const favorites = await response.json();
        await dispatch(viewFavorites(favorites));
        return response;
    }
    catch(error) {
        throw new Error(`The following error occured while attempting to load your favorites list: ${error.message}`)
    }
};


//ADD TO FAVORITES
export const addToCurrUserFavorites = (favorite) => async (dispatch) => {
    try {
        const response = await fetch('/api/current-user/favorites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(favorite)
        })
        if (!response.ok) {
            throw new Error(`There was an error in adding the selected product to your favorites list: ${response.status}`)
        }
        const newFavorite = await response.json();
        await dispatch(addFavorite(newFavorite));
        await dispatch(loadCurrUserFavorites());
        return response;
    }
    catch(error) {
        throw new Error(`The following error occured while attempting to add the selected product to your favorites list: ${error.message}`)
    }
};


//REMOVE FROM FAVORITES
export const removeFromCurrUserFavorites = (favoriteId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/current-user/favorites/${+favoriteId}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`There was an error in deleting favorite #${favoriteId} from your favorites list: ${response.status}`)
        }
        await dispatch(removeFavorite(favoriteId));
        await dispatch(loadCurrUserFavorites());
        return response;
    }
    catch(error) {
        throw new Error(`The following error occured while attempting to remove favorite #${favoriteId} to your favorites list: ${error.message}`)
    }
};


//Reducer
const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = {};

    switch (action.type) {
        case VIEW:
            if (action.payload.Favorites) {
                action.payload.Favorites.forEach((favorite) => newState[favorite.id] = favorite)
                return newState;
            }
            else {
                newState = action.payload
                return newState;
            }
        case ADD:
            newState = {...state, [action.payload.id]: action.payload}
            return newState;
        case REMOVE:
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
};
