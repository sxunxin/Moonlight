const collectStarsBtn = document.getElementById('collectStarsBtn');
const closeBtn = document.querySelector('.close-btn'); 
const categoryContainer = document.getElementById('categoryContainer');
const timeLeftElement = document.querySelector('.time-left');
const devModeBtn = document.getElementById("devModeBtn");
const devModal = document.getElementById("devModal");

let zIndexCounter = 2000;
let isDeleteMode = false; 
let canCreateStar = 1; 
let onlyCreateStar = 0;
let isCooldown = false; 
let isZeroPressed = false;

// 별 모으기 버튼 클릭 시 투두리스트 표시
collectStarsBtn.addEventListener('click', () => {
    todoList.classList.add('show'); 
    collectStarsBtn.style.display = 'none'; 
});

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {  
        todoList.classList.add('show'); 
        collectStarsBtn.style.display = 'none';
    }
});

// 닫기 버튼 클릭 시 투두리스트 숨기기
closeBtn.addEventListener('click', () => {
    todoList.classList.remove('show'); 
    collectStarsBtn.style.display = 'block'; 
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' ) {  
        todoList.classList.remove('show');  
        collectStarsBtn.style.display = 'block'; 
        devModal.style.display = "none"; 
    }
});

// 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 페이지가 로드될 때 오늘 날짜를 표시
window.addEventListener('load', () => {
    const currentDate = new Date();
    const formattedDate = getFormattedDate(currentDate);
    const dateDisplay = document.querySelector('.date-display');
    if (dateDisplay) {
        dateDisplay.textContent = formattedDate;
    }
});

// 날짜를 하루 증가시키는 함수
function moveToNextDay() {
    if (!window.currentDate) {
        window.currentDate = new Date();  
    }

    window.currentDate.setDate(window.currentDate.getDate() + 1);

    const formattedDate = getFormattedDate(window.currentDate);
    const dateDisplay = document.querySelector('.date-display');
    if (dateDisplay) {
        dateDisplay.textContent = formattedDate;
    }
}

// 카테고리 버튼 클릭
document.getElementById('categoryBtn').addEventListener('click', () => {
    const categoryBtn = document.getElementById('categoryBtn');
    const categoryActions = document.getElementById('categoryActions');

    if (categoryBtn.style.display !== 'none') {
        categoryBtn.style.display = 'none'; 
        categoryActions.style.display = 'flex';  
    } else {
        categoryBtn.style.display = 'flex';  
        categoryActions.style.display = 'none';  
    }
});

// 다른 곳을 클릭했을 때 카테고리 버튼 다시 보이기
document.addEventListener('click', (event) => {
    const categoryBtn = document.getElementById('categoryBtn');
    const categoryActions = document.getElementById('categoryActions');
    
    if (!categoryBtn.contains(event.target) && !categoryActions.contains(event.target)) {
        categoryBtn.style.display = 'block';
        categoryActions.style.display = 'none'; 
        isDeleteMode = false;
        updateAddTodoButtons();
    }
});

// 카테고리 블록 삭제
document.getElementById("deleteCategoryBtn").addEventListener("click", function() {
    isDeleteMode = !isDeleteMode;
    updateAddTodoButtons();
});

// 카테고리 삭제 상태 업데이트 
function updateAddTodoButtons() {
    document.querySelectorAll(".add-todo-btn").forEach(button => {
        if (isDeleteMode) {
            button.classList.add("deleteMode");
        } else {
            button.classList.remove("deleteMode");
        }
    });
}

// 카테고리 블록 추가
document.getElementById('addCategoryBtn').addEventListener('click', () => {

    if (isDeleteMode) {
        isDeleteMode = false; 
        updateAddTodoButtons();  
    }

    const categoryContainer = document.getElementById('categoryContainer');

    const categoryBlock = document.createElement('div');
    categoryBlock.classList.add('category-block');

    const cornerHandle = document.createElement('div');
    cornerHandle.classList.add('corner-handle');

    const categoryInput = document.createElement('div');
    categoryInput.classList.add('category-input');
    categoryInput.contentEditable = true;

    const maxLength = 20; 

    categoryBlock.appendChild(categoryInput);
    categoryBlock.appendChild(cornerHandle);

    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo-btn'); 
    addTodoBtn.innerHTML = '+';
    categoryBlock.appendChild(addTodoBtn);
    categoryContainer.appendChild(categoryBlock);

    positionNewCategoryBlock(categoryBlock, categoryContainer);
    categoryInput.focus();

    // 입력 제한 처리
    categoryInput.addEventListener('input', (e) => {
        if (categoryInput.textContent.length > maxLength) {
            categoryInput.textContent = categoryInput.textContent.substring(0, maxLength);
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(categoryInput.firstChild || categoryInput, maxLength);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    // 엔터 키를 눌렀을 때 입력 확정
    categoryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            if (categoryInput.textContent.trim() === '') {
                categoryBlock.remove(); 
            } else {
                categoryInput.textContent = categoryInput.textContent.trim();
                categoryInput.contentEditable = false; 
            }
        }
    });

    // 다른 곳을 클릭했을 때 입력이 비었으면 삭제
    categoryInput.addEventListener('blur', () => {
        if (categoryInput.textContent.trim() === '') {
            categoryBlock.remove();
        } else {
            categoryInput.contentEditable = false;
        }
    });

    // 투두 추가 버튼 클릭 시 할 일 항목 추가
    addTodoBtn.addEventListener('click', () => {
        addTodoToCategory(categoryBlock);
    });

    document.addEventListener('click', (e) => {
        const categoryBlock = e.target.closest('.category-block'); 
        if (categoryBlock) {
            categoryBlock.style.zIndex = ++zIndexCounter; 
        }
    });
    
    cornerHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        let shiftX = e.offsetX + 10;
        let shiftY = e.offsetY + 40.5;
        
        categoryBlock.classList.add('dragging');
        categoryBlock.style.opacity = 0.5;
        
        function moveAt(pageX, pageY) {
            const containerRect = categoryContainer.getBoundingClientRect();
            const blockRect = categoryBlock.getBoundingClientRect();
            
            let newX = pageX - shiftX;
            newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - blockRect.width));
            
            let newY = pageY - shiftY;
            newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - blockRect.height));
            
            categoryBlock.style.left = `${newX}px`;
            categoryBlock.style.top = `${newY}px`;
        }
        
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        
        document.addEventListener('mousemove', onMouseMove);
        
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
            categoryBlock.classList.remove('dragging');
            categoryBlock.style.opacity = 1;
            categoryBlock.style.zIndex = ++zIndexCounter;
        }, { once: true });
    });    
});

// 새로운 카테고리 생성 
function positionNewCategoryBlock(newBlock, container) {
    const blocks = document.querySelectorAll('.category-block');
    const containerRect = container.getBoundingClientRect();
    const blockSize = 80; 

    let x, y;
    let isOverlapping;
    let attempts = 0;
    const maxAttempts = 50;
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const maxDistance = Math.sqrt(Math.pow(containerRect.width, 2) + Math.pow(containerRect.height, 2)) / 2; 

    do {
        isOverlapping = false;
        let distanceFromCenter = (attempts / maxAttempts) * maxDistance; 
        let angle = Math.random() * 2 * Math.PI; 

        x = centerX + distanceFromCenter * Math.cos(angle);
        y = centerY + distanceFromCenter * Math.sin(angle);

        x = Math.min(Math.max(x, 0), containerRect.width - blockSize);
        y = Math.min(Math.max(y, 0), containerRect.height - blockSize);

        blocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            if (
                x < rect.right - containerRect.left &&
                x + blockSize > rect.left - containerRect.left &&
                y < rect.bottom - containerRect.top &&
                y + blockSize > rect.top - containerRect.top
            ) {
                isOverlapping = true;
            }
        });

        attempts++;
    } while (isOverlapping && attempts < maxAttempts);

    if (isOverlapping) {
        x = centerX - blockSize / 2;
        y = centerY - blockSize / 2;
    }

    newBlock.style.position = 'absolute';
    newBlock.style.left = `${x}px`;
    newBlock.style.top = `${y}px`;
}

// 투두 생성 
function addTodoToCategory(categoryBlock) {

    if (isDeleteMode) {
        if (categoryBlock) {
            isDeleteMode = false;
            updateAddTodoButtons();
            categoryBlock.remove(); 
            updateStarButtonBorder();
        }
    }

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const todoInput = document.createElement('div');
    todoInput.classList.add('todo-input');
    todoInput.contentEditable = true;
    const maxLength = 30; 

    const todoAbout = document.createElement('button');
    todoAbout.classList.add('todo-about');
    todoAbout.textContent = '...';

    const menu = document.createElement('div');
    menu.classList.add('todo-menu');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-todo');
    editButton.textContent = '수정';

    const routineButton = document.createElement('button');
    routineButton.classList.add('routine-todo');
    routineButton.textContent = '루틴';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-todo');
    deleteButton.textContent = '삭제';

    menu.appendChild(editButton);
    menu.appendChild(routineButton);
    menu.appendChild(deleteButton);

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoInput);
    todoItem.appendChild(todoAbout);
    todoItem.appendChild(menu);

    categoryBlock.insertBefore(todoItem, categoryBlock.firstChild?.nextSibling || categoryBlock.firstChild);
    todoInput.focus();

    // 입력란에서 글자 수 제한 처리
    todoInput.addEventListener('input', (e) => {
        if (todoInput.textContent.length > maxLength) {
            todoInput.textContent = todoInput.textContent.substring(0, maxLength);
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(todoInput.firstChild || todoInput, maxLength);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    // 입력란에서 엔터키를 눌렀을 때
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            if (todoInput.textContent.trim() === '') {
                todoItem.remove(); 
            } else {
                todoInput.textContent = todoInput.textContent.trim();
                todoInput.contentEditable = false; 
            }
        }
    });

    todoInput.addEventListener('blur', () => {
        if (todoInput.textContent.trim() === '') {
            todoItem.remove();
        } else {
            todoInput.contentEditable = false;
        }
    });

    checkbox.addEventListener('change', () => {
        const todoItem = checkbox.closest('.todo-item'); 
        updateStarButtonBorder();
        if (checkbox.checked) {
            categoryBlock.appendChild(todoItem);
            todoItem.classList.add('checked'); 
        } else {
            categoryBlock.insertBefore(todoItem, categoryBlock.firstChild?.nextSibling || categoryBlock.firstChild);
            todoItem.classList.remove('checked'); 
        }
    });
    
    // '⋯' 버튼 클릭 시 메뉴 표시/숨김
    todoAbout.addEventListener('click', (e) => {
        e.stopPropagation();

        todoAbout.style.display = 'none';
        document.querySelectorAll('.todo-item').forEach(item => {
            if (item !== todoItem) {
                item.classList.remove('show-menu');
            }
        });
        todoItem.classList.toggle('show-menu');
    });

    document.addEventListener('click', () => {
        todoAbout.style.display = 'inline'; 
        todoItem.classList.remove('show-menu');
    });

    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 삭제 버튼 기능
    deleteButton.addEventListener('click', () => {
        todoAbout.style.display = 'inline'; 
        todoItem.classList.remove('show-menu');
        todoItem.remove();
        updateStarButtonBorder();
    });

    // 수정 버튼 기능
    editButton.addEventListener('click', () => {
        todoInput.contentEditable = true;
        todoAbout.style.display = 'inline'; 
        todoItem.classList.remove('show-menu');
        todoInput.focus();
    });

    // 루틴 버튼 기능
    routineButton.addEventListener('click', () => {
        todoItem.isRoutine = !todoItem.isRoutine; 
        routineButton.classList.toggle('routine-active', todoItem.isRoutine);
        todoItem.classList.toggle('routine-item', todoItem.isRoutine);
    });
}

// 별 만들기 
document.querySelector('.create-star-btn').addEventListener('click', function() {

    if (canCreateStar === 0) {
        return; 
    }

    const checkedTodos = document.querySelectorAll('.todo-item input[type="checkbox"]:checked');
    const cnt = checkedTodos.length; 

    if (cnt > 0) {
        checkedTodos.forEach(checkbox => {
            const todoItem = checkbox.closest('.todo-item'); 
            const isRoutine = todoItem.isRoutine; 

            if (isRoutine) {
                checkbox.checked = false;

                const categoryBlock = todoItem.closest('.category-block');
                if (checkbox.checked) {
                    categoryBlock.appendChild(todoItem);
                    todoItem.classList.add('checked'); 
                } else {
                    categoryBlock.insertBefore(todoItem, categoryBlock.firstChild?.nextSibling || categoryBlock.firstChild);
                    todoItem.classList.remove('checked');
                }
            } else {
                todoItem.remove();
            }
        });

        updateStarButtonBorder();
        if (onlyCreateStar === 0) canCreateStar = 0;
        moveToNextDay();

        setTimeout(() => {
            const todoList = document.querySelector('.todo-list');
            if (todoList) {
                todoList.classList.remove('show');
            }

            const collectStarsBtn = document.querySelector('.collect-stars-btn');
            if (collectStarsBtn) {
                collectStarsBtn.style.display = 'block';
            }
            addStars(cnt);

        }, 500);
    }
});

// 체크된 투두 항목 개수 확인 
function updateStarButtonBorder() {
    const checkedTodos = document.querySelectorAll('.todo-item input[type="checkbox"]:checked');
    const starBtnWrapper = document.querySelector('.starBtn-wrapper');
    const createStarBtn = document.querySelector('.create-star-btn');
    
    if (checkedTodos.length >= 5 && canCreateStar === 1) {
        if (starBtnWrapper) {
            starBtnWrapper.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            starBtnWrapper.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4)';
        }
    } else {
        if (starBtnWrapper) {
            starBtnWrapper.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            starBtnWrapper.style.boxShadow = 'none'; 
        }
    }

    if (checkedTodos.length === 0) {
        if (createStarBtn) {
            createStarBtn.classList.add('disabled'); 
        }
    } else {
        if (createStarBtn) {
            createStarBtn.classList.remove('disabled'); 
        }
    }
}
updateStarButtonBorder();

// 남은 시간을 표시 함수
function updateTimeLeft() {
    const currentTime = new Date();
    const targetTime = new Date();
    
    if (currentTime.getHours() >= 5) {
        targetTime.setDate(targetTime.getDate() + 1); 
    }
    targetTime.setHours(5, 0, 0, 0); 

    const remainingTime = targetTime - currentTime; 
    const hours = Math.floor(remainingTime / (1000 * 60 * 60)); 
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); 
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000); 

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timeLeftElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        canCreateStar = 1;
        updateStarButtonBorder();
    }

    const createStarBtn = document.querySelector('.create-star-btn');
    if (canCreateStar === 0) {
        createStarBtn.classList.add('disabledTime');
        timeLeftElement.style.display = 'block';
    } else {
        createStarBtn.classList.remove('disabledTime');
        timeLeftElement.style.display = 'none';
    }
}

setInterval(updateTimeLeft, 1000);
updateTimeLeft();

// 개발자 모드 버튼 클릭 시 모달 열기
devModeBtn.onclick = function() {
    devModal.style.display = "flex"; 
    devModal.style.pointerEvents = "auto"; 
}

// 모달 밖을 클릭하면 모달 닫기
window.onclick = function(event) {
    if (event.target === devModal) { 
        devModal.style.display = "none"; 
    }
}

// 개발자 모드 기능  
document.addEventListener("DOMContentLoaded", () => {
    const starLimitToggle = document.getElementById("starLimitToggle");
    const dateToggle = document.getElementById("dateToggle");
    const shortcutToggle = document.getElementById("shortcutToggle");
    const dateDisplay = document.querySelector('.date-display');

     // 단축키 기능
     document.addEventListener("keydown", (event) => {
        if (!shortcutToggle.checked) return;
    
        if (!isCooldown) {
            switch (event.key) {
                case "8":
                    addStars(10);
                    break;
                case "9":
                    addStars(100);
                    break;
                case "0":
                    if (isZeroPressed) {
                        return;
                    }
                    addConstellations();
                    isZeroPressed = true; 
                    break;
            }
            isCooldown = true;
        
            setTimeout(() => {
                isCooldown = false;
            }, 2000);
        }
    });
    
    // 별 만들기 제한 해제 기능
    starLimitToggle.addEventListener("change", () => {
        if (starLimitToggle.checked) {
            onlyCreateStar = 1;
            canCreateStar = 1;
            updateStarButtonBorder();
        } else {
            onlyCreateStar = 0;
        }
    });

    // 날짜 표시 기능
    dateToggle.addEventListener("change", () => {
        if (dateToggle.checked) {
            dateDisplay.style.display = "block";
        } else {
            dateDisplay.style.display = "none";
        }
    });
});