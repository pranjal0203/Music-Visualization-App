var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;

//Creating Array of objects for song names and other details of songs
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
function fancyTimeFormat(time){
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
          var id = '#song' + position; //Appending the position number of the song with + sing
          $(id).click(function() {
                var audio = document.querySelector('audio');
                var currentSong = audio.src;
                if(currentSong.search(songObj.fileName) != -1) {
                      toggleSong();
                }
                else {
                    audio.src = songObj.fileName;
                    toggleSong();
                    changeCurrentSongDetails(songObj);//For changing the icon of the song
                }
          });
}

//Changing icon of song with other details
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


        changeCurrentSongDetails(songs[0]);//Setting first song by default

        //Filling all the entries of the song and other details in the table
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

} //End of windows loading

//Front page with welcoming the user and opening song gallery then
      $('.welcome-screen button').on('click', function() {
              var name = $('#name-input').val();
              if (name.length > 2) {
                      var message = "Welcome, " + name;
                      $('.main .user-name').text(message);
                      $('.welcome-screen').addClass('hidden');
                      $('.main').removeClass('hidden');
              }
              else {
                      $('#name-input').addClass('error');
                      $('.alert-danger').removeClass('hidden');
              }
             });

//If play icon is clicked
      $('.play-icon').on('click', function() {
              toggleSong();
          });

//If space bar is pressed and will not work when pressed in search bar
          $('body').on('keypress', function(event) {
                      if (event.keyCode == 32 && event.target.tagName != 'INPUT') {
                            toggleSong();
                      }
          });

//Disabling and Abling the toggle button
        $('.fa-repeat').on('click',function() {
                $('.fa-repeat').toggleClass('disabled')
                willLoop = 1 - willLoop;
        });

//Disabling and Abling the shuffle button
        $('.fa-random').on('click',function() {
                $('.fa-random').toggleClass('disabled')
                willShuffle = 1 - willShuffle;
        });

//Event handler for ending the song
          $('audio').on('ended',function(event) {
            $('audio').on('ended',function() {
                    var audio = document.querySelector('audio');
                    if(currentSongNumber < 4) {
                            var nextSongObj = songs[currentSongNumber];
                            audio.src = nextSongObj.fileName;
                            toggleSong();
                            changeCurrentSongDetails(nextSongObj);
                            currentSongNumber = currentSongNumber + 1;
                    }
                    else if(willLoop == 1) {
                            var nextSongObj = songs[0];
                            audio.src = nextSongObj.fileName;
                            toggleSong();
                            changeCurrentSongDetails(nextSongObj);
                            currentSongNumber =  1;
                    }
                    else {
                        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                        audio.currentTime = 0;
                    }
                  });
          });

//Function for jumping to last 5 sec of the song
        function timeJump() {
              var song = document.querySelector('audio')
              song.currentTime = song.duration - 5;
          }

//Function for generating random nextSongNumber from Stackoverflow

      function randomExcluded(start, end, excluded) {
                    var n = excluded
                    while (n == excluded)
                        n = Math.floor((Math.random() * (end-start+1) + start));
                    return n;
      }
//Function for shuffling the song
          $('audio').on('ended',function() {
                    var audio = document.querySelector('audio');
                    if (willShuffle == 1) {
                            var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
                            var nextSongObj = songs[nextSongNumber-1];
                            audio.src = nextSongObj.fileName;
                            toggleSong();
                            changeCurrentSongDetails(nextSongObj);
                            currentSongNumber = nextSongNumber;
              }
              else if(currentSongNumber < 4) {
                      var nextSongObj = songs[currentSongNumber];
                      audio.src = nextSongObj.fileName;
                      toggleSong();
                      changeCurrentSongDetails(nextSongObj);
                      currentSongNumber = currentSongNumber + 1;
              }
              else if(willLoop == 1) {
                      var nextSongObj = songs[0];
                      audio.src = nextSongObj.fileName;
                      toggleSong();
                      changeCurrentSongDetails(nextSongObj);
                      currentSongNumber =  1;
              }
              else {
                      $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                      audio.currentTime = 0;
              }
          });
