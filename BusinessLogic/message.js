var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var schema = mongoose.Schema({
    userID: Number,
    messageText : String,
    timeStamp : Date
});

var promise = mongoose.connect('mongodb://localhost/ChatDb');

var model = null;
promise.then((connectionObj)=>{
    if (connectionObj) 
    {
        model = connectionObj.model('Mesages',schema,'Mesages');
    }
    else{
        console.log('Connection failed');
    }
},(err)=>{
    console.log('Connection failed with error :'+err);
});

module.exports = {
    post : (req)=>{
        let messageObj = {
            userID : req.userID,
            messageText : req.message,
            timeStamp : new Date().toDateString()
        };
        model.create(messageObj,(err,success)=>{
            if (err) 
            {
                console.log('Record Insert failed :'+err);
                return false;
            }
            return true;
        });
    }
}