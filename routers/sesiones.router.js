import {Router, json, urlencoded} from 'express'
import {dbUsuarios} from '../src/models/User.js'


export const sesionesRouter= Router()


sesionesRouter.use(json())
sesionesRouter.use(urlencoded({extended: true}))


sesionesRouter.post ('/login', async (req,res)=>{

  const {email, password} = req.body

  let datosUsuario={}

  
   if(email == 'adminCoder@coder.com' && password == 'adminCod3r123'){

    datosUsuario={
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rolAdmin:true
     }

   }else{

      const usuario= await dbUsuarios.findOne({email}).lean()
      console.log(usuario)
      console.log(email)
      console.log(password)

      if(email !== usuario.email){
        return res.status(400).json({ status: 'error', message:'login failed'})
       }
    
       if(password !== usuario.password){
        return res.status(400).json({ status: 'error', message:'login failed'})
       }
    
       datosUsuario={
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido
       }
    
       req.session['user']= datosUsuario
       res.status(201).json({ status: 'success', message:'login success'})
      
       
   }

})




sesionesRouter.get('/current', (req,res)=>{
  if(req.session['user']){
    return res.json(req.session['user'])
  }
  res.status(400).json({ status: 'error', message:'No hay una session iniciada'})
})


sesionesRouter.post ('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err){
            return res.status(500).json({ status: 'logout error', body: err })
    }
    res.json({status:'success' , message:'logout OK!'})
  })
})


/*
app.get('/', (req,res)=>{
  

})
*/