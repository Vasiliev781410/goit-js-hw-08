import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
 
const player = new Player('vimeo-player', {
    id: 19231868,
    width: 640
});

const onPlay = function(data) {  
   
};


const saveCurrentTime = function(data) {    
    localStorage.setItem("videoplayer-current-time", data.seconds);   
};

player.on('play', onPlay);

player.on('timeupdate', throttle(saveCurrentTime,1000));


player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});



