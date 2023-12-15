import {Router, json, urlencoded} from 'express'
import {dbUsuarios} from '../src/models/User.js'

export const webRouter= Router()

webRouter.get('/login', (req, res) => {
    res.render('login.handlebars', { titulo: 'Inicio de Sesión' })
})

