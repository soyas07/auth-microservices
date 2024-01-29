import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken && req.cookies)
        refreshToken = req.cookies['refreshToken'];

    if (!refreshToken)
        return res.status(400).json({ error: 'Refresh token is required' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ user: decoded.user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(400).send({ error: 'Invalid refresh token' });
    }
} 


// generate jwt token
export const generateToken = (type, user) => {
    let secret = '';
    let expiresIn = '';

    switch (type) {
        case 'access':
            secret = process.env.TOKEN_SECRET;
            expiresIn = '15m';
            break;
        case 'refresh':
            secret = process.env.REFRESH_TOKEN_SECRET;
            expiresIn = '7d';
            break;
    }

    return jwt.sign(user, secret, { expiresIn });
}
