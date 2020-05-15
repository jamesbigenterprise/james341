const mongodb = require('mongodb');
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

const mongoConnect = callback => {
    MongoClient
   .connect(
     MONGODB_URL, options
   )
   .then(client => {
     console.log('connected');
     callback(client);
     //app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
   })
   .catch(err => {
     console.log(err);
   });

}

   const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://mongo341:mongo341@cluster0-j1hjj.mongodb.net/test?retryWrites=true&w=majority";
 
module.exports.options = options;   
module.exports.mongoConnect = mongoConnect;