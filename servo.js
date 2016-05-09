var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
      servo: { driver: 'continuous-servo', pin: 7 }
   },

   work: function(my) {
      var clockwise = true;

      my.servo.clockwise();

      every((1).second(), function() {
        if (clockwise) {
          my.servo.counterClockwise();
          clockwise = false;
        } else {
          my.servo.clockwise();
          clockwise = true;
        }
      });
    }
  }).start();
