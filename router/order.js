const router = require('express').Router();
const orderController = require('./../controller/order');
const {verifyTokenAndAuthorization} =  require('../middleware/verifyToken');


router.post('/placeOrder',verifyTokenAndAuthorization, async (req, res) => {
    res.send(await orderController.placeOrder(req.body,req.user.id));
});

router.get('/getuserorder',verifyTokenAndAuthorization,  async (req, res) => {
    res.send(await orderController.getUserOrder(req.user.id,req.query));
});



module.exports = router;