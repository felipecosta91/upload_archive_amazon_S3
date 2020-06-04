require('dotenv').config()
const multerS3 = require('multer-s3')
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerStorage = {
  s3: multerS3({
    s3: new aws.S3(
// AWS_ACCESS_KEY_ID=COLOQUE AQUI SUA KEY AWS S3
// AWS_SECRET_ACCESS_KEY=COLOQUE AQUI SUA KEY AWS S3
    ),
    bucket: 'testimgnode', //nome do bucket criado no amazon S3
    contentType: multerS3.AUTO_CONTENT_TYPE, //faz com que o navegador veja o arquivo caso
    //esta tag não exista, o navegador iria fazer download do arquivo sem abrir
    acl: 'public-read', //define como modo leitura pública
    //renomei o arquivo de imagem com uma uma chave do crypto para não ter dois arquivos com mesmo nome
    key: (req, file, callback) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err)
          return callback(err)
        const newname = `${hash.toString('hex')} - ${file.originalname}`
        callback(null,newname)
          })
    }
  })
}
module.exports = {
  storage: multerStorage['s3'],
  limits: 3 * 1024 * 1024,//equivalente a 3mb
  fileFilter: (req, file, callback) => {
    const typesArchive = ['image/jpg','image/jpeg','image/png','image/gif']
    if (typesArchive.includes(file.mimetype)) {
        callback(null,true)
    }
    else {
      callback(new Error ('arquivo inválido!'))
    }

  }
}