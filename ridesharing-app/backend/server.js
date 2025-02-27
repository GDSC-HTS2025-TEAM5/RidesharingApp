const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // Allows parsing JSON request bodies
app.use(cors()); // Enable CORS for frontend-backend communication

// Login Route (Example)
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Dummy user for authentication
    const dummyUser = {
        email: "test@example.com",
        password: "password123",
    };

    if (email === dummyUser.email && password === dummyUser.password) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
