const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const { cloudinary } = require('../config/cloudinary');
const { loginValidator, registerValidator } = require("../validators/validators");

const router = express.Router();

router.post('/login', (req, res) => {
    const { errors, isValid } = loginValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        Users.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                res.json({ message: 'Email does not exist', success: false });
            } else {
                bcrypt.compare(req.body.password, user.password).then(success => {
                    if (!success) {
                        res.json({ message: 'Invalid password', success: false });
                    } else {
                        const payload = {
                            id: user._id,
                            name: user.firstName
                        }
                        jwt.sign(
                            payload,
                            process.env.APP_SECRET, { expiresIn: 2155926 },
                            (err, token) => {
                                res.json({
                                    user,
                                    token: 'Bearer token: ' + token,
                                    success: true
                                })
                            }
                        )
                    }
                })
            }
        })
    }
})

router.post('/register', (req, res) => {
    const { errors, isValid } = registerValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        const { firstName, lastName, email, password } = req.body;
        const registerUser = new Users({
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date()
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(registerUser.password, salt, (hashErr, hash) => {
                if (err || hashErr) {
                    res.json({ message: 'Error occured hasing', success: false });
                    return;
                }
                registerUser.password = hash;
                registerUser.save().then(() => {
                    res.json({ "message": "User created successfully", "success": true });
                }).catch(er => res.json({ message: er.message, success: false }));
            })
        })
    }
})

//recuperer un user = retrieve : should be a get request because we have to send the token to the client to verify that he is authentificated in each service

router.get('/:id', checkAuth, (req, res) => {
    Users.findOne({ _id: req.params.id }).then(user => {
        res.json({ user, success: true })
    }).catch(er => {
        res.json({ success: false, message: er.message });
    })
})
//nafsha juste kada nmodifi 
//check auth worked donc noooo
/*router.post('/set-inactive', (req, res) => {
    Users.findOne({ _id: req.body.userId }).then(user => {
        user.socketId = '';
        user.active = false;
    })
})*/

router.post('/upload-image', checkAuth, async(req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr);
        Users.findOne({ _id: req.body._id }).then(user => {
            user.avatar = { url: uploadedResponse.url, publicId: uploadedResponse.public_id };
            user.save();
            if (user.images) {
                user.images.push({ url: uploadedResponse.url, publicId: uploadedResponse.public_id });
            } else {
                user.images = [];
                user.images.push({ url: uploadedResponse.url, publicId: uploadedResponse.public_id })
            }
            res.json({ success: true });
        })
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Something went wrong, try again.' })
    }
})


router.post('/remove-image', (req, res) => {
    let { userId, publicId, url } = req.body;
    Users.findOne({ _id: userId }).then(user => {
        let newImages = user.images.filter(image => image.publicId !== publicId);
        console.log(user.avatar, user.chatBg, publicId);
        if (user.avatar.publicId === publicId) {
            user.avatar = '';
        }
    
        console.log(user);
        user.images = newImages;
        user.save().then(() => {
            res.json({ success: true, message: 'Image successfully removed' });
        }).catch(() => {
            res.json({ success: true, message: 'Something went wrong removing image' });
        })
    }).catch(() => {
        res.json({ success: true, message: 'Something went wrong removing image' });
    })
})

router.post('/set-avatar', (req, res) => {
    let { userId, publicId, url, type } = req.body;
    Users.findOne({ _id: userId }).then(user => {
        user[type] = {
            url,
            publicId
        }
        user.save().then(() => {
            res.json({ success: true, message: `User ${type === 'chatBg' ? 'Chat background' : 'Avatar'} updated` });
        }).catch(() => {
            res.json({ success: false, message: 'Something went wrong updating the user' });
        })
    }).catch(() => {
        res.json({ success: false, message: 'Something went wrong updating the user' });
    })
})


module.exports = router;