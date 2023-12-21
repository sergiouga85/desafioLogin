export function soloLogueadosApi(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(400).json({ status: 'error', message: 'usuario no autenticado' });
    }

    next()
}


export function soloLogueadosWeb(req, res, next){
    
    if(!req.isAuthtenticad()){
        return res.status(400).json({status: 'error' , message: 'usuario no autenticado'})
    }
    
    next()
}
