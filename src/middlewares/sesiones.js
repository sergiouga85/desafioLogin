import session from 'express-session'
import connectMongo from 'connect-mongo'
import {MONGODB_CNX_STR} from '../config.js'


const store = connectMongo.create({
    mongoUrl: MONGODB_CNX_STR,
    ttl:60,
})


export const sesiones =session({   
    store,
    secret:'SecretCoder',
    resave: true,
    saveUninitialized:true
})

export function soloLogueadosApi(req, res, next){
    if(!req.session['user']){
        return res.status(400).json({status: 'error' , message: 'necesita iniciar sesion'})
    }
    next()
}

export function soloLogueadosWeb(req, res, next){
    if(!req.session['user']){
        //return res.render('errorNoLoggedIN.handlebars', {})
        return res.redirect('/login')

    }
    next()
}


/*
function showCookies(req,res,next){
    console.dir(req.session)
    next()
}


app.use(showCookies)


*/