import './style.css';



function dateDiffSet() {
    const now = new Date();
    const day = new Date('2023', '0', '7', '18', '20');


    const diff = day - now;
    const days = Math.round((diff / (1000*60*60*24)));


    document.querySelector('.diff-day').innerHTML = `결혼식 ${days}일 전`;
}

document.addEventListener("DOMContentLoaded", function(event) {
    dateDiffSet();

    new ClipboardJS('.btn');

    const char = document.querySelector('.clickable');
    char.addEventListener('mousedown', () => {
        const playerGroup = document.querySelector('.player-group');
        const players = document.querySelectorAll('lottie-player');
        playerGroup.style.display = 'block';
        players[0].addEventListener('complete', () => {
            playerGroup.style.opacity = '0';
            setTimeout(() => {
                playerGroup.remove();
            }, 2000);
        })

        players.forEach((p) => {
            p.play();
        })


        let toggle = false;
        setCharClass(2);

        setInterval(() => {

            if (toggle) setCharClass(3);
            else setCharClass(2);

            toggle = !toggle;
        }, 1000)

        
    })

});


function setCharClass(target) {
    const characters = document.querySelectorAll('.character');
    const PREFIX = 'col character ';
    const SUFFIX = ['man-', 'woman-'];
    characters.forEach((char, index) => {
      char.className = PREFIX + SUFFIX[index] + target;
    });
}
