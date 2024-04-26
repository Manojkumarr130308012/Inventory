const orderSchema = require('./../model/order');
const errorHandler = require('./../utils/error.handler');



class OrderController {


    async placeOrder(body, userId) {
        const newOrder = new orderSchema({
            ...body, userId: userId
        });

        try {
            await orderSchema.save();
            const orderId = newOrder._id;
            return { status: "success", msg: "Order Placed successfully", orderId: orderId };

        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }


    async getUserOrder(userId, query) {


        const userId = userId;
        const { paymentStatus, orderStatus } = query

        let query = { userId };

        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        if (orderStatus === orderStatus) {
            query.orderStatus = orderStatus;
        }

        try {

            const orders = await orderSchema.find(query).populate({
                path: 'orderItems.footId',
                select: "imageurl title rating time"
            });

            return { status: "success", orders };

        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }



}



module.exports = new OrderController();