import './style.css';



function dateDiffSet() {
    const now = new Date();
    const day = new Date('2023', '0', '7', '18', '20');


    const diff = day - now;
    const days = Math.round((diff / (1000*60*60*24)));


    document.querySelector('.diff-day').innerHTML = `결혼식 ${days}일 전`;
}

function preload(images) {
    for (let img of images) {
        let image = new Image();
        image.src = img;
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    dateDiffSet();

    const clip = new ClipboardJS('.btn');
    clip.on('success', (e) => {

        alert('복사 되었습니다.');
        e.clearSelection();
    })
    preload([
        './images/man_2.png',
        './images/man_3.png',
        './images/woman_2.png',
        './images/woman_3.png',
    ])

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
        setCharClass(3);
        document.querySelector('.remove-when-anim').remove();

        setInterval(() => {
            if (toggle) setCharClass(3);
            else setCharClass(2);
            toggle = !toggle;
        }, 1000)
    })


    // document.querySelectorAll('.copy-btn').forEach((e)=> 
        // e.addEventListener('mousedown', () => {
        //     alert('복사 되었습니다.');
        // })
    // )
});


function setCharClass(target) {
    const characters = document.querySelectorAll('.character');
    const PREFIX = 'col character ';
    const SUFFIX = ['man-', 'woman-'];
    characters.forEach((char, index) => {
      char.className = PREFIX + SUFFIX[index] + target;
    });
}
