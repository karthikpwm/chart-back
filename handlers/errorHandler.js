/* 
  catch Errors Handler

*/

exports.catchErrors = (fn) => { // File is a commonJS Module; it may be converted
    return function (req, res, next) {
        fn(req, res, next).catch( err => {
            if(typeof err === "string") {
                res.status(400).json({
                    message: err
                })
            } else {
                next(err)
            }
        })
    }
}

/*
  Mongose Errors
*/
exports.mongoseError = (err,_, res, next) => {
    if(!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors)
    let message = "";

    errorKeys.forEach(key => (message += err.errors[key].message + ", "))
    message = message.substr(0, message.length - 2)

    res.status(400).json({
        message
    })
}

/* 
Development Error Handel
*/

exports.developmentErrors = (err, _, res) => {
    err.stack = err.stack || ''
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack
    }
    res.status(err.status || 500).json( errorDetails );

}

/*
    Production Error Handler
    No stackraces and error details are leaked to user
*/
exports.productionError = (err, _, res) => {
    res.status(err.status || 500).json({
        error: 'Internal Server Error'
    })
}

// 404 Not Found
exports.notFound = (_, res) => {
    res.status(404).json({
        message: 'Route not found'
    })
}