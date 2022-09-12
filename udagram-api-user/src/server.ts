import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import { V0_USER_MODELS} from './controllers/v0/model.index';


(async () => {
  await sequelize.addModels(V0_USER_MODELS);

  console.debug("Initialize database connection...");
  await sequelize.sync();
  console.log("request")
  const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:4200',
    'http://localhost:8100',
  ];
  
  // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
  
  console.log("re");
  const app = express();
  app.use(bodyParser.json());
  app.use(cors({
    origin: '*',
  }));
  const port = process.env.PORT || 8081;


  // We set the CORS origin to * so that we don't need to
  // worry about the complexities of CORS this lesson. It's
  // something that will be covered in the next course.
  // app.use(cors({
  //   allowedHeaders: [
  //     'Origin', 'X-Requested-With',
  //     'Content-Type', 'Accept',
  //     'X-Access-Token', 'Authorization',
  //   ],
  //   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  //   preflightContinue: true,
  //   origin: '*',
  // }));

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
