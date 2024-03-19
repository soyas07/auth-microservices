import jwt from 'jsonwebtoken';

export const renewToken = async (req, res) => {
    let refreshToken = req.cookies.refreshToken;

    if (!refreshToken && req.cookies)
        refreshToken = req.cookies['refreshToken'];

    if (!refreshToken)
        res.status(400).json({ error: 'Refresh token is required' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const token = jwt.sign({ user: decoded.user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, path: '/', secure: true, maxAge: 60 * 60 * 1000, sameSite: 'none' }); // Set the token in cookies
        res.status(200).json({ message: 'OK' });
    } catch (error) {
        res.status(400).send({ error: 'Invalid refresh token' });
    }
} 


// generate jwt token
export const generateToken = (type, user) => {
    let secret = '';
    let expiresIn = '';

    switch (type) {
        case 'access':
            secret = process.env.TOKEN_SECRET;
            expiresIn = '1h';
            break;
        case 'refresh':
            secret = process.env.REFRESH_TOKEN_SECRET;
            expiresIn = '7d';
            break;
    }

    return jwt.sign(user, secret, { expiresIn });
}
