const router = require('express').Router();
const addressController = require('../controller/address');


router.post('/add', async (req, res) => {
    res.send(await addressController.add(req.body));
});

router.get('/all', async (req, res) => {
    res.send(await addressController.fetch());
});


router.get('/fetch', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await addressController.fetchdata(req.query.id);
	res.send(response);
})

router.post('/setAddress', async (req, res) => {
    res.send(await addressController.setDefalutAddress(req.body));
});

router.get('/getAddress', async (req, res) => {
    res.send(await addressController.getDefalutAddress(req.body));
});

router.delete('/delete', async (req, res) => {
	const response = await addressController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await addressController.update(req.query.id, req.body);
	res.send(response);
})


module.exports = router;