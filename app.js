const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const app = express();
const connectDB = require("./config/db");
connectDB();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;


//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//routes
const electRoutes = require("./routes/electrictyRoute");
const rentRoutes = require("./routes/rentRoute");
const tenantRoutes = require("./routes/tenantRoute");
const authRoutes = require("./routes/authRoute");

//using routes
app.use("/api/electricity", electRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`🌟server is running on PORT ${ PORT }`);

});