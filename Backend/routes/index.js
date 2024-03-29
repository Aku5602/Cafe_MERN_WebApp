//Subpart of express components
const express = require("express");
const { Router, response } = require('express');
const { request } = require('http');
const path = require("path");
const Customer = require('../database/schemas/Customer');
const Product = require('../database/schemas/Product');
const Cart = require("../database/schemas/Cart")
const Login = require("../database/schemas/Login")
const Order = require("../database/schemas/Order")
const User = require("../database/schemas/Customer");

//index.js main module can be divided into multiple router modules which we will import in our chap2Middleware.js file
//router is similar to express
const router = Router();


router.get("/Logout", async (request, response) => {
    const LoginUser = await Login.findOne();
    const updateUser= await Login.updateOne({},{$set: {'email':null}})
    response.send(JSON.stringify({ "email": null }));
})

router.get("/currentUser", async (request, response) => {
    const LoginUser = await Login.findOne()
    response.send(JSON.stringify({ "email": LoginUser.email }));
})


router.get("/orderItems",async (request, response)=>{
    //To display on cartpage all order items
    const currentUser = await Login.findOne();
    const orderDB = await Order.find({ "email": currentUser.email })

    response.send(JSON.stringify(orderDB));
});

async function deleteOldOrder(request,response) {
    const currentUser = await Login.findOne();
    const prevOrderDB = await Order.find({ "email": currentUser.email });
    const success=await Order.deleteMany({ "email": currentUser.email });
   
    if(request.body) {
        return;
    }
   response.send("deleted");
}

router.delete("/orderItem",deleteOldOrder);

router.post("/orderItem", async (request, response) => {
    //Add to orderItems the booked order
    // response.set('Access-Control-Allow-Origin', 'https://preeminent-yeot-55f07f.netlify.app');

    const currentUser = await Login.findOne();
    if (!currentUser.email) {

        const obj = {
            "requrl": "/Login"
        };


        response.send(JSON.stringify(obj));

    }
    else {
        const userDB = await Cart.find({ "email": currentUser.email });
        const deletedPrevOrder=await deleteOldOrder(request,response);
        userDB.map(async (element)=>{
            const obj = { email: '', pid: '', image: '', name: '', category: '', price: '', quantity: '' }
            obj.email = currentUser.email;
            obj.pid = element.pid;
            obj.image = element.image;
            obj.name = element.name;
            obj.category = element.category;
            obj.price = element.price;
            obj.quantity = element.quantity;

            const newOrderItem = await Order.create(obj);

            const deleteCartItem=await Cart.deleteOne(element);
        })
          
            response.sendStatus(201);
        
    }



})


async function cartGet(request, response){
    //To display on cartpage all cart items
    const currentUser = await Login.findOne();
    const cartDB = await Cart.find({ "email": currentUser.email })

    response.send(JSON.stringify(cartDB));
}

router.get("/cartItems",cartGet);

async function myHandler(request, response) {
    //To update existing cartItem present in Cart
    const currentUser = await Login.findOne();
    const userDB = await Cart.find({ $and: [{ "name": request.body.name }, { "email": currentUser.email }] });
    const originalDB = await Product.find({ "name": request.body.name });

    if (userDB) {
        if(request.body.minus<=0) {
            await Cart.deleteOne({ "name": request.body.name, "email": currentUser.email });
        }
        else if (request.body.minus==1) {
            await Cart.updateOne({ "name": request.body.name, "email": currentUser.email }, { $set: { "price": (userDB[0].quantity - 1) * +(originalDB[0].price.slice(0, originalDB[0].price.length - 1)), "quantity": userDB[0].quantity - 1 } });
        }
        else {
            await Cart.updateOne({ "name": request.body.name, "email": currentUser.email }, { $set: { "price": (userDB[0].quantity + 1) * +(originalDB[0].price.slice(0, originalDB[0].price.length - 1)), "quantity": userDB[0].quantity + 1 } });
        }
        
        
        return JSON.stringify(cartGet(request,response));
       
    }
    else {
        response.sendStatus(400);
    }


}

router.put("/cartItem", myHandler);

router.post("/cartItem", async (request, response) => {
    //Add to cartItems else modify the cart Item
    // response.set('Access-Control-Allow-Origin', 'https://preeminent-yeot-55f07f.netlify.app');

    const currentUser = await Login.findOne();



    if (!currentUser.email) {

        const obj = {
            "requrl": "/Login"
        };


        response.send(JSON.stringify(obj));

    }
    else {
        const userDB = await Cart.find({ $and: [{ "name": request.body.name }, { "email": currentUser.email }] });

        if (userDB[0]) {
            return myHandler(request, response);
        }
        else {
            const obj = { email: '', pid: '', image: '', name: '', category: '', price: '', quantity: '' }
            obj.email = currentUser.email;
            obj.pid = request.body.pid;
            obj.image = request.body.image;
            obj.name = request.body.name;
            obj.category = request.body.category;
            obj.price = request.body.price.slice(0, request.body.price.length - 1);
            obj.quantity = 1;
            const newCartItem = await Cart.create(obj);
            response.sendStatus(201);
        }
    }



})

router.get("/productItems", async (request, response) => {
    const userDB = await Product.find({});
    response.send(JSON.stringify(userDB));
   
});

router.post("/productItems", async (request, response) => {
    //To add new products in 
    // response.set('Access-Control-Allow-Origin', 'https://preeminent-yeot-55f07f.netlify.app');
    const userDB = await Product.find({ "name": request.body.name });
    console.log(userDB);
 

    if (userDB) {

 
        const nsucceed = {
            "message": "Already Registered",
            "status": "200",
        }

        response.send(nsucceed);
    }
    else {
       
        const obj = { pid: '', image: '', name: '', category: '', price: '', description: '' };
        obj.pid = request.body.pid;
        obj.image = request.body.image;
        obj.name = request.body.name;
        obj.category = request.body.category;
        obj.price = request.body.price;
        obj.description = request.body.description;

        const newProduct = await Product.create(obj);
        newProduct.save();
        
        const succeed = {
            "message": "Successfully Added in Database",
            "status": "200",
        }

        response.send(succeed);
    }

});

router.post('/login', async (request, response) => {
    // response.set('Access-Control-Allow-Origin', 'https://preeminent-yeot-55f07f.netlify.app');
    //After registration post take details
    const obj = {}
    obj.email = request.body.email;
    obj.password = request.body.password;
    const username = obj.email;
    const password = obj.password;
    //Check if user exits  else create new user

    const userDB = await Customer.findOne({ "email": obj.email });

    if (userDB && userDB.password === obj.password) {
        const UserLogin = await Login.updateOne({}, { $set: { 'email': obj.email } });
        const change=await Login.findOne();
        //Navigate to Homepage

        const obj1 = {
            "requrl": "/Login"
        };


        response.send(JSON.stringify(obj1));
    }
    else {

        // const newUser = await Customer.create({ username, password, email });
        // newUser.save();
        const nsucceed = {
            "message": "Invalid Credentials",
            "status": "200",
        }

        response.send(nsucceed);
    }

});

router.post('/register', async (request, response) => {
    // response.set('Access-Control-Allow-Origin', 'https://preeminent-yeot-55f07f.netlify.app');
    //After registration post take details
    const obj = { name: '', email: '', password: '', phone: '', address: '' };
    obj.name = request.body.name;
    obj.email = request.body.email;
    obj.password = request.body.password;
    obj.phone = request.body.phone;
    obj.address = request.body.address;
    //Check if user exits  else create new user
    const userDB = await Customer.findOne({ "email": obj.email });
    if (userDB) {
        const nsucceed = {
            "message": "Already Registered",
            "status": "200",
        }
  
        // response.redirect("")
        response.send(nsucceed);
    }
    else {

        const newUser = await Customer.create(obj);
        newUser.save();

        const UserLogin = await Login.updateOne({}, { $set: { 'email': obj.email } });


        const succeed = { 
            "requrl":"/Login",
            "message": "Successfully Added in Database",
            "status": "200",
        }

        response.send(succeed);
    }

});

module.exports = router;