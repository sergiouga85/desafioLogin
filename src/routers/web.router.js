import {Router, json, urlencoded} from 'express'


export const webRouter= Router()

webRouter.get('/login', (req, res) => {
    res.render('login.handlebars', { titulo: 'Inicio de Sesión' })
})

webRouter.get('/perfil', (req, res) => {
    res.render('perfil.handlebars', { titulo: 'Perfil de usuario' })
})

webRouter.get('/register', (req, res) => {
    res.render('registro.handlebars', { titulo: 'Registro de usuario' })
})

webRouter.get('/resetpassword', (req, res) => {
    res.render('resetpassword.handlebars', { titulo: 'Reseteo de contraseña' })
})

webRouter.get('/productos', (req, res) => {
    res.render('productos.handlebars',{ titulo: 'Productos' })
})

webRouter.get('/carritos', (req, res) => {
    res.render('carritos.handlebars',{ titulo: 'carritos' })
})

webRouter.get('/carritosActivos', (req, res) => {
    res.render('carritosActivos.handlebars',{ titulo: 'Elegir Carritos' })
})
