// MONGODB
import mongoose from 'mongoose';

const MONGO_USERNAME = 'Deleiev';
const MONGO_PASSWORD = 'coderhouse32190';
const MONGO_HOSTNAME = 'frissdekerekimaximilian.pbngemb.mongodb.net';
const MONGO_DB = 'ecommerce';

const URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;

export default URL