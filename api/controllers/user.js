'use strict'

var validator = require('validator');
var User = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');

var controller = {

  // Método para guardar artículos
  saveUser: (req, res) => {
    // Recoger parámetros por post
    var params = req.body;

    // Validar datos
    try {
      var validate_email = !validator.isEmpty(params.email);
      var validate_name = !validator.isEmpty(params.name);
      var validate_surname = !validator.isEmpty(params.surname);
      var validate_password = !validator.isEmpty(params.password);

    } catch(err) {
      return res.status(500).send({ 
        status: 'error',
        message: 'Faltan datos por enviar'
      });
    }

    if(validate_email && validate_name && validate_surname && validate_password) { 
      // Crear objeto a guardar (artículo)
      var user = new User();

      // Asignar valores
      user.name = params.name;
      user.surname = params.surname;
      user.email = params.email;
      user.image = null;
      user.phone = params.phone;

      if(params.role == 'ROLE_ADMIN') {
        user.role = 'ROLE_ADMIN';
      } else {
        user.role = 'ROLE_USER';
      }

      // Comprobar usuarios duplicados (Check duplicated users)
      User.find({ $or: [
        {email: user.email.toLowerCase()},
        {phone: user.phone}
        ]}).exec((err, users) => {
          if(err) return res.status(500).send({message: 'Error en la petición del usuario'});

          if(users && users.length >= 1) {
              return res.status(200).send({message: 'El usuario que intentas registrar ya existe.'})
          } else {
            // Cifrar password y guardar datos
            bcrypt.hash(params.password, null, null, (err, hash) => {
              user.password = hash;
              user.save((err, userStored) => {
                if(err) return res.status(500).send({message: 'Error al guardar el usuario'});

                if(userStored) { 
                  res.status(200).send({user});  
                } else {
                  res.status(404).send({messsage: 'No se ha registrado el usuario'});
                }
              });
            });
          }
        });
    } else {
      return res.status(500).send({ 
        status: 'error',
        message: 'Datos no válidos' 
      });
    } 
  },

  loginUser: (req, res) => {
    var params = req.body;

    var identifyer = params.identifyer;
    var password = params.password;

    console.log(identifyer)

    User.findOne({
      $or: [{
          email: identifyer
        },
        {
          phone: identifyer
        }
      ]
    }, (err, user) => {
      if (err) return res.status(500).send({
        message: 'Error en la petición'
      });

      if (user) {
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {

            if (params.gettoken) {
              // Generar y Devolver token
              return res.status(200).send({
                token: jwt.createToken(user),
              });
            } else {
              // Devolvemos datos de usuario
              user.password = undefined;
              return res.status(200).send({
                user
              });
            }
          } else {
            return res.status(404).send({
              message: 'Error de identificación'
            });
          }
        });
      } else {
        return res.status(404).send({
          message: 'Usuario no identificado'
        });
      }
    });
  },

  uploadImage: (req, res, next) => {
    // Recoger fichero
    var file_name = 'Imagen no subida';

    if(!req.file) {
      return res.status(404).send({
        status: 'error',
        message: file_name
      });
    }

    // Nombre del archivo
    var file_path = req.file.filename;

    // Comprobar el mimetype, si no es una imagen, borrar
    var file_mime = req.file.mimetype;

    if(file_mime != 'image/png' && file_mime != 'image/jpg' && file_mime != 'image/gif' && file_mime != 'image/jpeg') {
      // Borrar file
      fs.unlink(req.file.path, (err) => {
        return res.status(200).send({
          status: 'error',
          message: 'Extensión no válida'
        });
      });
    } else {
      var article_Id = req.params.id;

      Article.findByIdAndUpdate(article_Id, {image: file_path}, {new: true}, (err, articleUpdated) => {
        if(err || !articleUpdated) {
          return res.status(200).send({
            status: 'error',
            message: 'Error al guardar la imagen'
          });
        }

        return res.status(200).send({
          status: 'success',
          article: articleUpdated
        });
      }); 
    }
  },

  getImage: (req, res) => {
    var image = req.params.image;

    var path_file = './uploads/users/'+image;
    

    fs.exists(path_file, (exist) => {
      if(exist) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: 'error',
          message: 'La imagen no existe'
        })
      }
    });
  },

  // Function to return user
  getUser: (req, res) => {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
      if(err) return res.status(500).send({message: 'Error en la petición'});

      if(!user) return res.status(404).send({message: 'El usuario no existe'});

      return res.status(200).send({ user });
    });
  },

  // Function to return user list
  getUsers: (req, res) => {
    var query = User.find({});
    var last = req.params.last;

    if(last || last != undefined){
      query.limit(6);
    }

    // Find
    query.sort('-_id').exec((err, users) => {
      if(err){
        return res.status(500).send({
          status: 'error',
          message: 'Error al devolver los artículos'
        });
      }

      if(!users){
        return res.status(404).send({
          status: 'error',
          message: 'No hay artículos para mostrar'
        });
      }

      return res.status(200).send({
        users
      });
    });
  },

  // Function to update user
  updateUser: (req, res) => {
    var userId = req.params.id;
    var update = req.body;

    // Borrar propiedad password
    delete update.password;

    if (userId == req.user.sub || req.user.role == "ROLE_ADMIN") {
      User.findByIdAndUpdate(userId, update, {
        new: true
      }, (err, userUpdated) => {
        if (err) return res.status(500).send({
          message: 'Error en la petición'
        });

        if (!userUpdated) return res.status(404).send({
          message: 'No se ha podido actualizar el usuario'
        });

        updatedAtDate(userId).then((value) => {
          return res.status(200).send({
            user: userUpdated,
            value
          });
        });
      });
    } else {
      return res.status(500).send({
        message: 'No tienes permiso para actualizar los datos de usuario'
      });
    }
  },

  searchUser: (req, res) => {
    // Sacar el string para buscar
    var search_string = req.params.searchParam;

    // Find para encontrar los artículos
    User.find({"$or": [
      {"title": {"$regex": search_string, "$options": "i"}},
      {"subtitle": {"$regex": search_string, "$options": "i"}},
      {"content": {"$regex": search_string, "$options": "i"}},
    ]}).sort('-_id').exec((err, articles) => {
      if(err) {
        return res.status(500).send({
          status: 'error',
          message: 'Error al devolver artículos'
        });
      }
      // Comprobar que existen artículos
      if(!articles || articles.length <= 0) {
        return res.status(404).send({
          status: 'error',
          message: 'No existen artículos'
        });
      }
      // Devolver artículos
      return res.status(200).send({
  
        status: 'success',
        articles
      });
    });
  },

} // END CONTROLLER

module.exports = controller;