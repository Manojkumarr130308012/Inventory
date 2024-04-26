const router = require('express').Router();
const cartController = require('./../controller/cart');
const {verifyTokenAndAuthorization} =  require('../middleware/verifyToken');



router.post('/add',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await cartController.add(req.body,req.user.id));
});

router.get('/decrement',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await cartController.decrementProductQty(req.query.id,req.user.id));
});

router.get('/',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await cartController.getCart(req.user.id));
});
router.get('/count',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await cartController.getCartCount(req.user.id));
});
router.delete('/delete',verifyTokenAndAuthorization, async (req, res) => {
	const response = await cartController.removeCartItem(req.query.id,req.user.id);
	res.send(response);
})
router.get('/fetchlusers',verifyTokenAndAuthorization, async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await cartController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete',verifyTokenAndAuthorization, async (req, res) => {
	const response = await cartController.delete(req.query.id);
	res.send(response);
})
router.put('/update',verifyTokenAndAuthorization, async (req, res) => {
	const response = await cartController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;