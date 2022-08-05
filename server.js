import express from "express";
const app = express();

import rutas from './routes/routesDesafio14.js';
import logger from './logger/Log4jsLogger.js'
import loggerMiddleware from "./utils/loggerMiddle.js";
import 'dotenv/config'
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views','./views');
app.set('view engine', 'ejs');

app.use(loggerMiddleware);
app.use('/desafio14',rutas)
app.use('*',(req,res)=>{
    logger.warn(`Ruta Inexistente`);
    res.send(`Ruta Inexistente`);
})

const select = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

const { PORT } = minimist(process.argv, select);

const MODO=process.argv[2]==='CLUSTER';

if(MODO && cluster.isMaster){
    const CPUs=os.cpus().length;
    console.log('Master');
    for(let i = 0; i < CPUs;i++){
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        cluster.fork();
    });
}else{
    const server = app.listen(PORT, () => {
        console.log(`Servidor escuchando puerto ${PORT}`);
        })
        
    server.on('error', (err) => console.log(err));
}