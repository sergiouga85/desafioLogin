import passport from 'passport'
import {Strategy} from 'passport-local'
import { dbUsuarios } from '../models/User.js'


passport.use('register', new Strategy({
    passReqToCallback:true,
    usernameField: 'email'
},
    async (req,_u, _p, done)=>{
        try{
            const datosUsuario= await dbUsuarios.registrar(req.body)
            done(null, datosUsuario)
        }catch(error){
            done(null, false, error.message)
        }
    }))

passport.use('login', new Strategy({
    usernameField: 'email'
},
    async (email, password, done)=>{
        try{
            const datosUsuario= await dbUsuarios.autenticar(email,password)
            done(null, datosUsuario)
        }catch(error){
                done(null, false, error.message)
        }
    }))

passport.use('resetpassword', new Strategy({
        usernameField: 'email'
    },
        async (email, password, done)=>{
            try{
                const datosUsuario= await dbUsuarios.resetearContrasenia(email,password)
                done(null, datosUsuario)
            }catch(error){
                    done(null, false, error.message)
            }
    }))



passport.serializeUser((user,next) =>{next (null, user)})
passport.deserializeUser((user,next) =>{next(null,user)})

const passportIntialize = passport.initialize()
const passportSession =passport.session()

export function autentication(req, res, next){
    passportIntialize(req,res,()=> {
        passportSession(req, res, next)
    })
}