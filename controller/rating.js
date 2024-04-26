const rating = require('./../model/rating');
const ratingSchema = require('./../model/rating');
const restaurantSchema = require('./../model/restaurant');
const foodSchema = require('./../model/food');
const errorHandler = require('./../utils/error.handler');



class RatingController {


    async add(body){
        const newRating = new rating(
            {userId : body.id, 
            ratingType : body.ratingType,
            product : body.product,
            rating : body.rating}
        )
		try{
			let response = await newRating.save();
          
            if(body.ratingType === "Restaurant"){
               
                const restaurant = await ratingSchema.aggergate([
                    {
                        $match:{ratingType:body.ratingType,product:body.product}
                    },
                    {
                        $group:{_id:'$product'},averageRating:{$avg:'$rating'}
                    }
                ]);

                if(restaurant.length > 0){
                    const averageRating = restaurant[0].averageRating;
                    await restaurantSchema.findByIdAndUpdate(body.product,{rating:averageRating},{new :true})
                }

            }else if(body.ratingType === "Food"){
               
                const foods = await ratingSchema.aggergate([
                    {
                        $match:{ratingType:body.ratingType,product:body.product}
                    },
                    {
                        $group:{_id:'$product'},averageRating:{$avg:'$rating'}
                    }
                ]);

                if(foods.length > 0){
                    const averageRating = foods[0].averageRating;
                    await foodSchema.findByIdAndUpdate(body.product,{rating:averageRating},{new :true})
                }

            }



			return { status: "success",   msg:"Rating Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	

	async fetchdata(id){
		try{
			let response = await ratingSchema.find({_id:id});
			return response;	
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetch(){
		try{
			let response = await ratingSchema.find();
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


	async checkUserRating(ratingType,product,userId){
		try{

           const exitingRating = await ratingSchema.findOne({
                  userId:userId,product:product,ratingType:ratingType
		   });

			if(exitingRating){
				return {
					status:true,
					message:"You Have Already Rated this Year"
				}
			}else{
				return {
					status:false,
					message:"user has not rated this restaurant"
				}
			}
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}



    async delete(id){
		try{
			let response = await ratingSchema.deleteOne({_id: id});
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
            let response = await ratingSchema.update({_id: id}, body);
            return { status: "success", msg:"Category Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }

    }

	
}

       

module.exports=new RatingController();