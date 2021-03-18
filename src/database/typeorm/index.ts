import { createConnection } from "typeorm";
import configs from '@config/typeormConfig';

createConnection(configs['development'])
    .then(_ => {
        console.log('Db connected');
    })
    .catch(error => {
        console.log(error);   
    });
