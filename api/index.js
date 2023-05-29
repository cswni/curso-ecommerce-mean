import express from 'express';
import cors from 'cors';
import parth from 'path';
import mongoose from 'mongoose';

import router from './routes/';

//Conexion a la base de datos
mongoose.Promise = global.Promise;

const dbUrl = 'mongodb://cswni:cswni@c.ni/ecommerce?authSource=admin';

mongoose
	.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((mongoose) => console.log('Conectado a la BD en el puerto 27017'))
	.catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(parth.join(__dirname, 'public')));

//Cargar las rutas desde el index
app.use('/api', router);


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
	console.log('server on port ' + app.get('port'));
});
