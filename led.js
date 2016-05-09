var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
     led: { driver: 'led', pin: 7 }
   },

   work: function(my) {
      every((1).second(), function() {
        my.led.toggle();
      });
    }
  }).start();
