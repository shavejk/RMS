const Electricity = require("../models/electricityModel");

exports.createElectricity = async (req, res) => {
    try{
        const { tenantId, month, previousReading, currentReading, unitRate, totalBill,  } = req.body;
        if(!tenantId || !month || !previousReading || !currentReading || !unitRate || !totalBill ){
            return res.status(400).json({ status: "N", error: "All fields are required" });
        }
        const newElectricity = new Electricity({
            tenantId,
            month,
            previousReading,
            currentReading,
            unitRate,
            totalBill,

        

        });
        await newElectricity.save();
        return res.status(201).json({ status: "Y", message: "Elect created Successfully."});
    }catch(error) {
        console.log(error);
        return res.status(500).json({ status: "N", error: `Internal Server: ${error}`});
    }
};

exports.getElectricitys = async (req, res) => {
    try{
        const electricitys = await  Electricity.find();
        if (!electricitys || electricitys.length === 0) {
            return res.status(400).json({ status: "Y", message: "No data found" });
        }
        return res.status(200).json({ status: "Y", message: "Success", data:electricitys});
        
    }catch (error){
        console.log(error);
        return res.status(500).json({ status: "N", error:`Internal server Error: ${error}`});
    }

};

exports.deleteElectricity = async (req, res)=> {
    let id = req.params.id;
    try{
        const electricity = await Electricity.findByIdAndDelete(id);
        if(!electricity){
            return res.status(400).json({ status: "Y", message: "No elect data found"});
        }
        return res.status(200).json({ status: "Y", message: "Electricity data Deleted Successfully"});
    }catch (error){
        console.log(error);
        return res.status(500).json({ status: "N", error: `Internal Server Error: ${error}`});
    }

};

exports.updateElectricity = async (req, res)=>{
    let id= req.params.id;
    try{
        const{ tenantId, month, previousReading, currentReading, unitRate, totalBill,} = req.body;
        if ( !tenantId ||!month ||!previousReading || !currentReading || !unitRate || !totalBill) {
            return res.status(400).json({ status: "N", error: "All fields are required"});
        }
        const electricity = await Electricity.findById(id);
        if(!electricity){
            return res.status(400).json({status: "Y", message:"No elect data found"});
        }
        const updateElecticity = await Electricity.findByIdAndDelete(id, {
            tenantId,
            month,
            previousReading,
            currentReading,
            unitRate,
            totalBill,
            
        });
        if (updateElectricity) {
            return res.status(201).json({status: "Y", message:"Electricity Updated Successfully"});
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({sttus:"N", error:`Internal Server Eroor: ${error}`});
    }
};