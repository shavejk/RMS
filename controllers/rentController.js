const Rent = require("../models/rentModel");

// Create Rent Record
exports.createRent = async (req, res) => {
    try {
        const { tenantId, month, rentAmount, paid } = req.body;

        // Note: paid can be false, so check rentAmount for undefined
        if (!tenantId || !month || rentAmount === undefined) {
            return res.status(400).json({ status: "N", message: "tenantId, month and rentAmount are required" });
        }

        const newRent = new Rent({
            tenantId,
            month,
            rentAmount: Number(rentAmount),
            paid: paid !== undefined ? Boolean(paid) : false
        });

        await newRent.save();
        await newRent.populate("tenantId", "name roomNo phone");

        return res.status(201).json({
            status: "Y",
            message: "Rent record created successfully",
            data: newRent
        });
    } catch (error) {
        console.error("Create Rent Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Get All Rent Records
exports.getRents = async (req, res) => {
    try {
        const rents = await Rent.find()
            .populate("tenantId", "name roomNo phone")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "Y",
            message: "Success",
            data: rents
        });
    } catch (error) {
        console.error("Get Rents Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Delete Rent Record
exports.deleteRent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRent = await Rent.findByIdAndDelete(id);
        if (!deletedRent) {
            return res.status(404).json({ status: "N", message: "Rent record not found" });
        }
        return res.status(200).json({ status: "Y", message: "Rent record deleted successfully" });
    } catch (error) {
        console.error("Delete Rent Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Update Rent Record
exports.updateRent = async (req, res) => {
    const { id } = req.params;
    try {
        const { tenantId, month, rentAmount, paid } = req.body;

        if (!tenantId || !month || rentAmount === undefined) {
            return res.status(400).json({ status: "N", message: "tenantId, month and rentAmount are required" });
        }

        const updatedRent = await Rent.findByIdAndUpdate(
            id,
            {
                tenantId,
                month,
                rentAmount: Number(rentAmount),
                paid: paid !== undefined ? Boolean(paid) : false
            },
            { new: true }
        ).populate("tenantId", "name roomNo phone");

        if (!updatedRent) {
            return res.status(404).json({ status: "N", message: "Rent record not found" });
        }

        return res.status(200).json({
            status: "Y",
            message: "Rent record updated successfully",
            data: updatedRent
        });
    } catch (error) {
        console.error("Update Rent Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};