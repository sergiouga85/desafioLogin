import {Router} from 'express'
import {dbUsuarios} from '../models/User.js'
import {soloLogueadosApi} from '../middlewares/sesiones.js'

export const usuariosRouter= Router()


usuariosRouter.post('/register',async (req, res)=>{
    try{
    const usuario= await dbUsuarios.create(req.body)
    res.status(201).json({static:'success' , payload: usuario})
    }catch(error){
        res.status(400).json({ status: 'error', message:error.message})
    }
})

usuariosRouter.get('/miperfil', soloLogueadosApi, async (req,res)=>{
    const usuario = await dbUsuarios.findOne({email: req.session['user'].email}, {password:0}).lean()
    res.json({status: 'success' , payload: usuario})
})


usuariosRouter.get('/:id',()=>{})
