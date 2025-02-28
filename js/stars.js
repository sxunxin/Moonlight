let constellationIndex = 0; 
let nowStar = 0;
let resizeTimeout; 
let moonMake = 0;
let constellationsCnt = 0;
let prevCompletionIndex = -1;

// 별자리 보정값
let AquariusX = -0.03, AquariusY = -0.1;  
let PiscesX = 0.035, PiscesY = -0.22;
let AriesX = -0.24, AriesY = 0.35;
let TaurusX = 0.38, TaurusY = -0.08;
let GeminiX = -0.45, GeminiY = 0.07;
let CancerX = 0.174, CancerY = -0.01;
let LeoX = -0.13, LeoY = -0.34;
let VirgoX = 0.03, VirgoY = 0.28;
let LibraX = -0.02, LibraY = 0.14;
let ScorpioX = 0.02, ScorpioY = 0.03;
let SagittariusX = -0.02, SagittariusY = -0.2;
let CapricornX = 0.15, CapricornY = 0.11;

const completionIndexes = [10, 22, 26, 37, 53, 60, 69, 82, 90, 105, 126, 136]; 

const constellations = [
    // 물병자리 Aquarius (11개, 1 - 11)
    { x: 0.17 + AquariusX, y: 0.19 + AquariusY }, { x: 0.12 + AquariusX, y: 0.26 + AquariusY }, { x: 0.14 + AquariusX, y: 0.30 + AquariusY }, { x: 0.17 + AquariusX, y: 0.27 + AquariusY }, { x: 0.11 + AquariusX, y: 0.32 + AquariusY },
    { x: 0.09 + AquariusX, y: 0.31 + AquariusY }, { x: 0.085 + AquariusX, y: 0.35 + AquariusY }, { x: 0.11 + AquariusX, y: 0.45 + AquariusY }, { x: 0.13 + AquariusX, y: 0.41 + AquariusY }, { x: 0.16 + AquariusX, y: 0.412 + AquariusY }, 
    { x: 0.19 + AquariusX, y: 0.45 + AquariusY },

    // 물고기자리 Pisces (12개, 12 - 23)
    { x: 0.50 + PiscesX, y: 0.28 + PiscesY }, { x: 0.485 + PiscesX, y: 0.29 + PiscesY }, { x: 0.49 + PiscesX, y: 0.32 + PiscesY }, { x: 0.48 + PiscesX, y: 0.43 + PiscesY }, { x: 0.455 + PiscesX, y: 0.485 + PiscesY },
    { x: 0.52 + PiscesX, y: 0.47 + PiscesY }, { x: 0.55 + PiscesX, y: 0.48 + PiscesY }, { x: 0.60 + PiscesX, y: 0.47 + PiscesY }, { x: 0.616 + PiscesX, y: 0.45 + PiscesY }, { x: 0.632 + PiscesX, y: 0.47 + PiscesY },
    { x: 0.622 + PiscesX, y: 0.50 + PiscesY }, { x: 0.60 + PiscesX, y: 0.50 + PiscesY },

    // 양자리 Aries (4개, 24 - 27)
    { x: 0.4 + AriesX, y: 0.53 + AriesY }, { x: 0.47 + AriesX, y: 0.50 + AriesY }, { x: 0.51 + AriesX, y: 0.52 + AriesY }, { x: 0.515 + AriesX, y: 0.56 + AriesY },

    // 황소자리 Taurus (11개, 28 - 38)
    { x: 0.494 + TaurusX, y: 0.9 + TaurusY }, { x: 0.516 + TaurusX, y: 0.8 + TaurusY }, { x: 0.522 + TaurusX, y: 0.76 + TaurusY }, { x: 0.52 + TaurusX, y: 0.73 + TaurusY }, { x: 0.535 + TaurusX, y: 0.67 + TaurusY },
    { x: 0.54 + TaurusX, y: 0.60 + TaurusY }, { x: 0.5 + TaurusX, y: 0.73 + TaurusY }, { x: 0.502 + TaurusX, y: 0.758 + TaurusY }, { x: 0.49 + TaurusX, y: 0.77 + TaurusY }, { x: 0.47 + TaurusX, y: 0.80 + TaurusY },
    { x: 0.43 + TaurusX, y: 0.87 + TaurusY },

    // 쌍둥이자리 Gemini (16개, 39 - 54)
    { x: 0.5 + GeminiX, y: 0.5 + GeminiY }, { x: 0.505 + GeminiX, y: 0.53 + GeminiY }, { x: 0.507 + GeminiX, y: 0.61 + GeminiY }, { x: 0.52 + GeminiX, y: 0.65 + GeminiY }, { x: 0.54 + GeminiX, y: 0.74 + GeminiY },
    { x: 0.495 + GeminiX, y: 0.666 + GeminiY }, { x: 0.505 + GeminiX, y: 0.74 + GeminiY }, { x: 0.49 + GeminiX, y: 0.545 + GeminiY }, { x: 0.524 + GeminiX, y: 0.546 + GeminiY }, { x: 0.548 + GeminiX, y: 0.548 + GeminiY },
    { x: 0.576 + GeminiX, y: 0.541 + GeminiY }, { x: 0.535 + GeminiX, y: 0.494 + GeminiY }, { x: 0.56 + GeminiX, y: 0.643 + GeminiY }, { x: 0.58 + GeminiX, y: 0.692 + GeminiY }, { x: 0.596 + GeminiX, y: 0.699 + GeminiY },
    { x: 0.56 + GeminiX, y: 0.725 + GeminiY },

    // 게자리 Cancer (7개, 55 - 61)
    { x: 0.503 + CancerX, y: 0.487 + CancerY }, { x: 0.493 + CancerX, y: 0.525 + CancerY }, { x: 0.51 + CancerX, y: 0.54 + CancerY }, { x: 0.513 + CancerX, y: 0.512 + CancerY }, { x: 0.513 + CancerX, y: 0.395 + CancerY },
    { x: 0.463 + CancerX, y: 0.59 + CancerY }, { x: 0.515 + CancerX, y: 0.65 + CancerY },

    // 사자자리 Leo (9개, 62 - 70)
    { x: 0.5 + LeoX, y: 0.5 + LeoY }, { x: 0.444 + LeoX, y: 0.51 + LeoY }, { x: 0.4 + LeoX, y: 0.58 + LeoY }, { x: 0.444 + LeoX, y: 0.565 + LeoY }, { x: 0.52 + LeoX, y: 0.57 + LeoY },
    { x: 0.518 + LeoX, y: 0.532 + LeoY }, { x: 0.5 + LeoX, y: 0.46 + LeoY }, { x: 0.522 + LeoX, y: 0.43 + LeoY }, { x: 0.53 + LeoX, y: 0.45 + LeoY },

    // 처녀자리 Virgo (13개, 71 - 83)
    { x: 0.406 + VirgoX, y: 0.613 + VirgoY }, { x: 0.422 + VirgoX, y: 0.605 + VirgoY }, { x: 0.428 + VirgoX, y: 0.623 + VirgoY }, { x: 0.45 + VirgoX, y: 0.617 + VirgoY }, { x: 0.463 + VirgoX, y: 0.59 + VirgoY },
    { x: 0.49 + VirgoX, y: 0.576 + VirgoY }, { x: 0.51 + VirgoX, y: 0.582 + VirgoY }, { x: 0.536 + VirgoX, y: 0.57 + VirgoY }, { x: 0.482 + VirgoX, y: 0.54 + VirgoY }, { x: 0.485 + VirgoX, y: 0.48 + VirgoY },
    { x: 0.447 + VirgoX, y: 0.56 + VirgoY }, { x: 0.43 + VirgoX, y: 0.547 + VirgoY }, { x: 0.398 + VirgoX, y: 0.558 + VirgoY },

    // 천칭자리 Libra (8개, 84 - 91)
    { x: 0.308 + LibraX, y: 0.51 + LibraY }, { x: 0.314 + LibraX, y: 0.535 + LibraY }, { x: 0.34 + LibraX, y: 0.52 + LibraY }, { x: 0.37 + LibraX, y: 0.47 + LibraY }, { x: 0.40 + LibraX, y: 0.52 + LibraY },
    { x: 0.383 + LibraX, y: 0.61 + LibraY }, { x: 0.335 + LibraX, y: 0.65 + LibraY }, { x: 0.333 + LibraX, y: 0.67 + LibraY },

    // 전갈자리 Scorpio (15개, 92 - 106)
    { x: 0.2 + ScorpioX, y: 0.385 + ScorpioY }, { x: 0.215 + ScorpioX, y: 0.41 + ScorpioY }, { x: 0.195 + ScorpioX, y: 0.42 + ScorpioY }, { x: 0.2 + ScorpioX, y: 0.46 + ScorpioY }, { x: 0.226 + ScorpioX, y: 0.48 + ScorpioY },
    { x: 0.243 + ScorpioX, y: 0.483 + ScorpioY }, { x: 0.253 + ScorpioX, y: 0.45 + ScorpioY }, { x: 0.258 + ScorpioX, y: 0.42 + ScorpioY }, { x: 0.287 + ScorpioX, y: 0.376 + ScorpioY }, { x: 0.313 + ScorpioX, y: 0.363 + ScorpioY },
    { x: 0.343 + ScorpioX, y: 0.36 + ScorpioY }, { x: 0.342 + ScorpioX, y: 0.32 + ScorpioY }, { x: 0.333 + ScorpioX, y: 0.3 + ScorpioY }, { x: 0.337 + ScorpioX, y: 0.4 + ScorpioY }, { x: 0.33 + ScorpioX, y: 0.432 + ScorpioY },

    // 궁수자리 Sagittarius (21개, 107 - 127)
    { x: 0.9 + SagittariusX, y: 0.51 + SagittariusY }, { x: 0.894 + SagittariusX, y: 0.477 + SagittariusY }, { x: 0.91 + SagittariusX, y: 0.43 + SagittariusY }, { x: 0.945 + SagittariusX, y: 0.41 + SagittariusY }, { x: 0.894 + SagittariusX, y: 0.432 + SagittariusY },
    { x: 0.875 + SagittariusX, y: 0.39 + SagittariusY }, { x: 0.883 + SagittariusX, y: 0.337 + SagittariusY }, { x: 0.86 + SagittariusX, y: 0.423 + SagittariusY }, { x: 0.85 + SagittariusX, y: 0.46 + SagittariusY }, { x: 0.84 + SagittariusX, y: 0.442 + SagittariusY },
    { x: 0.848 + SagittariusX, y: 0.422 + SagittariusY }, { x: 0.839 + SagittariusX, y: 0.375 + SagittariusY }, { x: 0.85 + SagittariusX, y: 0.356 + SagittariusY }, { x: 0.83 + SagittariusX, y: 0.37 + SagittariusY }, { x: 0.81 + SagittariusX, y: 0.33 + SagittariusY },
    { x: 0.83 + SagittariusX, y: 0.422 + SagittariusY }, { x: 0.804 + SagittariusX, y: 0.426 + SagittariusY }, { x: 0.778 + SagittariusX, y: 0.465 + SagittariusY }, { x: 0.794 + SagittariusX, y: 0.6 + SagittariusY }, { x: 0.82 + SagittariusX, y: 0.575 + SagittariusY },
    { x: 0.82 + SagittariusX, y: 0.62 + SagittariusY },

    // 염소자리 Capricorn (10개 128 - 137)
    { x: 0.6 + CapricornX, y: 0.6 + CapricornY }, { x: 0.59 + CapricornX, y: 0.63 + CapricornY }, { x: 0.55 + CapricornX, y: 0.65 + CapricornY }, { x: 0.52 + CapricornX, y: 0.643 + CapricornY }, { x: 0.5 + CapricornX, y: 0.646 + CapricornY },
    { x: 0.488 + CapricornX, y: 0.638 + CapricornY }, { x: 0.509 + CapricornX, y: 0.71 + CapricornY }, { x: 0.56 + CapricornX, y: 0.787 + CapricornY }, { x: 0.569 + CapricornX, y: 0.765 + CapricornY }, { x: 0.585 + CapricornX, y: 0.678 + CapricornY },
];

// 별자리 연결 코드 
function getConnectionsForNewStar(newStarIndex) {
    const connections = [];
    newStarIndex++;

    // 물병자리
    if (newStarIndex === 5) { 
        connections.push([2, 5]);
    } 
    // 물고기자리
    else if (newStarIndex === 12) { 
        connections.push([12, 12]);
    } else if (newStarIndex === 14) {
        connections.push([13, 14]);
        connections.push([12, 14]);
    } else if (newStarIndex === 23) {
        connections.push([22, 23]);
        connections.push([23, 19]);
    } 
    // 양자리
    else if (newStarIndex === 24) {
        connections.push([24, 24]);
    }
    // 황소자리
    else if (newStarIndex === 28) {
        connections.push([28, 28]);
    } else if (newStarIndex === 34) {
        connections.push([31, 34]);
    }
    // 쌍둥이자리
    else if (newStarIndex === 39) {
        connections.push([39, 39]);
    } else if (newStarIndex === 44) {
        connections.push([41, 44]);
    } else if (newStarIndex === 46) {
        connections.push([40, 46]);
    } else if (newStarIndex === 47) {
        connections.push([40, 47]);
    } else if (newStarIndex === 50) {
        connections.push([48, 50]);
    } else if (newStarIndex === 51) {
        connections.push([48, 51]);
    } else if (newStarIndex === 54) {
        connections.push([51, 54]);
    }
    // 게자리
    else if (newStarIndex === 55) {
        connections.push([55, 55]);
    } else if (newStarIndex === 58) {
        connections.push([57, 58]);
        connections.push([58, 55]);
    } else if (newStarIndex === 59) {
        connections.push([55, 59]);
    } else if (newStarIndex === 60) {
        connections.push([56, 60]);
    } else if (newStarIndex === 61) {
        connections.push([57, 61]);
    }
    // 사자자리
    else if (newStarIndex === 62) {
        connections.push([62, 62]);
    } else if (newStarIndex === 65) {
        connections.push([64, 65]);
        connections.push([63, 65]);
    } else if (newStarIndex === 67) {
        connections.push([66, 67]);
        connections.push([67, 62]);
    } else if (newStarIndex === 68) {
        connections.push([62, 68]);
    } 
    // 처녀자리
    else if (newStarIndex === 71) {
        connections.push([71, 71]);
    } else if (newStarIndex === 79) {
        connections.push([76, 79]);
    } else if (newStarIndex === 81) {
        connections.push([79, 81]);
        connections.push([74, 81]);
    }
    // 천칭자리
    else if (newStarIndex === 84) {
        connections.push([84, 84]);
    } else if (newStarIndex === 89) {
        connections.push([88, 89]);
        connections.push([87, 89]);
    } 
    // 전갈자리
    else if (newStarIndex === 92) {
        connections.push([92, 92]);
    } else if (newStarIndex === 105) {
        connections.push([102, 105]);
    } 
    // 궁수자리 
    else if (newStarIndex === 107) {
        connections.push([107, 107]);
    } else if (newStarIndex === 111) {
        connections.push([109, 111]);
        connections.push([111, 108]);
    } else if (newStarIndex === 114) {
        connections.push([112, 114]);
        connections.push([114, 111]);
    } else if (newStarIndex === 115) {
        connections.push([114, 115]);
        connections.push([115, 108]);
    } else if (newStarIndex === 117) {
        connections.push([116, 117]);
        connections.push([117, 114]);
    } else if (newStarIndex === 120) {
        connections.push([118, 120]);
    } else if (newStarIndex === 122) {
        connections.push([116, 122]);
    } else if (newStarIndex === 127) {
        connections.push([125, 127]);
    } 
    // 염소자리 
    else if (newStarIndex === 128) {
        connections.push([128, 128]);
    } else if (newStarIndex === 137) {
        connections.push([136, 137]);
        connections.push([129, 137]);
    } else if (newStarIndex > 137) {
        connections.push([137, 137]);
    }
    // 기본 연결 
    else {
        connections.push([newStarIndex - 1, newStarIndex]);
    }
    return connections;
}

function addStars(starCount) {
    const sky = document.querySelector('.sky'); 
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    // 큰 별 추가 
    if (starCount >= 5 && constellationIndex < 137) {
        const bigStar = document.createElement('div');
        bigStar.classList.add('big-star');
        bigStar.style.position = 'absolute';

        bigStar.style.left = `${skyWidth / 2 - 10}px`;
        bigStar.style.top = `${skyHeight / 2 - 10}px`;

        bigStar.style.width = '6px'; 
        bigStar.style.height = '6px';
        bigStar.style.backgroundColor = 'white';
        bigStar.style.borderRadius = '50%';

        bigStar.style.boxShadow = '0 0 15px 3px rgba(255, 255, 255, 0.8)';
        bigStar.style.transition = 'left 1s ease-out, top 1s ease-out';

        sky.appendChild(bigStar);

        setTimeout(() => {
            const position = constellations[constellationIndex++];

            const newX = position.x * skyWidth;
            const newY = position.y * skyHeight;

            bigStar.style.left = `${newX}px`;
            bigStar.style.top = `${newY}px`;

            setTimeout(drawOneLineBetweenStars, 1000);

        }, 500);


         if (completionIndexes.includes(constellationIndex)) {
            const startIndex = prevCompletionIndex + 1; 
            const endIndex = constellationIndex; 

            prevCompletionIndex = constellationIndex; 
            setTimeout(() => glowStarsInRange(startIndex, endIndex), 2200);
        }

        starCount -= 1;

        if (constellationIndex >= 136) {
            setTimeout(createMoon, 3000);
        }
    }

    // 작은 별 추가 
    for (let i = 0; i < starCount; i++) {
        if (nowStar > 1600) break;
        nowStar++;
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'absolute';

        star.style.left = `${skyWidth / 2 - 10}px`;
        star.style.top = `${skyHeight / 2 - 10}px`;

        const starSize = Math.random() * 3 + 1; 
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.transition = 'left 1s ease-out, top 1s ease-out';

        sky.appendChild(star);

        setTimeout(() => {
            const randomX = Math.random() * skyWidth;
            const randomY = Math.random() * skyHeight;

            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;

            const randomDuration = Math.random() * 7 + 3;
            star.style.animationDuration = `${randomDuration}s`;
        }, 500);
    }
}

// 창 크기 변경 시 위치 업데이트
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout); 
    resizeTimeout = setTimeout(() => {
        const sky = document.querySelector('.sky');
        const skyWidth = sky.offsetWidth;
        const skyHeight = sky.offsetHeight;

        const radius = Math.min(skyWidth, skyHeight) * 0.15; 

        const MoonStars = document.querySelectorAll('.moon-star');
        
        MoonStars.forEach((MoonStar, index) => {
            const angleStep = (2 * Math.PI) / 12; 
            const angle = index * angleStep;
            const centerX = skyWidth / 2;
            const centerY = skyHeight / 2;

            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            MoonStar.style.left = `${x - 4.5}px`; 
            MoonStar.style.top = `${y - 4.5}px`;
        });

        const bigStars = document.querySelectorAll('.big-star');
        bigStars.forEach((bigStar, index) => {
            const position = constellations[index % constellations.length];
            const newX = position.x * skyWidth;
            const newY = position.y * skyHeight;

            bigStar.style.left = `${newX}px`;
            bigStar.style.top = `${newY}px`;
        });

        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const randomX = Math.random() * skyWidth;
            const randomY = Math.random() * skyHeight;
            
            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;
        });

        const lines = document.querySelectorAll('.constellation-line');
        lines.forEach(line => {
            line.remove();
        });

        const moonLines = document.querySelectorAll('.moon-constellation-line');
        moonLines.forEach(line => line.remove());

        setTimeout(drawLinesBetweenStars, 1000);
        setTimeout(drawLinesBetweenMoonStars, 1000);

    }, 400); 
});

// 큰 별 연결
function drawOneLineBetweenStars() {
    const sky = document.querySelector('.sky');
    if (constellationIndex < 2) return;

    const stars = document.querySelectorAll('.big-star');
    const newStarIndex = stars.length - 1; 
    const connections = getConnectionsForNewStar(newStarIndex); 

    connections.forEach(connection => {
        const startStarIndex = connection[0];
        const endStarIndex = connection[1];  

        const startStar = stars[startStarIndex - 1]; 
        const endStar = stars[endStarIndex - 1];    

        if (startStar && endStar) {
            const line = document.createElement('div');
            line.classList.add('constellation-line');
            line.style.position = 'absolute';
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
            line.style.height = '2px';
            line.style.transformOrigin = 'left center';

            const x1 = parseFloat(startStar.style.left) + 4;
            const y1 = parseFloat(startStar.style.top) + 4;
            const x2 = parseFloat(endStar.style.left) + 4;
            const y2 = parseFloat(endStar.style.top) + 4;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            line.style.width = `0px`;
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transition = 'width 1s ease-out'; 

            sky.appendChild(line);

            setTimeout(() => {
                line.style.width = `${distance}px`;
            }, 100);
        }
    });
}

// 별들 다시 연결
function drawLinesBetweenStars() {
    const sky = document.querySelector('.sky');
    const stars = document.querySelectorAll('.big-star');
    const connections = []; 

    const lines = document.querySelectorAll('.constellation-line');
    lines.forEach(line => {
        line.remove();
    });

    for (let i = 0; i < stars.length; i++) {
        const newConnections = getConnectionsForNewStar(i); 
        connections.push(...newConnections);  
    }

    connections.forEach(connection => {
        const startStarIndex = connection[0]; 
        const endStarIndex = connection[1];   

        const startStar = stars[startStarIndex - 1]; 
        const endStar = stars[endStarIndex - 1]; 

        if (startStar && endStar) {
            const line = document.createElement('div');
            line.classList.add('constellation-line');
            line.style.position = 'absolute';
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
            line.style.height = '2px';
            line.style.transformOrigin = 'left center';

            const x1 = parseFloat(startStar.style.left) + 4;
            const y1 = parseFloat(startStar.style.top) + 4;
            const x2 = parseFloat(endStar.style.left) + 4;
            const y2 = parseFloat(endStar.style.top) + 4;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            line.style.width = `0px`; 
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transition = 'width 1s ease-out'; 

            sky.appendChild(line);

            setTimeout(() => {
                line.style.width = `${distance}px`;
            }, 100);
        }
    });
}

// 달 만들기 
function createMoon() {
    moonMake = 1;

    const sky = document.querySelector('.sky');
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    const centerX = skyWidth / 2;
    const centerY = skyHeight / 2;
    const radius = 120;
    const numPoints = 12;
    const angleStep = (2 * Math.PI) / numPoints;

    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push({ x, y });
    }

    points.forEach((point, index) => {
        setTimeout(() => {
            const MoonStar = document.createElement('div');
            MoonStar.classList.add('moon-star');
            MoonStar.style.position = 'absolute';
            MoonStar.style.width = '9px';
            MoonStar.style.height = '9px';
            MoonStar.style.backgroundColor = 'white';
            MoonStar.style.borderRadius = '50%';
            MoonStar.style.boxShadow = '0 0 15px 3px rgba(255, 255, 255, 0.8)';
            MoonStar.style.left = `${centerX - 4.5}px`;
            MoonStar.style.top = `${centerY - 4.5}px`;
            MoonStar.style.transition = 'left 1s ease-out, top 1s ease-out';
            sky.appendChild(MoonStar);

            setTimeout(() => {
                MoonStar.style.left = `${point.x - 4.5}px`;
                MoonStar.style.top = `${point.y - 4.5}px`;
            }, 500);

            nowStar -= 10;
            addStars(10); 

            if (index === numPoints - 1) {
                setTimeout(drawLinesBetweenMoonStars, 2000);
            }
        }, index * 400);
    });

    setTimeout(showLight, 7000);
}

// 달빛 보이기 
function showLight() {
    const light = document.querySelector('.center-light');
    light.style.opacity = '1'; 
}

// 달의 별들 연결
function drawLinesBetweenMoonStars() {
    const sky = document.querySelector('.sky');
    const moonStars = document.querySelectorAll('.moon-star');
    const moonLines = document.querySelectorAll('.moon-constellation-line');
    moonLines.forEach(line => line.remove());

    for (let i = 0; i < moonStars.length; i++) {
        for (let j = i + 1; j < moonStars.length; j++) {
            const startStar = moonStars[i];
            const endStar = moonStars[j];

            const x1 = parseFloat(startStar.style.left) + 4.5;
            const y1 = parseFloat(startStar.style.top) + 4.5;
            const x2 = parseFloat(endStar.style.left) + 4.5;
            const y2 = parseFloat(endStar.style.top) + 4.5;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            const line = document.createElement('div');
            line.classList.add('moon-constellation-line');
            line.style.position = 'absolute';
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.44)';
            line.style.height = '1px';
            line.style.transformOrigin = 'left center';
            line.style.width = '0px'; 

            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transition = 'width 1s ease-out'; 

            sky.appendChild(line);

            setTimeout(() => {
                line.style.width = `${distance}px`;
            }, 100);
        }
    }

    if (moonMake === 1) {
        addStarsForMoon(400);
        moonMake = 0;
    }
}

// 달의 별들 생성 
function addStarsForMoon(starCount) {
    const sky = document.querySelector('.sky');
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    const centerX = skyWidth / 2;
    const centerY = skyHeight / 2;
    const moonRadius = 260;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'absolute';

        star.style.left = `${skyWidth / 2 - 10}px`;
        star.style.top = `${skyHeight / 2 - 10}px`;

        const starSize = Math.random() * 3 + 1;
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.transition = 'left 1s ease-out, top 1s ease-out';

        sky.appendChild(star);

        setTimeout(() => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * moonRadius + 100;
            const x = centerX + distance * Math.cos(angle);
            const y = centerY + distance * Math.sin(angle);
            
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            const randomDuration = Math.random() * 7 + 3;
            star.style.animationDuration = `${randomDuration}s`;

        }, Math.random() * 200);
    }
}

// 별자리 전부 완성 
function addConstellations() {
    if (constellationIndex > 136) return;

    const sky = document.querySelector('.sky');
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    for (var i = constellationIndex; i < 137; i++) {

        const bigStar = document.createElement('div');
        bigStar.classList.add('big-star');
        bigStar.style.position = 'absolute';
        bigStar.style.left = `${skyWidth / 2 - 10}px`;
        bigStar.style.top = `${skyHeight / 2 - 10}px`;
        bigStar.style.width = '6px'; 
        bigStar.style.height = '6px';
        bigStar.style.backgroundColor = 'white';
        bigStar.style.borderRadius = '50%';

        bigStar.style.boxShadow = '0 0 15px 3px rgba(255, 255, 255, 0.8)'; 
        bigStar.style.transition = 'left 1s ease-out, top 1s ease-out';

        sky.appendChild(bigStar);

        const position = constellations[constellationIndex++];

        const newX = position.x * skyWidth;
        const newY = position.y * skyHeight;

        bigStar.style.left = `${newX}px`;
        bigStar.style.top = `${newY}px`;
    }

    const lines = document.querySelectorAll('.constellation-line');
    lines.forEach(line => {
        line.remove();
    });
    
    addStars(800);
    drawLinesBetweenStars();
    animateStarsSequentially();
    setTimeout(createMoon, 2000);
}

function animateStarsSequentially() {
    const stars = document.querySelectorAll('.big-star'); 
    constellationIndex = 0;

    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.animation = "glow-all 1.5s forwards 1"; 
            showConstellationName(constellationIndex++);
        }, index * 60); 
    });
}

// 별자리 빛나기 
function glowStarsInRange(startIndex, endIndex) {
    const stars = document.querySelectorAll('.big-star');

    stars.forEach((star, index) => {
        if (index >= startIndex && index <= endIndex) {
            setTimeout(() => {
                star.style.animation = "glow 0.6s ease-in-out";

                if (index === endIndex) {
                    setTimeout(() => {
                        for (let i = startIndex; i <= endIndex; i++) {
                            stars[i].style.animation = "glow-all 1.5s forwards"; 
                        }
                    }, 600);
                } else {
                    setTimeout(() => star.style.animation = "", 600);
                }
            }, (index - startIndex) * 200);
        }
    });
    showConstellationName(constellationsCnt++);
}

// 별자리가 완성시 이름 생성 
function showConstellationName(constellationIndex) {
    const sky = document.querySelector('.sky'); 
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    const constellationNames = [
        'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 
        'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'
    ];

    const customCoordinates = [
        { x: 0.09, y: 0.23 },   // Aquarius
        { x: 0.55, y: 0.17 },  // Pisces
        { x: 0.2, y: 0.88 },   // Aries
        { x: 0.842, y: 0.57 },   // Taurus
        { x: 0.12, y: 0.64 },   // Gemini
        { x: 0.69, y: 0.53 },   // Cancer
        { x: 0.32, y: 0.1 },  // Leo
        { x: 0.51, y: 0.9 },    // Virgo
        { x: 0.31, y: 0.69 },   // Libra
        { x: 0.233, y: 0.35 },    // Scorpio
        { x: 0.83, y: 0.35 },   // Sagittarius
        { x: 0.733, y: 0.85 }     // Capricorn
    ];
    
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('constellation-name');
    nameDiv.textContent = constellationNames[constellationIndex];

    const position = customCoordinates[constellationIndex]; 
    const newX = position.x * skyWidth;
    const newY = position.y * skyHeight;

    nameDiv.style.left = `${newX}px`;
    nameDiv.style.top = `${newY}px`;

    sky.appendChild(nameDiv);

    setTimeout(() => {
        nameDiv.style.opacity = '1';
    }, 100); 

    setTimeout(() => {
        nameDiv.style.opacity = '0';
    }, 5000); 
}
