var ViewerView = Backbone.View.extend({
    template: _.template($('#viewer-pane').html()),
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        this.createPlayer();
        return this;
    },
    createPlayer: function() {
        var tag = document.createElement('script');
        var self = this;
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        onYouTubeIframeAPIReady = function() {
            self.player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: 'ZMrWF9d5Vbw',
                playerVars: { 'controls': 0 },
                events: {
                    'onReady': onPlayerReady.bind(self),
                    'onStateChange': onPlayerStateChange.bind(self)
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        onPlayerReady = function(event) {
            this.player.setPlaybackRate(1.5)
            event.target.playVideo();
        }
 
        // 5. The API calls this function when the player's state changes.
        onPlayerStateChange = function(event) {
            document.getElementById('player').blur();
            $('#player-controls').html(parseInt(this.getCurrentTime()));
        }  
    },
    play: function() {
        this.player.playVideo();
    },
    pause: function() {
        this.player.pauseVideo();
    },
    stop: function() {
        this.player.stopVideo();
    },
    seekTo: function(seconds) {
        this.player.seekTo(seconds);
    },
    getCurrentTime: function() {
        return this.player.getCurrentTime();
    },
    goBack: function(seconds) {
        var currentTime = this.getCurrentTime();
        this.seekTo(currentTime - seconds);
    },
    goForward: function(seconds) {
        var currentTime = this.getCurrentTime();
        this.seekTo(currentTime + seconds);
    },
    toggle: function() {
        var playerState = this.player.getPlayerState();
        
        if(playerState === YT.PlayerState.ENDED ||
            playerState === YT.PlayerState.PAUSED ||
            playerState === YT.PlayerState.BUFFERING ||
            playerState === YT.PlayerState.CUED ||
            playerState === -1) {
            this.play();
        } else {
            this.pause();
        }
    }
});

