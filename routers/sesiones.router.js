import {Router, json, urlencoded} from 'express'
import {dbUsuarios} from '../src/models/User.js'


export const sesionesRouter= Router()


sesionesRouter.use(json())
sesionesRouter.use(urlencoded({extended: true}))


sesionesRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let datosUsuario = {};

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      datosUsuario = {
        email: 'admin',
        nombre: 'admin',
        apellido: 'admin',
        rolAdmin: true,
      };
    } else if (email == null || password == null) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    } else {
      const usuario = await dbUsuarios.findOne({ email }).lean();

      if (!usuario || password !== usuario.password) {
        return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
      }

      datosUsuario = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rolUsuario: true,
      };

      req.session['user'] = datosUsuario;
      return res.status(201).json({ status: 'success', message: 'Login successful' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

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
