const mongodb = require('mongodb');
const mongoose = require('mongoose');

const MongoClient = mongodb.MongoClient;

//cors configuration


const corsOptions = {
    origin: "https://cse341james.herokuapp.com/",
    optionsSuccessStatus: 200
};

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, 
    family: 4
};

let _db;
const mongoConnect = callback => {
    MongoClient
   .connect(
     MONGODB_URL, options
   )
   .then(client => {
     console.log('connected');
     _db = client.db();
     callback();
     //app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
   })
   .catch(err => {
     console.log(err);
     throw err;
   });

}

   
 const getDb = () => {
     if(_db) {
         return _db;
     }
     throw "no database found";
 }
module.exports.options = options;   
module.exports.corsOptions = corsOptions;
module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;