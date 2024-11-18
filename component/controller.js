const service = require('./service');
const CONFIG = require('../config/config');
const { userValidation, loginValidation } = require('./validation');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        const { error, value } = await userValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        await service.create(value);
        return res.status(201).json({ message: 'created', status: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { error, value } = await loginValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        var user = await service.findOne(req.body.identify);
        if (!user) return res.status(404).json({ message: 'User not found', status: false });

        const token = jwt.sign(user, CONFIG.secret_key, { expiresIn: '24h' });
        return res.status(200).json({ message: 'success', token: token, status: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false });
    }
};

exports.findMe = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ message: 'success', user });
    } catch (error) {
        return res.status(500).json({ message: 'unsuccess' });
    }
};
