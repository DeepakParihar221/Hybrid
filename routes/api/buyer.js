const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');


// @route    GET api/users
// @desc     Register user
// @access   Public
router.get('/list-of-sellers', auth, async (req, res) => {

    try {
      const user = await User.find({role: "seller"});
      console.log(user);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;