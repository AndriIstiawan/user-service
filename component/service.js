const user = require('./model');

exports.create = (body) => {
    return user.create(body);
};

exports.findOne = (identify) => {
    return user.findOne({
        $or: [
            { email: identify },
            { phone: identify }
        ]
    }).lean({ getters: true });
};
