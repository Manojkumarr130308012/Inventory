const router = require('express').Router();
const categoryController = require('./../controller/category');
const {verifyTokenAndAuthorization} =  require('../middleware/verifyToken');


router.post('/add',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await categoryController.add(req.body));
});

router.get('/all', async (req, res) => {
    res.send(await categoryController.fetch());
});

router.get('/random', async (req, res) => {
    res.send(await categoryController.fetchrandom());
});

router.get('/fetchcategory',verifyTokenAndAuthorization, async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await categoryController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete',verifyTokenAndAuthorization, async (req, res) => {
	const response = await categoryController.delete(req.query.id);
	res.send(response);
})
router.put('/update',verifyTokenAndAuthorization, async (req, res) => {
	const response = await categoryController.update(req.query.id, req.body);
	res.send(response);
})


module.exports = router;