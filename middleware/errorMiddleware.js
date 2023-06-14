export const notFound = (req, res, next)=>{
    const error = new Error(`Not found -  ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode===200? 400 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        status:false,
        data:null,
        stack:process.env.NODE_ENV==='production' ? null : err.stack,
    });
}