import './style.css';
import 'photoswipe/style.css';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

function dateDiffSet() {
    const now = new Date();
    const day = new Date('2023', '0', '7', '18', '20');


    const diff = now - day;
    const days = Math.round((diff / (1000*60*60*24)));


    document.querySelector('.diff-day').innerHTML = `결혼식 ${days}일 후`;
}

function preload(images) {
    for (let img of images) {
        let image = new Image();
        image.src = img;
    }
}


let played = false;
let isAudio = false;


const galleryImages = [
    {
        w: 1440,
        h: 1111,
        src: '/IMG_5983.jpg'
    },
    {
        w: 960,
        h: 1440,
        src: '/IMG_6028.jpg'
    },
    {
        w: 960,
        h: 1345,
        src: '/IMG_6492.jpg'
    },
    {
        w: 960,
        h: 1440,
        src: '/IMG_6088.jpg'
    }, 
    {
        w: 960,
        h: 1440,
        src: '/IMG_6100.jpg'
    }, 
    {
        w: 960,
        h: 1285,
        src: '/IMG_6068.jpg'
    },
    {
        w: 1440,
        h: 960,
        src: '/IMG_6493.jpg'
    },
    {
        w: 960,
        h: 1440,
        src: '/IMG_6204.jpg'
    },
    {
        w: 960,
        h: 1440,
        src: '/IMG_6268.jpg',
        isBottom: true,
    },
    {
        w: 901,
        h: 1352,
        src: '/IMG_6290.jpg'
    },
    {
        w: 1432,
        h: 925,
        src: '/IMG_6330.jpg'
    },
    {
        w: 1399,
        h: 913,
        src: '/IMG_6311.jpg'
    },
]

document.addEventListener("DOMContentLoaded", function(event) {
    dateDiffSet();


    const gallery = document.querySelector('.grid-container');
    galleryImages.forEach((val, idx) => {
        const a = document.createElement('a');
        const src = `./images/album/${val.src}`;
        a.setAttribute('data-pswp-width', val.w);
        a.setAttribute('data-pswp-height', val.h);
        a.href = src;
        a.target = "_blank";

        a.style = `background-image: url(${src})`;
        if (val.isBottom) a.style.backgroundPosition = 'bottom';
        a.className = 'cover-image';

        gallery.appendChild(a);

    })

    const lightbox = new PhotoSwipeLightbox({
        gallery: ".grid-container",
        children: "a",
        pswpModule: () => import("photoswipe"),
    });
    lightbox.init();


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


    const audioClip = document.querySelector('#audioClip');
    audioClip.volume = 0.1;


    const audioBtn = document.querySelector('#footer-play-btn');
    audioBtn.addEventListener('click', () => {
        startAnimation();
        const audioClip = document.querySelector('#audioClip');
        const audioClipIcon = document.querySelector('#audioClipIcon');
        if (!isAudio) {
            audioClip.play();
            audioClipIcon.className = "bi bi-pause-fill";
        } 
        else {
            audioClip.pause();
            audioClipIcon.className = "bi bi-play-fill";
        } 


        isAudio = !isAudio;
    })

    const char = document.querySelector('.clickable');
    char.addEventListener('mousedown', () => {
        startAnimation();

        // const audioClip = document.querySelector('#audioClip');
        // audioClip.play();
        // const audioClipIcon = document.querySelector('#audioClipIcon');
        // audioClipIcon.className = "bi bi-pause-fill"
        // isAudio = true;
    })
});


function startAnimation() {
    if ( played) return;
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
    played = true;

    setInterval(() => {
        if (toggle) setCharClass(3);
        else setCharClass(2);
        toggle = !toggle;
    }, 1000)
}


function setCharClass(target) {
    const characters = document.querySelectorAll('.character');
    const PREFIX = 'col character ';
    const SUFFIX = ['man-', 'woman-'];
    characters.forEach((char, index) => {
      char.className = PREFIX + SUFFIX[index] + target;
    });
}
