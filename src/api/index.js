import express from 'express';
import { generateToken } from '../controllers/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});

// get a new token and refresh token for a new/existing user
router.post('/token', (req, res) => {
    const { roles } = req.body;
    if (!roles)
        res.status(400).json({ error: "Please define the roles" });

    const token = generateToken('access', { roles });
    const refreshToken = generateToken('refresh', { roles });

    res.status(200).json({ token, refreshToken });
});


// authenticate and verify token
router.post('/auth', (req,res) => {
    const roles = ["admin", "user"];  // user roles has to be one of these
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Access denied. No token provided.' });

    // verify the token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        // throw error if the token does not match
        if (err)
            return res.status(401).json({ message: 'Invalid token' });

        // check the roles for specific resource access
        if (roles && roles.length > 0) {
            const userRoles = decoded.roles; // decode from JWT 
            
            const hasRequiredRole = roles.some(role => userRoles.includes(role));
            if (!hasRequiredRole)
                return res.status(403).json({ message: 'Access denied.' });
        }
        // authenticate to access resource if the roles match
        req.user = decoded;
    });
    
    res.send({ message: 'ok' });
});

export default router;
