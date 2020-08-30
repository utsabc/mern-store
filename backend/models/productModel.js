import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    unique_id: {type:String, required:true,unique:true},
    email: {type: String, required:true},
    productid: {type: String, required:true},
    count: {type: String, required:true},
    color: {type:String, required:true, default:"Red"}

});

const productModel = mongoose.model("UserProductData", productSchema);

export default productModel;