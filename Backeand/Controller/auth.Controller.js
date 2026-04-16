const authSchema = require("../Model/auth.Model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//======Registeration user======
async function registration(req, res) {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authSchema.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'Registration successful',
            data: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//======Login user======
async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log('userID is', req.userId);
        const registeruser = await authSchema.findOne({ email });
        if (!registeruser) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            registeruser.password
        );
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const dataToSend = {
            name: registeruser.name,
            email: registeruser.email,
        };

        const token = jwt.sign(dataToSend, 'qbsud8r4jhr', {
            expiresIn: "1m"
        });



        res.status(200).json({
            message: 'Login successful',
            data: dataToSend,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { registration, login }