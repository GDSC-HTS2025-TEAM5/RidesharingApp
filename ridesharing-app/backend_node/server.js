const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const  bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb+srv://puja-304:728fcQvWGsgsYLdV@hts-group5-cluster.uxkrt.mongodb.net/?retryWrites=true&w=majority&appName=HTS-Group5-Cluster")
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.get("/api/status", (req,res) => {
    res.json({status: "ok", message : "Backend is running!"});
});

app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });

        // Try saving the user and catch any errors
        await newUser.save().then(() => {
            console.log("✅ User saved:", newUser);
            res.status(201).json({ message: "User registered successfully!" });
        }).catch((error) => {
            console.error("❌ MongoDB Save Error:", error);
            res.status(400).json({ error: "Error saving user", details: error.message });
        });

    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Error registering user", details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

