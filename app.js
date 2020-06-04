const express = require('express')
const app = express()
const upload = require('./routes/upload')
const multer = require('multer')
const configMulter = require('./config/multer')
const PORT = process.env.PORT || 3334

app.route('/upload')
   .post(multer(configMulter).single('file'),upload.post)

app.listen(PORT,()=>{console.log(`Servidor iniciado em http://localhost:${PORT}`)})