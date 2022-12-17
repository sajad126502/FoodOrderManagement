const mongoose=require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://root:kvuh6tf9IX11nVYw@cluster0.9gt1cxv.mongodb.net/?retryWrites=true&w=majority')

        //await mongoose.connect('mongodb+srv://restaurant-user:project123@foodordermanagementapp.9tlsg.mongodb.net/?retryWrites=true&w=majority')
        console.log("Db connection successful");
    }
    catch{
        console.log("Db connection error");
    }
}
module.exports = connectDB;