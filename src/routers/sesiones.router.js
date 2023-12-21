import {Router, json, urlencoded} from 'express'
import passport from 'passport'



export const sesionesRouter= Router()


sesionesRouter.use(json())
sesionesRouter.use(urlencoded({extended: true}))



sesionesRouter.post('/login',
  passport.authenticate('login', { failureRedirect: '/login' }),
  function (req, res) {
    res.status(201).json({ status: 'success', message: 'Login successful' });
  }
);



sesionesRouter.get('/current', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }
  res.status(400).json({ status: 'error', message: 'no hay una sesion iniciada' })
})



sesionesRouter.post ('/logout', (req,res)=>{
  req.logout(error=>{
    if(error){
      console.log(error)
      return res.status(500).json({ status: 'logout error', body: err })
    }  
  res.json({status:'success' , message:'logout OK!'})
  })
})
