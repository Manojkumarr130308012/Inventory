const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const config=require("./../config/config.json");
require('dotenv').config();

var mongoose = require('mongoose');


server.use(bodyParser.json());
const cors = require('cors');


server.use(cors());

//locationdata

const userRouter = require('./../router/user');
const categoryRouter = require('./../router/category');
const restaurantRouter = require('./../router/restaurant');
const foodRouter = require('./../router/food');
 
 let { protocal, host, port, name,username,password } = config.app.db;
//  let db= process.env.MONGODB_URL ||`mongodb+srv://admin:1234@hoffen.ydqkw.mongodb.net/?retryWrites=true&w=majority&appName=hoffen`;
 let db= process.env.MONGODB_URL ||`mongodb+srv://admin:1234@cluster0.tognbkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log('connected to the database',db);

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    },function(error){
        if(error)
        {
        console.log(error);
  }
        else
        {
        console.log('connected to the database',db);
        }
	});

  

server.use("/user", userRouter);
server.use("/category", categoryRouter);
server.use("/restaurant", restaurantRouter);
server.use("/food", foodRouter);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports= server;