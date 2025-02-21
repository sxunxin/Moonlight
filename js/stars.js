let constellationIndex = 0; // 현재 양자리에서 몇 번째 별인지 추적
let nowStar = 0;

const constellationPositions = [
    // 양자리 (Aries) - 오른쪽 상단
    { x: 0.8, y: 0.1 }, { x: 0.85, y: 0.1 }, { x: 0.9, y: 0.1 }, { x: 0.8, y: 0.15 },
    
    // 황소자리 (Taurus) - 오른쪽 중간
    { x: 0.8, y: 0.3 }, { x: 0.85, y: 0.3 }, { x: 0.9, y: 0.3 }, { x: 0.8, y: 0.35 },
    
    // 쌍둥이자리 (Gemini) - 오른쪽 하단
    { x: 0.8, y: 0.5 }, { x: 0.85, y: 0.5 }, { x: 0.9, y: 0.5 }, { x: 0.8, y: 0.55 },
    
    // 게자리 (Cancer) - 왼쪽 상단
    { x: 0.1, y: 0.1 }, { x: 0.15, y: 0.1 }, { x: 0.2, y: 0.1 }, { x: 0.1, y: 0.15 },
    
    // 사자자리 (Leo) - 왼쪽 중간
    { x: 0.1, y: 0.3 }, { x: 0.15, y: 0.3 }, { x: 0.2, y: 0.3 }, { x: 0.1, y: 0.35 },
    
    // 처녀자리 (Virgo) - 왼쪽 하단
    { x: 0.1, y: 0.5 }, { x: 0.15, y: 0.5 }, { x: 0.2, y: 0.5 }, { x: 0.1, y: 0.55 },

    // 천칭자리 (Libra) - 중앙 상단
    { x: 0.5, y: 0.1 }, { x: 0.55, y: 0.1 }, { x: 0.6, y: 0.1 }, { x: 0.5, y: 0.15 },
    
    // 전갈자리 (Scorpio) - 중앙 중간
    { x: 0.5, y: 0.3 }, { x: 0.55, y: 0.3 }, { x: 0.6, y: 0.3 }, { x: 0.5, y: 0.35 },
    
    // 사수자리 (Sagittarius) - 중앙 하단
    { x: 0.5, y: 0.5 }, { x: 0.55, y: 0.5 }, { x: 0.6, y: 0.5 }, { x: 0.5, y: 0.55 },
    
    // 염소자리 (Capricorn) - 왼쪽 하단 (아래쪽)
    { x: 0.1, y: 0.7 }, { x: 0.15, y: 0.7 }, { x: 0.2, y: 0.7 }, { x: 0.1, y: 0.75 },

    // 물병자리 (Aquarius) - 중앙 상단
    { x: 0.5, y: 0.7 }, { x: 0.55, y: 0.7 }, { x: 0.6, y: 0.7 }, { x: 0.5, y: 0.75 },
    
    // 물고기자리 (Pisces) - 오른쪽 하단 (아래쪽)
    { x: 0.8, y: 0.7 }, { x: 0.85, y: 0.7 }, { x: 0.9, y: 0.7 }, { x: 0.8, y: 0.75 }
];

function addStars(starCount) {
    const sky = document.querySelector('.sky'); // 밤하늘 영역
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    if (starCount >= 10) {
        // ⭐ 큰 별 1개 추가 (10개를 채웠을 때)
        const bigStar = document.createElement('div');
        bigStar.classList.add('big-star');
        bigStar.style.position = 'absolute';

        // 처음엔 가운데 위치
        bigStar.style.left = `${skyWidth / 2 - 10}px`;
        bigStar.style.top = `${skyHeight / 2 - 10}px`;

        // 큰 별 스타일
        bigStar.style.width = '9px'; // 더 큼
        bigStar.style.height = '9px';
        bigStar.style.backgroundColor = 'white';
        bigStar.style.borderRadius = '50%';

        // ✨ 밝은 효과를 위한 box-shadow 추가
        bigStar.style.boxShadow = '0 0 15px 3px rgba(255, 255, 255, 0.8)'; // 흰색 발광 효과

        // 부드러운 이동을 위한 transition
        bigStar.style.transition = 'left 1s ease-out, top 1s ease-out';

        // 밤하늘에 추가
        sky.appendChild(bigStar);

        // 0.5초 후 랜덤 위치로 이동
        setTimeout(() => {
            const position = constellationPositions[constellationIndex];

            // 별을 해당 좌표로 이동
            const newX = position.x * skyWidth;
            const newY = position.y * skyHeight;

            bigStar.style.left = `${newX}px`;
            bigStar.style.top = `${newY}px`;

            // 3초 ~ 10초 랜덤 애니메이션 지속 시간
            const randomDuration = Math.random() * 7 + 3;
            bigStar.style.animationDuration = `${randomDuration}s`;

            // 다음 별로 인덱스를 증가시킴
            constellationIndex = (constellationIndex + 1) % constellationPositions.length;

        }, 500);

        // 작은 별 개수는 (starCount - 10)
        starCount -= 10;
    }

    // ✨ 작은 별 추가 (남은 개수만큼)
    for (let i = 0; i < starCount; i++) {
        if (nowStar > 800) break;
        nowStar++;
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'absolute';

        // 처음엔 가운데 위치
        star.style.left = `${skyWidth / 2 - 10}px`;
        star.style.top = `${skyHeight / 2 - 10}px`;

        // 작은 별 스타일 설정
        const starSize = Math.random() * 3 + 2; // 2px ~ 5px 크기
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';

        // 부드러운 이동을 위한 transition
        star.style.transition = 'left 1s ease-out, top 1s ease-out';

        // 밤하늘에 추가
        sky.appendChild(star);

        // 0.5초 후 랜덤 위치로 이동
        setTimeout(() => {
            const randomX = Math.random() * skyWidth;
            const randomY = Math.random() * skyHeight;

            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;

            // 3초 ~ 10초 랜덤 애니메이션 지속 시간 적용
            const randomDuration = Math.random() * 7 + 3;
            star.style.animationDuration = `${randomDuration}s`;

        }, 500);
    }
}

// 창 크기 변경 시 별들의 위치 업데이트
window.addEventListener('resize', () => {
    const sky = document.querySelector('.sky');
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    // 큰 별들의 위치 업데이트
    const bigStars = document.querySelectorAll('.big-star');
    bigStars.forEach((bigStar, index) => {
        const position = constellationPositions[index % constellationPositions.length];
        const newX = position.x * skyWidth;
        const newY = position.y * skyHeight;

        bigStar.style.left = `${newX}px`;
        bigStar.style.top = `${newY}px`;
    });

    // 작은 별들의 위치 업데이트 (옵션에 따라 필요 시 구현)
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const randomX = Math.random() * skyWidth;
        const randomY = Math.random() * skyHeight;
        
        star.style.left = `${randomX}px`;
        star.style.top = `${randomY}px`;
    });
});
