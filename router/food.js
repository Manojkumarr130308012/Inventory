const router = require('express').Router();
const foodController = require('./../controller/food');
const {verifyVendor} = require('../middleware/verifyToken')


router.post('/add',verifyVendor, async (req, res) => {
    res.send(await foodController.add(req.body));
});

router.get('/all', async (req, res) => {
    res.send(await foodController.fetch());
});


router.get('/fetchbyid', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.fetchdata(req.query.id);
	res.send(response);
})

router.get('/fetchrandom', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.fetchrandomdata(req.query.code);
	res.send(response);
})

router.get('/fetchrestaurantbyid', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.fetchRestaurantdata(req.query.restaurantId);
	res.send(response);
})

router.get('/fetchcategoryandcode', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.getFoodsByCategoryAndCode(req.query.code,req.query.category);
	res.send(response);
})

router.get('/fetchrandomcategoryandcode', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.getRandomFoodsByCategoryAndCode(req.query.code,req.query.category);
	res.send(response);
})


router.get('/foodsearch', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.getFoodsSearch(req.query.search);
	res.send(response);
})

router.get('/foodByCode', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await foodController.fetchByCode(req.query.code);
	res.send(response);
})

router.delete('/delete', async (req, res) => {
	const response = await foodController.delete(req.query.id);
	res.send(response);
})

router.put('/update', async (req, res) => {
	const response = await foodController.update(req.query.id, req.body);
	res.send(response);
})


module.exports = router;