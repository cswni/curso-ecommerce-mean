import token from '../services/token';

export default {
	verifyEcommerce: async (req, res, next) => {
		if (!req.headers.token) {
			return res.status(404).send({
				message: 'No se ha enviado el token',
			});
		}
		const response = await token.decode(req.headers.token);

		if (response) {
			if (response.rol == 'cliente' || response.rol == 'admin') {
				next();
			} else {
				return res.status(403).send({
					message: 'No autorizado para ingresar',
				});
			}
		} else {
			return res.status(403).send({
				message: 'No autorizado para ingresar',
			});
		}
	},
	verifyAdmin: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No se ha enviado el token',
            });
        }

        const response = await token.decode(req.headers.token);

        if (response) {
            if (response.rol == 'admin') {
                next();
            } else {
                return res.status(403).send({
                    message: 'No autorizado para ingresar. Solo los admin pueden ver',
                });
            }
        }else{
            return res.status(403).send({
                message: 'No autorizado para ingresar',
            });
        }
    },
};
