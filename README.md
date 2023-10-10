# React & Node E-Commerce Web App
A Prototype Shopping App using react js, Express js

# Capabilities of the Application

### Home Screen and addding products to cart

The application has list of products the user can choose to select. Selecting a product the user will redirected to the product details page where the user can choose product color(#1_bug) and quantity according to choice and add to the cart. Here the user will be notified to persist data in cart the user has to sign in to the application. If the user is already signed in and a validated user the product data specific to the user along with product configuration (color, and quantity) will be stored in the cart and user will be notifed after each successfull addition. This can be done for multiple products with different configurations.

Note: For some if the stock quantity is 0 the product cannot be added to the cart as the add-to-cart button will be disabled.

### Cart Screen and Checking out

After adding all the desired items in the cart (persisted for future use/user can can log back and find same cart config for him/her) the user can choose to check out. If the total cart value is 0 the check out option is disabled. If the cart value is more than 0 the user can checkout screen where (Check Out Screen To be Impelemented) is displayed as part of the screen. (Feature not yet developed)

### Login Logout Register

New Users can Choose to register to the application the user data will be persisted, existing user can login the application and logout from the application. During usage the user-info is stored in cookie expires until 1hr. After the logout the cookie is removed for new user login/register.(#2_bug)

Note:For saving data to cart the user has to be logged in

### UI Visuals
A side bar is present to catagorize the products, functionality not yet implemented

### Bugs
- D̵e̵f̵a̵u̵l̵t̵ ̵c̵o̵l̵o̵r̵ ̵f̵r̵o̵m̵ ̵d̵r̵o̵p̵ ̵d̵o̵w̵n̵ ̵s̵e̵l̵e̵c̵t̵ ̵f̵o̵r̵ ̵p̵r̵o̵d̵u̵c̵t̵ ̵i̵s̵ ̵s̵e̵l̵e̵c̵t̵e̵d̵ ̵a̵s̵ ̵n̵u̵m̵e̵r̵i̵c̵ ̵u̵n̵l̵e̵s̵s̵ ̵a̵ ̵c̵o̵l̵o̵r̵ ̵i̵s̵ ̵s̵e̵l̵e̵c̵t̵e̵d̵ ̵b̵y̵ ̵u̵s̵e̵r̵  (solved)
- After login the user need to move to any other page to refresh dom elements to view user name on top/after log out the user needs to move to other page to refresh the dom elemts.


## Analytics data 

User specific analytics data is sent to google analytics. 
Page Views: Login,
            Register,
            Home,
            ProductDetails,
            Cart
     Events: On Adding Items to Cart,
              On Checkout Action

## FrameWorks and Runtime
React, Node

Mongo Db is used for persisting data

 
### Clone repo

```
$ git clone git@github.com:utsabc/mern-store.git
$ cd mern-store
```
 
###  Run Backend

```
$ npm install
$ npm start
```

### Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```
### Application URL
```
http://localhost:3000/

```
### Access to the analytics 

Analytics access to be shared
