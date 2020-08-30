import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post("/signin",async (req, res) => {
    const signinUser =  await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            token: getToken(signinUser)
                    })
    }else {
        res.status(401).send({msg:'Invalid Email or Password'});

    }
})

router.post("/register",async (req, res) => {
    const signinUser =  await User.findOne({
        name: req.body.name
    });
    if(signinUser) {
        res.status(500).send({msg:'User Already Present'});
    }else {
        try{
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
        
            });
            const newUser =  await user.save();
            res.send(newUser);
        }catch(error){
            res.send({msg:error.message});
        }

    }
})


export default router;