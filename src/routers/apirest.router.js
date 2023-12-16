import {Router , json, urlencoded} from 'express'
import {sesionesRouter} from './sesiones.router.js'
import {usuariosRouter} from './usuarios.router.js'
import { productosRouter } from "./api.productos.router.js"
import { carritoRouter } from "./api.carrito.router.js"


export const apiRouter= Router()


apiRouter.use(json())
apiRouter.use(urlencoded({ extended:true}))

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/productos', productosRouter)
apiRouter.use('/carritos', carritoRouter)
