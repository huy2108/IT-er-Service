const mongoose = require('mongoose');


function connect() {
  mongoose.connect('mongodb://127.0.0.1:27017/ITer_WebService' , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected"))


}

module.exports = {connect}