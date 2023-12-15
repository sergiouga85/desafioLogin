import { Schema, model } from 'mongoose'
import {randomUUID} from 'crypto'

const collection= 'usuarios'

const schemaUsers= new Schema({
    _id:{ type: String , default: randomUUID},
    email: { type: String, required:true},
    password: {type: String, required:true},
    nombre: {type: String, required:true},
    apellido:{type: String, required:true}
}, {
    strict: 'throw',
    versionKey: false
})


export const dbUsuarios= model(collection, schemaUsers)