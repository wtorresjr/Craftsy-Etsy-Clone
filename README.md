# Welcome to Craftsy!!!

## Navigation
- [About the project](#about-section)
- [The Team](#team-section)
- [Technologies Used](#technologies-used-section)
- [Database Schema](https://github.com/wtorresjr/Craftsy-Etsy-Clone/wiki/Database-Schema)
- [Routes](https://github.com/wtorresjr/Craftsy-Etsy-Clone/wiki/Frontend-Routes)
- [Screenshots](#screenshots-section)
- [Getting Started](#getting-started-section)
- [Helpful Commands](#helpful-commands-section)
- [AWS S3 Setup Instructions](https://github.com/wtorresjr/Craftsy-Etsy-Clone/wiki/AWS-S3-Setup-Instructions)
- [User Stories](https://github.com/wtorresjr/Craftsy-Etsy-Clone/wiki/User-Stories)
- [Features](#features-section)
- [Acknowledgments](#acknowledgments-section)


<h2 id="about-section">About The Project</h2>

_Craftsy_ is an [_Etsy_](https://www.etsy.com/) clone, an app designed to connect consumers with sellers of handcrafted and vintage goods. 


<h2 id="team-section">The Team</h2>

* [Tamara Mousa](https://github.com/T3mousa)
* [Ian Kim](https://github.com/iankimm)
* [Krystal Kimmel](https://github.com/kryskimmel)
* [Daniel Calderon](https://github.com/Calderon1199)
* [Will Torres](https://github.com/wtorresjr)


<h2 id="technologies-used-section">Technologies Used</h2>

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


<h2 id="screenshots-section">Screenshots</h2>

### Sign up

<img width="1715" alt="sign-up" src="https://github.com/wtorresjr/Craftsy-Etsy-Clone/assets/121524927/92bbdec6-267c-4f91-bc8f-182424464696">

### Homepage

<img width="1715" alt="homepage" src="https://github.com/wtorresjr/Craftsy-Etsy-Clone/assets/121524927/bc99b60f-6939-4bf7-b4ee-033af1ab1321">


### Search

<img width="1715" alt="search" src="https://github.com/wtorresjr/Craftsy-Etsy-Clone/assets/121524927/d98e6843-4ef1-4e01-a8d5-1c950238747f">


### Product detail

<img width="1715" alt="product-detail" src="https://github.com/wtorresjr/Craftsy-Etsy-Clone/assets/121524927/531e973d-7acc-42af-9032-30fc820b30d9">


### Favorites

<img width="1715" alt="favorites" src="https://github.com/wtorresjr/Craftsy-Etsy-Clone/assets/121524927/e4813561-e9a0-4af9-b2a1-657bd948369b">

### Cart

<img width="1715" alt="cart" src="https://github.com/wtorresjr/Craftsy-Etsy-Clone/assets/121524927/e88dacb1-c1a7-4dfc-8aa7-d572fe3985aa">


<h2 id="getting-started-section">Getting Started</h2>

### I. Clone the repository:
`git clone https://github.com/wtorresjr/Craftsy-Etsy-Clone.git`
### II. Install the dependencies (in root directory):
`pipenv install -r requirements.txt`
### III. Set up your environmental variables:
1. Run: `echo > ".env"`
2. Open the _.env.example_ file and copy its contents into your newly created _.env_ file
3.  Replace placeholder values with actual values for S3-related keys (See the [AWS S3 Setup Instructions](#https://github.com/wtorresjr/Craftsy-Etsy-Clone/wiki/AWS-S3-Setup-Instructions) page)

### IV. Run the following commands:
#### To run the backend server of application:
1. Enter your virtual environment: `pipenv shell`
2. Migrate your database: `flask db upgrade`
3. Seed your database: `flask seed all`
4. Run your server: `flask run`

#### To run the frontend of application:
5. In another terminal, change directory into _react-app_: `cd react-app`
6. Install node modules: `npm install`
7. Run your application: `npm start`


<h2 id="helpful-commands-section">Helpful Commands</h2>
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
      <td>Automatically activates a virtual environment specifically for your project, keeping any dependencies installed isolated.
      <br>
      <br>
      Run <b>deactivate</b> to exit the virtual environment and return to your shell environment.
      </td>
    </tr>
    <tr>
      <th scope="row">pipenv run</th>
      <td>Can activate a virtual environment and run commands like the <b>pipenv shell</b> command; however flask commands must be prepended with this command (e.g., <i>pipenv run flask db upgrade</i> and <i>pipenv run flask run</i>).
      </td>
    </tr>
    <tr>
      <th scope="row">flask run</th>
      <td>When prepended with <b>pipenv run</b>, it activates a virtual environment for your project.
      <br>
      <br>
      Press <b>CTRL + C</b> to exit the virtual envrionment and return to your shell environment.
      </td>
    </tr>
    <tr>
      <th scope="row">flask db upgrade</th>
      <td>Syncs the database schema.</td>
    </tr>
    <tr>
      <th scope="row">flask db downgrade</th>
      <td>Reverts the database schema to the previous state. This is run, followed by <b>flask db upgrade</b> to update the application with any schema changes.</td>
    </tr>
    <tr>
      <th scope="row">flask seed all</th>
      <td>Populates the database with seed file data.</td>
    </tr>
  </tbody>
</table>


<h2 id="features-section">Features</h2>

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


<h4 id="acknowledgments-section">Acknowledgments</h4>

- Inspired by [_Etsy_](https://www.etsy.com/)
- Icons by [_Font Awesome_](https://fontawesome.com/icons)
