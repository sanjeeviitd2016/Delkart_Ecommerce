const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).
    then((data) => {
        console.log(`database is connected with ${data.connection.host}`);
    })

    //=----> already defined in server file
    // .catch((err)=>{
        
    //     console.log({message:err.message});
    //     process.exit(1);
    // })

module.exports= mongoose;
