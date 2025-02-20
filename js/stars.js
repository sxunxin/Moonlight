function addStars(star) {
    const starCount = star;
    const sky = document.querySelector('.sky'); // 밤하늘 영역
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star'); // 별에 대한 스타일을 위해 클래스 추가
        star.style.position = 'absolute';
        
        // 처음엔 가운데에 위치
        star.style.left = `${skyWidth / 2 - 10}px`;  // 별 크기 20px로 가정, 가운데 정렬
        star.style.top = `${skyHeight / 2 - 10}px`;

        // 별 크기 랜덤화 (작은 별에서 큰 별까지)
        const starSize = Math.random() * 3 + 2; // 2px에서 5px 사이의 크기
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;

        // 별 스타일 (동그라미 모양)
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';

        // ✅ 부드러운 이동을 위한 transition 추가
        star.style.transition = 'left 1s ease-out, top 1s ease-out';

        // 별을 밤하늘에 추가
        sky.appendChild(star);
        
        // 0.5초 후 랜덤 위치로 부드럽게 이동
        setTimeout(() => {
            const randomX = Math.random() * skyWidth; 
            const randomY = Math.random() * skyHeight;
            
            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;

            // ✅ 3초 ~ 10초 랜덤 애니메이션 지속 시간 적용
            const randomDuration = Math.random() * 7 + 3; // 3초에서 10초 사이
            star.style.animationDuration = `${randomDuration}s`;

        }, 500); // 0.5초 후 실행
    }
}
