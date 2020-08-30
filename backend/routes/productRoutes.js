import express from 'express';
import Product from '../models/productModel';
import {_encode, _decode} from 'node-encoder';

const router = express.Router();

router.post("/save", async(req, res) => {

try{
    const encyid = _encode(req.body.email+req.body.productId+req.body.qty+req.body.color);
    const product = new Product({
        unique_id: encyid,
        email: req.body.email,
        productid: req.body.productId,
        count: req.body.qty,
        color: req.body.color
    });
    const result = await product.save();
    res.send(result);

}catch(error){
    res.send({msg:error.message});
}   
   
})

router.post("/update", async(req,res) =>{
    var query = { email: req.body.email,
                productid:req.body.productId };
    const encyid = _encode(req.body.email+req.body.productId+req.body.qty+req.body.color);
    const productItem =  await Product.findOneAndUpdate(query,{
        unique_id: encyid,
        email: req.body.email,
        productid: req.body.productId,
        count: req.body.qty,
        color: req.body.color
    });
    if(productItem) {
        res.send(productItem);
    }else {
        res.status(500).send({msg:'Unable to update cart'});

    }

  
})


router.post("/delete", async(req,res) =>{
    
    const productItem =  await Product.findOneAndDelete({
       email: req.body.email,
       productid: req.body.productId
      
   });
   if(productItem) {
       res.send(productItem);
   }else {
       res.status(500).send({msg:'Unable to delete from cart'});

   }

 
})
try{
    router.post("/get", async (req,res)=>{
        const cartData =  await Product.findOne({
            email: req.body.email,
            productid: req.body.productId    
        });
       
        res.send(cartData)
        
       
    })
}catch(error){
    res.status(500).send({msg:'Cart Data not found'});
}





router.get("/:email", async (req,res)=>{
    
    const cartData =  await Product.find({
        email: req.params.email

    });
    if(cartData) {
        res.send(cartData)
    }else {
        res.status(500).send({msg:'Cart Data not found'});

    }
   
})

export default router;