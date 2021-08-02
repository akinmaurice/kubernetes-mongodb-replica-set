const logError = (error) => {
    logger.error(error);
}


const errorHandler = async(error) => {
    logError(error);
};


module.exports = errorHandler;
