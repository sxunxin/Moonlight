let constellationIndex = 0; // 현재 양자리에서 몇 번째 별인지 추적
let nowStar = 0;
let resizeTimeout; // 창 크기 변경 딜레이

// 별자리 보정값
let AquariusX = -0.04;  // 물병자리의 X축 이동 값
let AquariusY = -0.1;  // 물병자리의 Y축 이동 값

const constellations = [
    // 물병자리
    { x: 0.17 + AquariusX, y: 0.19 + AquariusY }, 
    { x: 0.12 + AquariusX, y: 0.26 + AquariusY }, 
    { x: 0.14 + AquariusX, y: 0.30 + AquariusY }, 
    { x: 0.17 + AquariusX, y: 0.27 + AquariusY }, 
    { x: 0.11 + AquariusX, y: 0.32 + AquariusY },
    { x: 0.09 + AquariusX, y: 0.31 + AquariusY },
    { x: 0.085 + AquariusX, y: 0.35 + AquariusY },
    { x: 0.11 + AquariusX, y: 0.45 + AquariusY },
    { x: 0.13 + AquariusX, y: 0.41 + AquariusY },
    { x: 0.16 + AquariusX, y: 0.412 + AquariusY },
    { x: 0.19 + AquariusX, y: 0.45 + AquariusY },
];

// 새로운 별과 연결할 별들 반환 (예: 4번 별이 생기면 1번, 3번과 연결)
function getConnectionsForNewStar(newStarIndex) {
    const connections = [];
    newStarIndex++;

    if (newStarIndex === 5) {
        connections.push([2, 5]);
    } else {
        connections.push([newStarIndex - 1, newStarIndex]);
    }
    return connections;
}

function addStars(starCount) {
    const sky = document.querySelector('.sky'); // 밤하늘 영역
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    if (starCount >= 5) {
        // ⭐ 큰 별 1개 추가 (5개를 채웠을 때)
        const bigStar = document.createElement('div');
        bigStar.classList.add('big-star');
        bigStar.style.position = 'absolute';

        // 처음엔 가운데 위치
        bigStar.style.left = `${skyWidth / 2 - 10}px`;
        bigStar.style.top = `${skyHeight / 2 - 10}px`;

        // 큰 별 스타일
        bigStar.style.width = '8px'; // 더 큼
        bigStar.style.height = '8px';
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
            const position = constellations[constellationIndex++];

            // 별을 해당 좌표로 이동
            const newX = position.x * skyWidth;
            const newY = position.y * skyHeight;

            bigStar.style.left = `${newX}px`;
            bigStar.style.top = `${newY}px`;

            setTimeout(drawOneLineBetweenStars, 1000);

        }, 500);

        // 작은 별 개수는 (starCount - 1)
        starCount -= 1;
    
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
    clearTimeout(resizeTimeout); // 이전 타임아웃을 지우고
    resizeTimeout = setTimeout(() => {
        const sky = document.querySelector('.sky');
        const skyWidth = sky.offsetWidth;
        const skyHeight = sky.offsetHeight;

        // 큰 별들의 위치 업데이트
        const bigStars = document.querySelectorAll('.big-star');
        bigStars.forEach((bigStar, index) => {
            const position = constellations[index % constellations.length];
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

        // 기존 선 삭제
        const lines = document.querySelectorAll('.constellation-line');
        lines.forEach(line => {
            line.remove();
        });

        // 선 다시 그리기 (setTimeout을 통해 일정 시간 후 실행)
        setTimeout(drawLinesBetweenStars, 1000);
    }, 200); // 200ms 후에 한 번만 실행되도록 설정
});

// 큰 별 생성시 연결
function drawOneLineBetweenStars() {
    const sky = document.querySelector('.sky');
    if (constellationIndex < 2) return;

    const stars = document.querySelectorAll('.big-star');
    const newStarIndex = stars.length - 1; // 마지막 별이 새로 추가된 별
    const connections = getConnectionsForNewStar(newStarIndex); // 연결할 별들을 가져옴

    // 연결된 별들끼리 선을 그림
    connections.forEach(connection => {
        const startStarIndex = connection[0]; // 연결할 첫 번째 별 인덱스
        const endStarIndex = connection[1];   // 연결할 두 번째 별 인덱스

        const startStar = stars[startStarIndex - 1]; // 인덱스는 1부터 시작하므로 -1
        const endStar = stars[endStarIndex - 1];     // 동일

        // 유효한 별이 있을 경우 선을 그리도록
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

            line.style.width = `0px`; // 처음엔 0px
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transition = 'width 1s ease-out'; // 선이 천천히 그려짐

            sky.appendChild(line);

            // 0.1초 후 선이 부드럽게 나타나도록 길이 조절
            setTimeout(() => {
                line.style.width = `${distance}px`;
            }, 100);
        }
    });
}
// 창 크기 변경시 별들 다시 연결
function drawLinesBetweenStars() {
    const sky = document.querySelector('.sky');
    const stars = document.querySelectorAll('.big-star');

    for (let i = 0; i < stars.length - 1; i++) {
        const startStar = stars[i];
        const endStar = stars[i + 1];

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

        // 선의 초기 너비를 0으로 설정
        line.style.width = `0px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;

        sky.appendChild(line);

        // 애니메이션 시작
        setTimeout(() => {
            line.style.transition = 'width 1s ease-out'; // 너비 애니메이션 적용
            line.style.width = `${distance}px`; // 실제 거리만큼 너비 확장
        }, 100); // 0.1초 후 애니메이션 시작
    }
}