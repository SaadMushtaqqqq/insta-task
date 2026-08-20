const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. Array declaration top par zaroori hai
const usersDB = [];

// 2. REGISTER ROUTE (Data save aur encrypt karne ke liye)
app.post('/api/register', async (req, res) => {
    const { username, password, fullName, contact, birthday } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username aur password required hain!" });
    }

    // Duplicate Check
    const existingUser = usersDB.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Already registered" });
    }

    // Password Encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User to Array
    const newUser = { 
        id: usersDB.length + 1,
        username, 
        password: hashedPassword, 
        fullName, 
        contact, 
        birthday 
    };
    
    usersDB.push(newUser);

    console.log("--- New User Registered ---");
    console.log(newUser);

    res.json({ success: true, message: "Registration Successful!" });
});

// 3. LOGIN ROUTE
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = usersDB.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ success: false, message: "User nahi mila!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Incorrect Password!" });
    }

    res.json({ success: true, message: "Login Successful" });
});

// 4. GET ALL USERS ROUTE (Browser par data dekhne ke liye)
app.get('/api/users', (req, res) => {
    res.json({
        totalUsers: usersDB.length,
        users: usersDB
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});