import {Router} from 'express'
import {dbUsuarios} from '../models/User.js'
import {soloLogueadosApi} from '../middlewares/auth.js'
import passport from 'passport'


export const usuariosRouter= Router()

usuariosRouter.get('/register',function registerView (req, res,){
})
    

usuariosRouter.post('/register',
  passport.authenticate('register', { failureRedirect: '/register' }),
  function (req, res) {
    res.status(201).json({ status: 'success', message: 'Login successful' });
  }
);


usuariosRouter.post('/resetpassword',
  passport.authenticate('resetpassword', { failureRedirect: '/resetpassword' }),
  function (req, res) {
    res.status(201).json({ status: 'success', message: 'Login successful' });
  }
);


usuariosRouter.get('/perfil', soloLogueadosApi, async (req,res)=>{
    const usuario = await dbUsuarios.findOne({email: req.user.email}, {password:0}).lean()
    res.json({status: 'success' , payload: usuario})
})






