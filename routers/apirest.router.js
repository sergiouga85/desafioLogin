import {Router , json, urlencoded} from 'express'
import {sesionesRouter} from './sesiones.router.js'
import {usuariosRouter} from './usuarios.router.js'


export const apiRouter= Router()


apiRouter.use(json())
apiRouter.use(urlencoded({ extended:true}))

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)
