const Tenant = require("../models/tenantModel");

// Create a new Tenant
exports.createTenant = async (req, res) => {
    try {
        const { name, roomNo, phone, monthlyRent } = req.body;
        if (!name || roomNo === undefined || !phone || monthlyRent === undefined) {
            return res.status(400).json({ status: "N", message: "All fields are required" });
        }

        const newTenant = new Tenant({
            name,
            roomNo: Number(roomNo),
            phone: Number(phone),
            monthlyRent: Number(monthlyRent)
        });

        await newTenant.save();
        return res.status(201).json({
            status: "Y",
            message: "Tenant created successfully",
            data: newTenant
        });
    } catch (error) {
        console.error("Create Tenant Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Get all Tenants
exports.getTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find().sort({ createdAt: -1 });
        return res.status(200).json({
            status: "Y",
            message: "Success",
            data: tenants
        });
    } catch (error) {
        console.error("Get Tenants Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Delete a Tenant
exports.deleteTenant = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTenant = await Tenant.findByIdAndDelete(id);
        if (!deletedTenant) {
            return res.status(404).json({ status: "N", message: "Tenant not found" });
        }
        return res.status(200).json({ status: "Y", message: "Tenant deleted successfully" });
    } catch (error) {
        console.error("Delete Tenant Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Update a Tenant
exports.updateTenant = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, roomNo, phone, monthlyRent } = req.body;
        if (!name || roomNo === undefined || !phone || monthlyRent === undefined) {
            return res.status(400).json({ status: "N", message: "All fields are required" });
        }

        const updatedTenant = await Tenant.findByIdAndUpdate(
            id,
            {
                name,
                roomNo: Number(roomNo),
                phone: Number(phone),
                monthlyRent: Number(monthlyRent)
            },
            { new: true }
        );

        if (!updatedTenant) {
            return res.status(404).json({ status: "N", message: "Tenant not found" });
        }

        return res.status(200).json({
            status: "Y",
            message: "Tenant updated successfully",
            data: updatedTenant
        });
    } catch (error) {
        console.error("Update Tenant Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};