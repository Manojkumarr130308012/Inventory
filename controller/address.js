const addressSchema = require('./../model/address');
const userSchema = require('./../model/user');
const errorHandler = require('./../utils/error.handler');


class AddressController {


    async add(body){
		try{
            const newAddress = new addressSchema({
                 userid:body.id,
                addressLine1:body.addressLine1,
                 postalCode:body.postalCode,
                default:body.default,
                deliveryInstruction:body.deliveryInstructions,
                latitude:body.latitude,
                 longitude:body.longitude
            })


            if(body.default === true){
                await addressSchema.updateMany({userId:body.id},{default:false})
            }
		      await newAddress.save();
			return { status: "success",   msg:"Address Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}
	

    async setDefalutAddress(body){
        const addressid= body.addressid;
        const userId = body.id;

		try{

            await addressSchema.updateMany({userId:userId},{default:false});


            const updateAddress = await Address.findByIdAndUpdate(addressid,{default:true});
           
            if(updateAddress){
                await addressSchema.findByIdAndUpdate(userId,{address:addressid})
            }
			return { status: "success",   msg:"Address Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


	async setDefalutAddress(body){
        const addressid= body.addressid;
        const userId = body.id;

		try{

            await addressSchema.updateMany({userId:userId},{default:false});

            const updateAddress = await Address.findByIdAndUpdate(addressid,{default:true});
           
            if(updateAddress){
                await addressSchema.findByIdAndUpdate(userId,{address:addressid})
            }
			return { status: "success",   msg:"Address Added successfully", result: response, message: "Added Successfully" };
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


	async getDefalutAddress(id){
		try{
			let response = await addressSchema.findOne({_id:id,default:true});
			return response;	
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}


	async getAddressByUserId(id){
		try{
			let response = await addressSchema.find({userId:id});
			return response;	
		} catch(error){
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
		}
	}

	async fetchdata(id){
		try{
			let response = await addressSchema.find({_id:id});
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
			let response = await addressSchema.find();
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
			let response = await addressSchema.deleteOne({_id: id});
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
            let response = await addressSchema.update({_id: id}, body);
            return { status: "success", msg:"Address Updated successfully",result: response, message: "Updated Successfully" };

        } catch (error) {
			return {
				status: false,
				message: errorHandler.parseMongoError(error)
			};
        }

    }

	
}

       

module.exports=new AddressController();