const Rent = require("../models/rentModel");

exports.createRent = async (req, res) => {
    try{
        const { tenantId, month, rentAmount, paid } = req.body;
        if(!tenantId || !month || !rentAmount || !paid ){
            return res.status(400).json({ status: "N", error: "All fields are required" });
        }
        const newRent = new Rent({
            tenantId,
            month,
            rentAmount,
            paid,

        

        });
        await newRent.save();
        return res.status(201).json({ status: "Y", message: "Rent created Successfully."});
    }catch(error) {
        console.log(error);
        return res.status(500).json({ status: "N", error: `Internal Server: ${error}`});
    }
};

exports.getRents = async (req, res) => {
    try{
        const rents = await  Rent.find();
        if (!rents || rents.length === 0) {
            return res.status(400).json({ status: "Y", message: "No data found" });
        }
        return res.status(200).json({ status: "Y", message: "Success", data:rents});
        
    }catch (error){
        console.log(error);
        return res.status(500).json({ status: "N", error:`Internal server Error: ${error}`});
    }

};

exports.deleteRent = async (req, res)=> {
    let id = req.params.id;
    try{
        const rent = await Rent.findByIdAndDelete(id);
        if(!rent){
            return res.status(400).json({ status: "Y", message: "No rent found"});
        }
        return res.status(200).json({ status: "Y", message: "Rent Deleted Successfully"});
    }catch (error){
        console.log(error);
        return res.status(500).json({ status: "N", error: `Internal Server Error: ${error}`});
    }

};

exports.updateRent = async (req, res)=>{
    let id= req.params.id;
    try{
        const{ tenantId, month, rentAmount, paid } = req.body;
        if ( !tenantId || !month || !rentAmount || !paid) {
            return res.status(400).json({ status: "N", error: "All fields are required"});
        }
        const rent = await Rent.findById(id);
        if(!rent){
            return res.status(400).json({status: "Y", message:"No rent found"});
        }
        const updateRent = await Rent.findByIdAndDelete(id, {
            tenantId,
            month,
            rentAmount,
            paid,
            
        });
        if (updateRent) {
            return res.status(201).json({status: "Y", message:"Rent Updated Successfully"});
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({sttus:"N", error:`Internal Server Eroor: ${error}`});
    }
};