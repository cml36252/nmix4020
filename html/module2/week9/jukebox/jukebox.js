// Note: I had Github Copilot help me with some of this, as I wanted to make the spinning functionality work correctly, but couldn't get it to work on my own. 


let currentlyPlaying = null;
let jukeDiv = document.querySelector('#juke');

function player(tune, buttonElement) {
    // Get the parent div of the button
    const parentDiv = buttonElement.parentNode;
    
    // Stop previous spinning animation if any
    if (currentlyPlaying) {
        const previousImg = currentlyPlaying.querySelector('img');
        if (previousImg) {
            previousImg.classList.remove('spinning');
        }
    }
    
    // Clear any existing audio players
    jukeDiv.innerHTML = '';
    
    // Play the new audio
    jukeDiv.innerHTML = `<audio controls autoplay src="${tune}" type="audio/m4a"></audio>`;
    
    // Make sure the juke div is visible
    jukeDiv.style.display = 'block';
    
    // Position the player directly underneath the clicked button
    const buttonRect = buttonElement.getBoundingClientRect();
    jukeDiv.style.position = 'absolute';
    jukeDiv.style.left = buttonRect.left + (buttonRect.width / 2) - (jukeDiv.offsetWidth / 2) + 'px';
    jukeDiv.style.top = buttonRect.bottom + 10 + 'px';
    
    // Get the image in the clicked button and add spinning class
    const img = buttonElement.querySelector('img');
    if (img) {
        img.classList.add('spinning');
    }
    
    // Store reference to currently playing button
    currentlyPlaying = buttonElement;
    
    // Get reference to the audio element
    const audio = jukeDiv.querySelector('audio');
    
    // Handle play/pause to sync with spinning
    audio.addEventListener('play', function() {
        if (currentlyPlaying) {
            const img = currentlyPlaying.querySelector('img');
            if (img) {
                img.classList.add('spinning');
            }
        }
    });
    
    audio.addEventListener('pause', function() {
        if (currentlyPlaying) {
            const img = currentlyPlaying.querySelector('img');
            if (img) {
                img.classList.remove('spinning');
            }
        }
    });
    
    // Remove spinning when audio ends
    audio.onended = function() {
        const playingImg = currentlyPlaying.querySelector('img');
        if (playingImg) {
            playingImg.classList.remove('spinning');
        }
        currentlyPlaying = null;
        jukeDiv.style.display = 'none';
    };
}
