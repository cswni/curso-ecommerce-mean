import bcrypt from 'bcryptjs';
import models from '../models';
import token from '../services/token';


export default {

    //Add user
    register: async (req, res) => {
        try{
            //Encrypt password
            req.body.password = await bcrypt.hash(req.body.password, 10);

            let user = await models.User.create(req.body);

            res.status(200).send({
                user,
                message: 'Usuario creado correctamente'
            });

        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error'
            });
            console.log(e);
        }
    },

    //Login user
    login: async (req, res) => {
        try{
            //Find user
            const user = await models.User.findOne({email: req.body.email, state: 1});

            if(user){
                //Validate password
                let compare = await bcrypt.compare(req.body.password, user.password);

                if(compare){
                    //Generate token
                    let tokenT = await token.encode(user._id, user.rol, user.email);

                    res.status(200).json({
                        USER_FRONTEND_: {
                            user: {
                                name: user.name,
                                email: user.email,
                                surname: user.surname,
                                avatar: user.avatar,
                            },
                            token: tokenT,
                            message: 'Usuario logueado correctamente'
                        }
                        
                    });
                }else{
                    res.status(401).send({
                        message: 'Contraseña incorrecta'
                    });
                }
            }else{
                res.status(500).send({
                    message: 'Usuario no encontrado'
                });
            }
        }catch(e){
            res.status(500).send({
                message: 'Ocurrio un error en la peticion'
            });
            console.log(e);
        }
    },


    //Update user
    update: async (req, res) => {
        try {
            if(req.files){
                let image_path = req.files.avatar.path;
                let name = image_path.split('\\');
                let avatar_name = name[2];
            }
            //Encrypt password
            req.body.password = await bcrypt.hash(req.body.password, 10);

            const UserT = await models.User.findByIdAndUpdate(req.body._id, req.body);
            res.status(200).json({
                message: 'Usuario actualizado correctamente',
                user: UserT
            });
            
        }catch(e) {
        }
    },

    //List users
    list: async (req, res) => {
        try {
            let query = req.query.search;
            const Users = await models.User.find(
                {
                    $or: [
                        {name: new RegExp(query, 'i')},
                        {email: new RegExp(query, 'i')},
                        {surname: new RegExp(query, 'i')}
                    ]
                }
            ).sort({'createdAt': -1});


            res.status(200).json({
                users: Users
            });
        } catch (error) {
            console.log(error);
        }
    },

    //Remove user
    remove: async (req, res) => {
        try {
            const UserT = await models.User.findByIdAndDelete(req.body._id);
            res.status(200).json({
                message: 'Usuario eliminado correctamente',
                user: UserT
            });
        } catch (error) {
            console.log(error);
        }
    }
}