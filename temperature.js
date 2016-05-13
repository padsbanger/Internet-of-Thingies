var ds18b20 = require('ds18b20');
var Cylon = require("cylon");

var mongoose = require('mongoose');
var mongoURI = "mongodb://0.0.0.0:27017/temp";
var MongoDB = mongoose.connect(mongoURI).connection;

var id = ''

var tempSchema = mongoose.Schema({
  temp: Number,
  date: { type: Date, default: Date.now }
})

var Temp = mongoose.model('Temp', tempSchema);

MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

function saveToDb(value) {
  var newTemp = new Temp({
    temp: value,
    date: new Date()
  })

  newTemp.save(function(err, log) {
    if(err) {
      console.log(err)
    }
  })
}

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
     led: { driver: 'led', pin: 12 }
   },

   work: function(my) {

     ds18b20.sensors(function(err, ids) {
       if(err) {
         console.log(err)
       } else {
         id = ids[0]
         setInterval(function() {
           ds18b20.temperature(id, function(err, value) {
             saveToDb(value)
             console.log(value)
             if(value > 28) {
               my.led.turnOn();
             } else {
               my.led.turnOff();
             }
           });
         }, 1000 * 60)

       }
     });
    }
  }).start();
