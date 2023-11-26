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
						<i className="fas fa-bars"> <span className='catWord'> Categories</span> </i>

					</Link>
				</div>
				{!sessionUser && <div className='searchBarBig'>
					<div className='searchBar'>
						<input className='searchBarInput' placeholder='Search for anything' />
						<div className='searchIcon'>
							<Link className='magnifyingGlass'><i className="fas fa-search" /></Link>
						</div>
					</div>
				</div>
				}
				{sessionUser && <div className='searchBarSmall'>
					<div className='searchBar'>
						<input className='searchBarInput' placeholder='Search for anything' />
						<div className='searchIcon'>
							<Link className='magnifyingGlass'><i className="fas fa-search" /></Link>
						</div>
					</div>
				</div>
				}
				{sessionUser && (
					<div className='favoritesDiv'>
						<NavLink to="/favorites" className='favorites'>
							<i className="far fa-heart"></i>
						</NavLink>
					</div>
				)}
				{sessionUser && (
					<div className='bellDiv'>
						<Link className='bell'>
							<i className="far fa-bell"> <i className="fas fa-caret-down"> </i></i>

						</Link>
					</div>
				)}
				{isLoaded && (
					// <div className=''>
					<ProfileButton user={sessionUser} />
					// </div>
				)}
				<div className='shoppingCartDiv'>
					<NavLink to="/cart" className='shoppingCart'>
						<i class="fas fa-shopping-cart"></i>
					</NavLink>
				</div>
			</div>
		</>
	);
}

export default Navigation;
