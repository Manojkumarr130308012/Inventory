const cartSchma = require('./../model/cart');
const errorHandler = require('./../utils/error.handler');
require('dotenv').config();



class UserController {

  
    async add(body,userId){
        const userId =  userId;
        const {productId,totalPrice,quantity,additives,} = body;
        let count;
		try{
            const exitingProduct = await cartSchma.findOne({userId:userId,productId:productId});
            count = await cartSchma.countDocuments({userId:userId});
            if(exitingProduct){
                exitingProduct.totalPrice += totalPrice;
                exitingProduct.quantity += quantity;
                await exitingProduct.save();
                return { status: "success",   msg:"Cart Added successfully", count: count, message: "Added Successfully" };
            }else{
                const newCartItem = new Cart({
                    userId:userId,
                    productId:productId,
                    totalPrice:totalPrice,
                    quantity:quantity,
                    additives:additives
                })

                await newCartItem.save();
                count = await cartSchma.countDocuments({userId:userId});
                return { status: "success", count: count };
            }
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	

    async removeCartItem(id,userId){
     const cartItemId = id;
     const userId = userId;
     try {
        await cartSchma.findByIdAndDelete({_id:cartItemId});
        const count = await cartSchma.countDocuments({userId:userId});
        return { status: "success", count: count };
     } catch (error) {
        return {
            status: false,
            message: errorHandler.parseMongoError(error)
        };
     }
    }

    async getCart(userId){
        const userId = userId;
        try {
          const cart= await cartSchma.find({userId:userId}).populate({
            path:'productId',
            select:'imageUrl title restaurant rating ratingcount',
            populate:{
                path:'restaurant',
                select:'time coords'
            }
           });
           return { status: "success", cart: cart };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
       }

       async getCartCount(userId){
        const userId = userId;
        try {
          const count= await cartSchma.countDocuments({userId:userId});

           return { status: "success", count: count };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
       }

       async decrementProductQty(id,userId){
        const userId = userId;
        const id = id;
        try {
          const cartItem= await cartSchma.findById(id);

          if(cartItem){
              const productPrice = cartItem.totalPrice / cartItem.totalQuantity;

              if(cartItem.quantity > 1){
                   cartItem.quantity -= 1;
                   cartItem.totalPrice -= productPrice;
                   await cartItem.save();
                   return { status: "success", message: "Product quantity sucessfully decremented" };
              }else{
                await cartSchma.findOneAndDelete({_id:id});
                return { status: "success", message: "Product sucessfully removed from the cart" };
              }
          }else{
            return { status: "error", message: "cart item not found" };
          }

        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
       }


	async fetch(){
		try{

            
			let response = await cartSchma.find({});
			let count=Object.keys(response).length;
			return {
				response: response,
				count:count
			};
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
   

	async fetchdata(id){
		try{
			let response = await cartSchma.find({_id:id});
			return response;	
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async delete(id){
		try{
			let response = await cartSchma.deleteOne({_id: id});
			return {
				status: "success",
				response: response
			};
		} catch(error){
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async update(id, body) {

        try {
            let response = await cartSchma.update({_id: id}, body);
            return { status: "success", msg:"User Updated successfully",result: response, message: "Updated Successfully" };
        } catch (error) {
            return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }

    }

	
}

       

module.exports=new UserController();