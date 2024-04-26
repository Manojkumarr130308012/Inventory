const restaurant = require('./../model/restaurant');
const restaurantSchema = require('./../model/restaurant');
const errorHandler = require('./../utils/error.handler');



class RestaurantController {


    async add(body){
        const{title,time,imageUrl,owner,code,logoUrl,coords} = body;

        if(!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords){
            return {status:false,message:"You Have a Missing Field"};
        }
		try{
            const newRestaurant= new restaurant(body);
			let response = await newRestaurant.save();
			return { status: "success",   msg:"Category Added successfully", result: response };
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	

	async fetchdata(id){
		try{
			let response = await restaurantSchema.find({_id:id});
			return response;	
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}



    async fetchrandomdata(codes){
        const code = codes;
		try{
            let randomRestaurant = [];

            if(code){
                randomRestaurant = await restaurantSchema.aggregate([
                    {$match:{code:code,isAvailable:true}},
                    {$sample:{size:5}},
                    {$project:{_v:0}}
                ])
               }

               if(randomRestaurant.length == 0){
                randomRestaurant =await  restaurantSchema.aggregate([
                    {$match:{isAvailable:true}},
                    {$sample:{size:5}},
                    {$project:{_v:0}}
                ])
               }
               console.log(randomRestaurant)
               return randomRestaurant;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

    async fetchallnearby(codes){
        const code = codes;
		try{
            let allNearByRestaurant = [];

            if(code){
                allNearByRestaurant =await restaurantSchema.aggregate([
                    {$match:{code:code, isAvailable:true}},
                    {$project:{_v:0}}
                ])
               }


               if(allNearByRestaurant.length == 0){
                allNearByRestaurant = await restaurantSchema.aggregate([
                    {$match:{ isAvailable:true}},
                    {$project:{_v:0}}
                ])
               }

			return allNearByRestaurant;	
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


	async fetch(){
		try{
			let response = await restaurantSchema.find();
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


    async delete(id){
		try{
			let response = await restaurantSchema.deleteOne({_id: id});
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
            let response = await restaurantSchema.update({_id: id}, body);
            return { status: "success", msg:"Category Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }

    }

	
}

       

module.exports=new RestaurantController();