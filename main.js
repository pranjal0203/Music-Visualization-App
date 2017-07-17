//Creating function for toggling the song
function toggleSong(){

    var song = document.querySelector('audio');
    if (song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
        }

        else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
}

//function for converting seconds to minutes
function fancyTimeFormat(time)
    {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

//Creating function for updating the time
function updateCurrentTime(){

  var song = document.querySelector('audio');

  //Removing decimal part with the help of Math.floor()

  var currentTime = Math.floor(song.currentTime);
  currentTime = fancyTimeFormat(currentTime);
  var duration = Math.floor(song.duration);
  duration = fancyTimeFormat(duration);
  $('.time-elapsed').text(currentTime);
  $('.song-duration').text(duration);
}

//Creating function for click of event of song
function addSongNameClickEvent(songObj,position) {
      var id = '#song' + position;
      $(id).click(function() {
      var audio = document.querySelector('audio');
      var currentSong = audio.src;
      if(currentSong.search(songObj.fileName) != -1)
      {
        toggleSong();
      }
      else {
      audio.src = songObj.fileName;
      toggleSong();
      changeCurrentSongDetails(songObj);
      }
      });
}

//Changing icon of song

function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}

//calling function currentTime on window loading and after every 1 sec

window.onload = function(){


    updateCurrentTime();
    setInterval(function() {
      updateCurrentTime();
    },1000);

    //Creating Array of objects for song names and other details

    var songs =  [{
                    'name': 'Yarriyan',
                    'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
                    'album': 'Cocktail',
                    'duration': '6:17',
                   'fileName': 'song1.mp3',
                    'image' : 'song1.jpg'
                 },
                 {
                    'name': 'You Belong With Me',
                    'artist': 'Taylor swift',
                    'album': 'Fearless',
                    'duration': '3:52',
                    'fileName': 'song2.mp3',
                    'image' : 'song2.jpg'
                  },
                  {
                    'name': 'Phir se ud chala',
                    'artist': 'Mohit Chauchan',
                    'album': 'Rockstar',
                    'duration': '4:30',
                    'fileName': 'song3.mp3',
                    'image' : 'song3.jpg'
                  },
                  {
                    'name': 'Teri Meri',
                    'artist': 'Nakash Aziz, Arijit Singh, Rahet Fateh Ali',
                    'album': 'Ae Dil Hai Mushkil',
                    'duration': '5:27',
                    'fileName': 'song4.mp3',
                    'image' : 'song4.jpg'
                  }];

      changeCurrentSongDetails(songs[0]);
      for(var i=0;i<songs.length;i++){
            var obj = songs[i];
            var name = "#song" + (i+1);
            var song = $(name);
            song.find('.song-name').text(obj.name);
            song.find('.song-artist').text(obj.artist);
            song.find('.song-album').text(obj.album);
            song.find('.song-length').text(obj.duration);
            addSongNameClickEvent(obj,i+1)
        }

        //Initializing dataTables
        $('#songs').DataTable({
          paging: false
        });

}

$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});
$('.play-icon').on('click', function() {
    toggleSong();
});
$('body').on('keypress', function(event) {
            if (event.keyCode == 32) {
                toggleSong();
            }
        });
