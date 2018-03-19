var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
const opn = require('opn'); 
var cmd=require('node-cmd');

let last_movement = 0.0;
let last_movement_time = Date.now();
// Initialize the accelerometer.
accel.on('ready', function () {
// Stream accelerometer data

accel.setOutputRate(1.56, function rateSet(){
  accel.setScaleRange(8,function scaleSet(){

    accel.on('data', function (xyz) {
      
      if (last_movement !== xyz[0].toFixed(1)) { // if someone has moved, reset last movement and last movement time
        last_movement = xyz[0].toFixed(1);
        last_movement_time = Date.now();
        console.log("Congrats you're moving!")
        // applause(); 
      } else {
        console.log("Being lazy")
        
        let minutes = ((Date.now() - last_movement_time)/1000) / 60;
        if (minutes > .1) {
          console.log('Move bitch!');
            // cmd.run(
            //   `open https://www.youtube.com/watch?v=Ig0TvCDUch8`,
            //   function(err, data, stderr){
            //     if (!err) {
            //         console.log('test', data)
            //     } else {
            //         console.log('error', err)
            //     }
            //   }
            // );
          //  opn('https://www.youtube.com/watch?v=Ig0TvCDUch8')
          //   .then((cp) => {
          //   console.log("child process"); 
          // }) 
          // require("openurl").open("https://www.youtube.com/watch?v=Ig0TvCDUch8")
        }
      }
    })
  })
})
});

function applause() {
  var sound = new Howl({
    src: ['applause3.mp3']
  });
  
  sound.play();
}

function boo() {
  // var sound = new Howl({
  //   src: ['boohiss.mp3']
  // });
  // sound.play();
  opn("https://www.youtube.com/watch?v=Ig0TvCDUch8");
}


accel.on('error', function(err){
 console.log('Error:', err);
});