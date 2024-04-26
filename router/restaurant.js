const router = require('express').Router();
const restaurantController = require('./../controller/restaurant');
const {verifyTokenAndAuthorization} =  require('../middleware/verifyToken');


router.post('/add',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await restaurantController.add(req.body));
});

router.get('/all', async (req, res) => {
    res.send(await restaurantController.fetch());
});

router.get('/fetchbyid', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await restaurantController.fetchdata(req.query.id);
	res.send(response);
});

router.get('/fetchrandom', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await restaurantController.fetchrandomdata(req.query.code);
	res.send(response);
});

router.get('/fetchallnearby', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await restaurantController.fetchallnearby(req.query.code);
	res.send(response);
});

router.delete('/delete', async (req, res) => {
	const response = await restaurantController.delete(req.query.id);
	res.send(response);
});

router.put('/update', async (req, res) => {
	const response = await restaurantController.update(req.query.id, req.body);
	res.send(response);
});


module.exports = router;