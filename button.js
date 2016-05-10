var Cylon = require("cylon");

var i = 0;

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
     button: { driver: 'button', pin: 7 },
     yellowLed: { driver: 'led', pin: 12 },
     redLed: { driver: 'led', pin: 18 },
     greenLed: { driver: 'led', pin: 16 }
   },

   work: function(my) {
     my.button.on('push', function() {
       i = i + 1;
       if(i % 2 === 0) {
         my.yellowLed.toggle();
       } else if (i % 3 === 0) {
         my.redLed.toggle();
       } else {
         my.greenLed.toggle();
       }

     });
   }
 }).start();
