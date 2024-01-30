# Welcome to Craftsy!!!

## About The Project
_Craftsy_ is an [_Etsy_](https://www.etsy.com/) clone, an app designed to connect consumers with sellers of handcrafted and vintage goods. 


## The Team
* [Tamara Mousa](https://github.com/T3mousa)
* [Ian Kim](https://github.com/iankimm)
* [Krystal Kimmel](https://github.com/kryskimmel)
* [Daniel Calderon](https://github.com/Calderon1199)
* [Will Torres](https://github.com/wtorresjr)


## Technologies Used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


## Screenshots
### Sign up
![Sign up page](readme-images/signup.png)
### Homepage
![Homepage](readme-images/homepage-1.png)
### Search
![Search](readme-images/search.png)
### Product detail
![Product detail page](readme-images/product-detail.png)
### Favorites
![Favorites page](readme-images/favorites.png)
### Cart
![Cart page](readme-images/cart.png)


## Getting Started
### I. Clone the repository:
`git clone https://github.com/wtorresjr/Craftsy-Etsy-Clone.git`
### II. Install the dependencies (in root directory):
`pipenv install -r requirements.txt`
### III. Set up your environmental variables:
1. Run: `echo > ".env"`
2. Open the _.env.example_ file and copy its contents into your newly created _.env_ file
3.  Replace placeholder values with actual values for S3-related keys (See [Setting Up AWS](#aws-section) section)

### IV. Run the following commands:
1. To enter your virtual environment: `pipenv shell`
2. To migrate your database: `flask db upgrade`
3. To seed your database: `flask seed all`
4. To run your application: `flask run`


## Helpful Commands
<table>
  <thead>
    <tr>
      <th scope="col">Command</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
    <tbody>
    <tr>
      <th scope="row">pipenv shell</th>
      <td>[insert description here]</td>
    </tr>
    <tr>
      <th scope="row">pipenv run</th>
      <td>[insert description here]</td>
    </tr>
    <tr>
      <th scope="row">flask db upgrade</th>
      <td>[insert description here]</td>
    </tr>
    <tr>
      <th scope="row">flask db downgrade</th>
      <td>[insert description here]</td>
    </tr>
    <tr>
      <th scope="row">flask seed all</th>
      <td>[insert description here]</td>
    </tr>
    <tr>
      <th scope="row">flask db upgrade</th>
      <td>[insert description here]</td>
    </tr>
  </tbody>
</table>


<h2 id="aws-section">Setting Up AWS</h2>
[... add information here]



## Features
### New account creation Log in, log out, and guest/demo login:
- Users can sign up, log in, and log out.
- Users can use a demo log in to try the site.
- Users can't use certain features without logging in (like Creating Products, leaving reviews, etc.)
- Users who log in while browsing a product will be redirected to the home page.
- Logged out users are redirected to home page.

## Products
### All Users:
- Should be able to view all Products.

### Authenticated & Authorized Users:
- Should be able to create a Product.
- Should be able to update their Product(s).
- Should be able to delete their Product(s).

## Reviews
### All Users:
- Should be able to view all reviews on a Product.

### Authenticated & Authorized Users:
- Should be able to create a review for a Product.
- Should be able to update their review for a Product.
- Should be able to delete their review from a Product.

## Shopping Cart
### All Users:
- Should be able to view all products added to their cart.
- Should be able to add products to their shopping cart.
- Should be able to remove products from their shopping cart.

### Authenticated Users:
- Should be able to preform a "transaction" to complete their purchase.

## Favorites
### Authenticated & Authorized Users:
- Should be able to view all of their favorite products.
- Should be able to favorite products.
- Should be able to delete products from their favorites.





#### Acknowledgments
- Inspired by Etsy
- Icons by Font Awesome
