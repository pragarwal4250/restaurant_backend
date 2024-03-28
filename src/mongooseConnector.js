const mongoose = require('mongoose');
const fs = require('fs');

class dataBaseConnection{
    constructor(){
        if(!dataBaseConnection.instance){
            
            const credentials = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));

            const connectionString = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.9mruwfw.mongodb.net/?retryWrites=true&w=majority`;
            // Connect to MongoDB Atlas
            mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            dataBaseConnection.instance = mongoose;
        }

        return dataBaseConnection.instance;
    }
}

module.exports = new dataBaseConnection();