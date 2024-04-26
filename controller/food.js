const food = require('./../model/food');
const foodSchema = require('./../model/food');
const errorHandler = require('./../utils/error.handler');



class FoodController {


    async add(body){

        const{title,foodTags,category,code,restaurant,description,time,price,additives,imageUrl} = body;

        if(!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additives || !imageUrl){
            return {status:"false",message:"You Have a Missing Field"};
        }
		try{
            const newfood= new food(body);
			let response = await newfood.save();
			return { status: "success",   msg:"Food Added successfully", result: response };
		} catch(error){
            console.log(error)
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	

	async fetchdata(id){
		try{
			let response = await foodSchema.find({_id:id});
			return response;	
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


    async fetchRestaurantdata(id){
		try{
			let response = await foodSchema.find({restaurant:id});
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
            let randomFood = [];

            if(code){
                randomFood = await foodSchema.aggregate([
                    {$match:{code:code,isAvailable:true}},
                    {$sample:{size:5}},
                    {$project:{_v:0}}
                ])
               }

               if(randomFood.length == 0){
                  randomFood =await  foodSchema.aggregate([
                    {$match:{isAvailable:true}},
                    {$sample:{size:5}},
                    {$project:{_v:0}}
                ])
               }
               return randomFood;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


    async getFoodsSearch(search){
    
		try{
            const result = await foodSchema.aggregate([
                {
                    $search:{
                        index:"foods",
                        text:{
                            query:search,
                            path:{
                                wildcard:"*"
                            }
                        }
                    }
                }
            ])

            return result;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


    async getFoodsByCategoryAndCode(code,category){
       
		try{
        const foods = await foodSchema.aggregate([
                    {$match:{code:code,category:category,isAvailable:true}},
                    {$project:{_v:0}}
                ])
            
               return foods;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


    async getRandomFoodsByCategoryAndCode(code,category){
       
		try{

            let foods;

              foods = await foodSchema.aggregate([
                    {$match:{code:code,category:category,isAvailable:true}},
                    {$sample:{size:10}},
                    {$project:{_v:0}}
                ])

                if(!foods || foods.length === 0){
                    foods = await foodSchema.aggregate([
                        {$match:{code:code,isAvailable:true}},
                        {$sample:{size:10}}
                    ])
                }else if(!foods || foods.length === 0){
                    foods = await foodSchema.aggregate([
                        {$match:{isAvailable:true}},
                        {$sample:{size:10}}
                    ])
                }
            
               return foods;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}



	async fetch(){
		try{
			let response = await foodSchema.find();
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


	async fetchByCode(code){
		try{
			let response = await foodSchema.find({code:code});
			let count=Object.keys(response).length;
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
			let response = await foodSchema.deleteOne({_id: id});
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
            let response = await foodSchema.update({_id: id}, body);
            return { status: "success", msg:"Category Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }

    }

	
}

       

module.exports=new FoodController();