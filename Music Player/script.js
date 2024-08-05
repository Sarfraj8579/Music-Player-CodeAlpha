document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progress = document.getElementById('progress');
    const currentTimeElem = document.getElementById('current-time');
    const totalTimeElem = document.getElementById('total-time');
    const cover = document.getElementById('cover');
    const songTitleElem = document.getElementById('song-title');
    const artistElem = document.getElementById('artist');

    let isPlaying = false;

    // Example songs
    const songs = [
        { src: 'Audio/song1.m4a', cover: 'images/image1.jpg', title: 'Aam Jahe Munde', artist: ' Parmish Verma, Pardhaan' },
        { src: 'Audio/song2.m4a', cover: 'images/image2.jpg', title: 'Bandeya Rey Bandeya', artist: 'Arijit Singh, Asees Kaur' },
        { src: 'Audio/song3.m4a', cover: 'images/image3.jpg', title: 'Kar Har Maidaan Fateh (कर हर मैदान फतेह)', artist: 'Shreya Ghoshal, Sukhwinder Singh' },
        { src: 'Audio/song4.m4a', cover: 'images/image4.jpg', title: 'Tir Te Taj ', artist: 'Manmohan Waris, Kamal Heer, Sangtar' },
        { src: 'Audio/song5.m4a', cover: 'images/image5.jpg', title: 'Aarambh Hai Prachand', artist: 'Piyush Mishra' },
    ];

    let currentSongIndex = 0;

    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        cover.src = song.cover;
        songTitleElem.textContent = song.title;
        artistElem.textContent = song.artist;
    }

    function updateProgress() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        progress.value = (currentTime / duration) * 100;
        currentTimeElem.textContent = formatTime(currentTime);
        totalTimeElem.textContent = formatTime(duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playButton.textContent = '▶';
        } else {
            audio.play();
            playButton.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });

    progress.addEventListener('input', () => {
        const value = progress.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    audio.addEventListener('timeupdate', updateProgress);

    loadSong(currentSongIndex);
});
