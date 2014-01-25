(function ($) {
    //Backbone Model to each song from every genre
    var Song = Backbone.Model.extend({
        defaults: function (){
        songname: ' ' 
        artist: ' '
        length: ' ' 
        artwork: ' ' 
        genre: ' '

        }
    });

    // list of preferred songs
    var prefSongList = Backbone.Collection.extend({
        model: Song, 
        url: '#'           // here because "RESTful" nature of backbone
    });
    // list of hated songs
    var hateSongList = Backbone.Collection.extend({
        model: Song, 
        url: '#'           // here because "RESTful" nature of backbone
    });

    var likes = new prefSongList(); 
    var hates = new hateSongList(); 


    function songFunc(songname, artist, length, artwork, genre){
        console.log('hello world')
        var song = new Song({songname: songname, artist: artist,
            length: length, artwork: artwork, genre: genre}); 

        $('#like').on('click', function () {
            likes.add(song);
        });


         $('#hate').on('click', function () {
            hates.add(song); 
            console.log('in next song');
            getGenre();
            console.log(hates.toJSON());

        }); 


        console.log($('#hate'));


}

var client_id = 'ba3b87fec8ae6c8a3b2192aeb474d414';
     // initialize client with app credentials
function do_login(){
    console.log("what?")
    SC.initialize({
       client_id: 'ba3b87fec8ae6c8a3b2192aeb474d414',
        redirect_uri: 'http://localhost:8000/callback.html'
    });
    //initiate auth popup
    SC.connect(function() {
        console.log("connected")
        SC.get('/me', function(me) { 
            alert('Hello, ' + me.username); 
        });
    });
        getGenre(); 
}



function getGenre(){
    var genres = ["Classical", "Country", "Dubstep", "Electronic", "Hip Hop", "House", 
        "Jazz", "Metal", "Pop", "R&B", "Reggae", "Rock", "Techno"];

    var random = Math.floor(Math.random() * genres.length);

    playTrack(genres[random]); 


}

$(document).ready(function () {    
    $('#soundcloudbtn').on('click', do_login) ;
});


function playTrack(genre){
    console.log(genre);     
    SC.get('/tracks', { genre: genre, bpm: { from: 120 } }, function(tracks) {
        var random = Math.floor(Math.random() * 49);
        console.log(tracks); 
        var length = tracks[random].duration; 
        var artist = tracks[random].user.username; 
        var songname = tracks[random].title; 
        var art = tracks[random].artwrok_url; 
        songFunc(songname, artist, length, art, genre)
        var track_url = tracks[random].permalink_url;
        SC.oEmbed(track_url, {auto_play: true, color: "ff0066"},
            document.getElementById("target"));
        }); 

}

})(jQuery); 
