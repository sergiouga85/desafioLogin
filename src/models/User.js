import mongoose from "mongoose"
import {randomUUID} from 'crypto'
import {hasheadasSonIguales, hashear} from '../../utils/criptografia.js'

const collection= 'usuarios'

const schemaUsers= new mongoose.Schema({
    _id:{ type: String , default: randomUUID},
    email: { type: String, required:true},
    password: {type: String, required:true},
    nombre: {type: String, required:true},
    apellido:{type: String, required:true}
}, {
    strict: 'throw',
    versionKey: false,
    statics:{
        registrar: async function (reqBody){
    
            reqBody.password=hashear(req.password)
            const usuario= await mongoose.model(collection).create(reqBody)
            const datosUsuario={
                email:usuario.email,
                nombre:usuario.nombre,
                apellido:usuario.apellido,
                rol: 'usuario'
            }
            return datosUsuario
        },
        autenticar: async function (username, password){

            let datosUsuario
          
            if (username=== 'adminCoder@coder.com' && password === 'adminCod3r123') {
              datosUsuario = {
                email: 'admin',
                nombre: 'admin',
                apellido: 'admin',
                rolAdmin: true,
                };
            } else {    
               const usuario = await mongoose.model(collection).findOne({ email:username }).lean();
              if (!usuario) {
                return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
              }
              if(!hasheadasSonIguales(password,usuario.password)) {
                return res.status(400).json({ status: 'error', message: 'las contraseñas no coinciden' });
              }
              datosUsuario = {
                nombre: usuario.nombre,
                apellido:usuario.apellido,
                rol:'usuario'
              }
            }  
            if(!datosUsuario){
              throw new Error ('usuario no encnotrado')
            }
            return datosUsuario
        },
        resetearContrasenia: async function (email, password) {
            const newPassword = hashear(password)
      
            const actualizado = await mongoose.model(collection).findOneAndUpdate(
              { email },
              { $set: { password: newPassword } },
              { new: true }
            ).lean()

            if(!actualizado){
                console.log('usuario no encontrado')
            }
             console.log(actualizado)
             return actualizado
            }
        
        }
    })


export const dbUsuarios= mongoose.model(collection, schemaUsers)