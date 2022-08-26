const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');


// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/register', async (req, res) => {
        console.log(req.body);
      const { name, email, password, role } = req.body;
  
      try {
        let user = await User.find({email});

        console.log(user);
        var flag = 0;
        for(let i=0;i<user.length;i++){
            if(role===user[i].role)
            flag = 1;
        }
        if (flag) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        user = new User({
          name,
          email,
          password,
          role
        });
        console.log('CheckPoint1');
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
          user: {
            id: user.id
          }
        };
        
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
            id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
    }
}
);




  
  module.exports = router;