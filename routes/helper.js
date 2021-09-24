exports.requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"shshshshshsh",(err,result)=>{
            if(err){
                res.redirect('/') 
            }else{
                next();
            }
        })
    }else if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/auth/login')
    }
}