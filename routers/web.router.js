import {Router, json, urlencoded} from 'express'


export const webRouter= Router()

webRouter.get('/login', (req, res) => {
    res.render('login.handlebars', { titulo: 'Inicio de Sesión' })
})

webRouter.get('/register', (req, res) => {
    res.render('registro.handlebars', { titulo: 'Registro de usuario' })
})

webRouter.get('/productos', (req, res) => {
    res.render('productos.handlebars',{ titulo: 'Productos' })
})
