// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {
            title: 'Blue',
            duration: '4:26'
        },
        {
            title: 'Green',
            duration: '3:14'
        },
        {
            title: 'Red',
            duration: '5:01'
        },
        {
            title: 'Pink',
            duration: '3:21'
        },
        {
            title: 'Magenta',
            duration: '2:15'
        }
     ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        {
            title: 'Hello, Operator?',
            duration: '1:01'
        },
        {
            title: 'Ring, ring, ring',
            duration: '5:01'
        },
        {
            title: 'Fits in your pocket',
            duration: '3:21'
        },
        {
            title: 'Can you hear me now?',
            duration: '3:14'
        },
        {
            title: 'Wrong phone number',
            duration: '2:15'
        }
     ]
};

// Yet Another Example Album
var albumDesmond = {
    title: 'My Favorite Things',
    artist: 'Seal Desmond',
    label: 'Private Label',
    year: '2008',
    albumArtUrl: 'assets/images/album_covers/06.png',
    songs: [
        {
            title: 'My Headphones',
            duration: '2:30'
        },
        {
            title: 'Jazz In The Dark',
            duration: '8:25'
        },
        {
            title: 'Price Me Up',
            duration: '1:45'
        },
        {
            title: 'Look At Me Now',
            duration: '4:44'
        },
        {
            title: 'This Is My House',
            duration: '3:38'
        }
     ]
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';

    return template;
};

// Select elements that we want to populate with text dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function (album) {

    // Assign values to each part of the album (text, images)
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // Clear contents of album song list container
    albumSongList.innerHTML = '';

    // Build list of songs from album Javascript object
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function () {
    setCurrentAlbum(albumPicasso);

    var findParentByClassName = function (element, targetClass) {
        if (element) {
            var currentParent = element.parentElement;
            while (currentParent.className !== targetClass && currentParent.className !== null) {

                if (currentParent === undefined) {
                    alert("No parent found");
                    return currentParent;
                } else if (currentParent.className != targetClass) {
                    alert("No parent found with that class name");
                }

                currentParent = currentParent.parentElement;
            }
            return currentParent;
        }
    };

    var getSongItem = function (element) {
        switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
        }
    };

    var clickHandler = function (targetElement) {
        var songItem = getSongItem(targetElement);
        if (currentlyPlayingSong === null) {
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
            var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
    };

    // Elements to which we'll be adding listeners
    songListContainer.addEventListener('mouseover', function (event) {
        // #1
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            // Change the content from the number to the play button's HTML
            //event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });

    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function (event) {
            // Revert the content back to the number
            // Selects first child element, which is the song-item-number element
            //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            // #1
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');

            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });

        songRows[i].addEventListener('click', function (event) {
            // Event handler call
            clickHandler(event.target);
        });
    }

    var albums = [albumPicasso, albumMarconi, albumDesmond];
    var index = 1;
    albumImage.addEventListener("click", function (event) {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length) {
            index = 0;
        }
    });
};