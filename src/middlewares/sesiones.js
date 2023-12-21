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

