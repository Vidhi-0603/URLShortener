import mongoose from 'mongoose';

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser : true,
            useUnifiedtopology : true
        });

        if(conn){
            console.log(`MongoDb connected successfully to ${conn.connection.host}`);
        }else{
            console.log("MongoDb connection failed");
        }

    }catch(err){
        console.log(err.message);
    }
}

export default connectDb;