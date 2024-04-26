const router = require('express').Router();
const userController = require('./../controller/user');
const {verifyTokenAndAuthorization} =  require('../middleware/verifyToken');



router.post('/register', async (req, res) => {
    res.send(await userController.register(req.body));
});

router.get('/verificationAccount',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await userController.verifyAccount(req.query.otp,req.user.id));
});

router.get('/verificationPhone',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await userController.verifyPhone(req.query.phone,req.user.id));
});

router.post('/login', async (req, res) => {
    res.send(await userController.login(req.body));
});

router.get('/users', async (req, res) => {
    res.send(await userController.fetch(req.body));
});
router.get('/fetchlusers',verifyTokenAndAuthorization, async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await userController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete',verifyTokenAndAuthorization, async (req, res) => {
	const response = await userController.delete(req.query.id);
	res.send(response);
})
router.put('/update',verifyTokenAndAuthorization, async (req, res) => {
	const response = await userController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;