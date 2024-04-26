const router = require('express').Router();
const ratingController = require('./../controller/rating');
const {verifyTokenAndAuthorization} =  require('../middleware/verifyToken');


router.post('/add',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await ratingController.add(req.body));
});

router.get('/all',verifyTokenAndAuthorization,  async (req, res) => {
    res.send(await ratingController.fetch());
});

router.get('/checkUserRating',verifyTokenAndAuthorization,  async (req, res) => {
    res.send(await ratingController.checkUserRating(req.query.ratingType,req.query.product,req.query.id));
});


router.get('/fetchlrating',verifyTokenAndAuthorization,  async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ratingController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete',verifyTokenAndAuthorization,  async (req, res) => {
	const response = await ratingController.delete(req.query.id);
	res.send(response);
})
router.put('/update',verifyTokenAndAuthorization,  async (req, res) => {
	const response = await ratingController.update(req.query.id, req.body);
	res.send(response);
})


module.exports = router;