const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const confid = require('config');

//Route for creating auth.
router.post('/', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            res.status(400).json({errors: [{
                msg: 'User already exists'
            }]})
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),
        {
            expiresIn: 36000 
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});