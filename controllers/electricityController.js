const Electricity = require("../models/electricityModel");

// Create Electricity Record
exports.createElectricity = async (req, res) => {
    try {
        const { tenantId, month, previousReading, currentReading, unitRate } = req.body;

        // Check required fields (properly supporting 0 for readings)
        if (
            !tenantId ||
            !month ||
            previousReading === undefined ||
            currentReading === undefined ||
            unitRate === undefined
        ) {
            return res.status(400).json({ status: "N", message: "All fields are required" });
        }

        const prev = Number(previousReading);
        const curr = Number(currentReading);
        const rate = Number(unitRate);

        if (isNaN(prev) || isNaN(curr) || isNaN(rate)) {
            return res.status(400).json({ status: "N", message: "Readings and unit rate must be valid numbers" });
        }

        if (curr < prev) {
            return res.status(400).json({ status: "N", message: "Current reading cannot be less than previous reading" });
        }

        // Auto-calculate bill: (current - previous) * unitRate
        const calculatedBill = (curr - prev) * rate;
        const totalBill = req.body.totalBill !== undefined ? Number(req.body.totalBill) : calculatedBill;

        const newElectricity = new Electricity({
            tenantId,
            month,
            previousReading: prev,
            currentReading: curr,
            unitRate: rate,
            totalBill
        });

        await newElectricity.save();
        return res.status(201).json({
            status: "Y",
            message: "Electricity record created successfully",
            data: newElectricity
        });
    } catch (error) {
        console.error("Create Electricity Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Get All Electricity Records
exports.getElectricitys = async (req, res) => {
    try {
        // Populate tenantId to give frontend direct access to tenant name & roomNo
        const electricityRecords = await Electricity.find()
            .populate("tenantId", "name roomNo phone")
            .sort({ createdAt: -1 });

        // Always return 200 with data array (empty array if no records)
        return res.status(200).json({
            status: "Y",
            message: "Success",
            data: electricityRecords
        });
    } catch (error) {
        console.error("Get Electricity Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Delete Electricity Record
exports.deleteElectricity = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRecord = await Electricity.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ status: "N", message: "Electricity record not found" });
        }
        return res.status(200).json({ status: "Y", message: "Electricity record deleted successfully" });
    } catch (error) {
        console.error("Delete Electricity Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};

// Update Electricity Record
exports.updateElectricity = async (req, res) => {
    const { id } = req.params;
    try {
        const { tenantId, month, previousReading, currentReading, unitRate } = req.body;

        if (
            !tenantId ||
            !month ||
            previousReading === undefined ||
            currentReading === undefined ||
            unitRate === undefined
        ) {
            return res.status(400).json({ status: "N", message: "All fields are required" });
        }

        const prev = Number(previousReading);
        const curr = Number(currentReading);
        const rate = Number(unitRate);

        if (isNaN(prev) || isNaN(curr) || isNaN(rate)) {
            return res.status(400).json({ status: "N", message: "Readings and unit rate must be valid numbers" });
        }

        if (curr < prev) {
            return res.status(400).json({ status: "N", message: "Current reading cannot be less than previous reading" });
        }

        const calculatedBill = (curr - prev) * rate;
        const totalBill = req.body.totalBill !== undefined ? Number(req.body.totalBill) : calculatedBill;

        const updatedRecord = await Electricity.findByIdAndUpdate(
            id,
            {
                tenantId,
                month,
                previousReading: prev,
                currentReading: curr,
                unitRate: rate,
                totalBill
            },
            { new: true } // Return the updated document to the client
        );

        if (!updatedRecord) {
            return res.status(404).json({ status: "N", message: "Electricity record not found" });
        }

        return res.status(200).json({
            status: "Y",
            message: "Electricity record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Update Electricity Error:", error);
        return res.status(500).json({ status: "N", message: `Internal server error: ${error.message}` });
    }
};