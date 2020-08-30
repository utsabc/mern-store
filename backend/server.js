import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config  from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes';
import productRoutes from './routes/productRoutes'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(error => console.log(error.reason));
mongoose.connection.on('connected',()=>{
    console.log("Mongo connected");
})
const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute); 
app.use("/api/saveCart",productRoutes);
app.get("/api/products/:id", (req,res)=>{
    const productId = req.params.id;
    const product = data.products.find(x =>x._id === productId);
    if(product)
        res.send(product)
    else
        res.status(404).send({msg: "Product Not Found."});
})

app.get("/api/products", (req,res)=>{
    res.send(data.products);
})

app.listen(5000,()=> {console.log("Server Started at http://localhost:5000")})