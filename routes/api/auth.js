const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', auth, async (req,res) => {
    try{
        // we don't want the password so removed it
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
    .exists()
], 
    async (req,res) => {
    // checking if the user exists
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try{
    let user = await User.findOne({ email });

    if(!user){
       return res.status(400).json({ errors: [{ msg: 'Invalid credentials'}]});
    }
     
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({errors: [{ msg: 'Invalid Credentials'}]});
    }

    const payload = {
        user: {
            id: user.id,

        }
    }

    jwt.sign(payload, config.get('jwtSecret'),
    {
        expiresIn: 360000
    },(err, token) => {
        if(err) throw err;
        res.json({ token });
    });
} catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;