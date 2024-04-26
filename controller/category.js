const categorySchema = require('./../model/category');
const errorHandler = require('./../utils/error.handler');



class CategoryController {


    async add(body){
		try{
			let response = await categorySchema.create(body);
			return { status: "success",   msg:"Category Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	

	async fetchdata(id){
		try{
			let response = await categorySchema.find({_id:id});
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
			let response = await categorySchema.find({title:{$ne:"More"}},{_v:0});
			let count=Object.keys(response).length;
			return response;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

    async fetchrandom(){
		try{
          let category = await categorySchema.aggregate([
                  {$match:{value:{$ne:"more"}}},
                     {$sample:{size:4}}
                 ])

           const moreCategory = await categorySchema.findOne({value:"more"},{_v:0})

           if(moreCategory){
             category.push(moreCategory)
           }
			let count=Object.keys(category).length;
			return category;
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


    async delete(id){
		try{
			let response = await categorySchema.deleteOne({_id: id});
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
            let response = await categorySchema.update({_id: id}, body);
            return { status: "success", msg:"Category Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }
    }

}

       

module.exports=new CategoryController();