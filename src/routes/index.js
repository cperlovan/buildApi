const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios')

const jobs = require("./Jobs.js");
const bills = require("./Bills");
 const po = require("./Po.js")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/jobs', jobs);
router.use('/bills', bills );
router.use('/po', po );
   
   
  module.exports = router;
  
