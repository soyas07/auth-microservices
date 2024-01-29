import bcrypt from 'bcrypt';
import User from '../models/User.js';

import { generateToken } from './auth.js';

export const registerUser = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        // Ensure the User table exists, create it if it doesn't
        await User.sync();
        // check if email or password is empty
        if (!email || !password || !username || !roles)
            return res.status(400).json({ error: 'Email and Password are required' });

        // Check if the email is already in use
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(409).json({ error: 'Email is already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, email, password: hashedPassword, roles };
        // generate JWT
        const token = generateToken('access', { user, roles: [roles] });
        const refreshToken = generateToken('refresh', { user, roles: [roles] });
        const createdUser = await User.create(user);

        res.status(201).json({ message: 'User registered successfully', token, refreshToken, userId: createdUser.id });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) 
        return res.status(400).json({ error: 'Email and Password are required' });

    const user = await User.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials. Please try again.' });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
        return res.status(401).json({ error: 'Invalid credentials. Please try again.' });

    // Generate refresh token
    const accessToken = generateToken('access', {id: user.id, email: user.email, roles: [user.roles] });
    const refreshToken = generateToken('refresh', { id: user.id, email: user.email, roles: [user.roles] });

    return res.status(200).json({ message: 'User signed in successfully', refreshToken, accessToken});
};

