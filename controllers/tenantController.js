const Tenant = require("../models/tenantModel");

exports.createTenant = async (req, res) => {
    try{
        const { name, roomNo, phone, monthlyRent } = req.body;
        if(!name || !roomNo || !phone || !monthlyRent ){
            return res.status(400).json({ status: "N", error: "All fields are required" });
        }
        const newTenant = new Tenant({
            name,
            roomNo,
            phone,
            monthlyRent,

        

        });
        await newTenant.save();
        return res.status(201).json({ status: "Y", message: "Tenant created Successfully."});
    }catch(error) {
        console.log(error);
        return res.status(500).json({ status: "N", error: `Internal Server: ${error}`});
    }
};

exports.getTenants = async (req, res) => {
    try{
        const tenants = await  Tenant.find();
        if (!tenants || tenants.length === 0) {
            return res.status(400).json({ status: "Y", message: "No data found" });
        }
        return res.status(200).json({ status: "Y", message: "Success", data:tenants});
        
    }catch (error){
        console.log(error);
        return res.status(500).json({ status: "N", error:`Internal server Error: ${error}`});
    }

};

exports.deleteTenant = async (req, res)=> {
    let id = req.params.id;
    try{
        const tenant = await Tenant.findByIdAndDelete(id);
        if(!tenant){
            return res.status(400).json({ status: "Y", message: "No tenant found"});
        }
        return res.status(200).json({ status: "Y", message: "Tenant Deleted Successfully"});
    }catch (error){
        console.log(error);
        return res.status(500).json({ status: "N", error: `Internal Server Error: ${error}`});
    }

};

exports.updateTenant = async (req, res)=>{
    let id= req.params.id;
    try{
        const{ name, roomNo, phone, monthlyRent } = req.body;
        if ( !name || !roomNo || !phone || !monthlyRent) {
            return res.status(400).json({ status: "N", error: "All fields are required"});
        }
        const tenant = await Tenant.findById(id);
        if(!tenant){
            return res.status(400).json({status: "Y", message:"No tenant found"});
        }
        const updateTenant = await Tenant.findByIdAndDelete(id, {
            name,
            roomNo,
            phone,
            monthlyRent,
            
        });
        if (updateTenant) {
            return res.status(201).json({status: "Y", message:"Tenant Updated Successfully"});
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({sttus:"N", error:`Internal Server Eroor: ${error}`});
    }
};