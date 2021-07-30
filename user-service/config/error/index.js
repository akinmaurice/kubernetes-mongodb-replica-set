const logError = (name, error) => {
    logger.error(`${name}: ${error}`);
}


const errorHandler = async(name, error) => {
    logError(name, error);
};


module.exports = errorHandler;
