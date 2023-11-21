import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div className='navBar'>
				<div className="homeButtonDiv">
					<NavLink exact to="/" className="homeButton">Craftsy</NavLink>
				</div>
				<div className='categoriesDiv'>
					<Link className='categories'>
						<i className="fas fa-bars"> </i>
						<span> Categories</span>
					</Link>
				</div>
				<div className='searchBarDiv'>
					<div className='searchBar'>
						<input className='searchBarInput' placeholder='Search for anything' />
						<i className="fas fa-search" />
					</div>
				</div>
				{isLoaded && (
					<div className="signInDiv">
						<ProfileButton user={sessionUser} />
					</div>
				)}
				<div className='shoppingCartDiv'>
					<NavLink to="/shoppingcart" className='shoppingCart'>
						<i class="fas fa-shopping-cart"></i>
					</NavLink>
				</div>
			</div>
		</>
	);
}

export default Navigation;
