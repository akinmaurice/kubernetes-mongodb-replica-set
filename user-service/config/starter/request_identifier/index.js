const cls_hooked = require('cls-hooked');
const { v4: uuid } = require('uuid');

const { createNamespace } = cls_hooked;

const nameSpace = createNamespace('logger');

const requestIdentifier = () => (req, res, next) => {
    const reqId = req.get('X-Request-Id') || uuid();
    res.set('X-RequestId', reqId);
    nameSpace.run(() => {
        nameSpace.set('requestId', reqId);
        next();
    });
};

module.exports = requestIdentifier;
