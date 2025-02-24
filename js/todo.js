const todoItemsContainer = document.getElementById('todoItems');

const todoList = document.getElementById('todoList');
const collectStarsBtn = document.getElementById('collectStarsBtn');
const closeBtn = document.querySelector('.close-btn'); 
const addCategoryBtn = document.getElementById('addCategoryBtn');

// 별 모으기 버튼 클릭 시 투두리스트 표시
collectStarsBtn.addEventListener('click', () => {
    todoList.classList.add('show');  // 투두리스트를 화면에 표시
    collectStarsBtn.style.display = 'none';  // '별 모으기' 글씨 숨기기
});

// 닫기 버튼 클릭 시 투두리스트 숨기기
closeBtn.addEventListener('click', () => {
    todoList.classList.remove('show'); // 투두리스트 숨기기
    collectStarsBtn.style.display = 'block'; // '별 모으기' 글씨 다시 보이게 하기
});

// Esc 키 눌렀을 때도 투두리스트 숨기기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {  // Esc 키가 눌렸을 때
        todoList.classList.remove('show');  // 투두리스트 숨기기
        collectStarsBtn.style.display = 'block';  // '별 모으기' 글씨 다시 보이게
    }
});

// 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 페이지가 로드될 때 오늘 날짜를 표시
window.addEventListener('load', () => {
    const currentDate = new Date();
    const formattedDate = getFormattedDate(currentDate);
    
    // 날짜 표시 영역이 없으면 생성
    let dateDisplay = document.querySelector('.date-display');
    if (!dateDisplay) {
        dateDisplay = document.createElement('div');
        dateDisplay.classList.add('date-display');
        document.body.appendChild(dateDisplay);
    }

    dateDisplay.textContent = formattedDate;
});

// 카테고리 추가 버튼 클릭 시 처리
addCategoryBtn.addEventListener('click', () => {
    alert('카테고리 추가 기능을 추가하세요!');
    // 카테고리 추가 기능을 여기에 구현하세요.
});

/* ======================================= 리메이크 이전 코드 ======================================= */

// 할 일 추가 버튼 클릭 시 실행
document.querySelector('.add-todo').addEventListener('click', () => {
    const todoItemsContainer = document.getElementById('todoItems');
    
    // 새로운 투두 항목 만들기
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    
    // 체크박스 추가
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    // 체크 시 맨 아래로 이동
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            todoItemsContainer.appendChild(todoItem); // 체크하면 리스트 맨 아래로 이동
        } else {
            todoItemsContainer.insertBefore(todoItem, todoItemsContainer.firstChild); // 체크 해제하면 다시 맨 위로
        }
    });

    // 텍스트 입력 가능한 div 만들기
    const todoText = document.createElement('div');
    todoText.classList.add('todo-input');
    todoText.contentEditable = true; // 사용자가 바로 입력 가능
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);

    // 엔터 키를 눌렀을 때 입력 확정
    todoText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 엔터키 기본 동작 방지 (줄바꿈 방지)
            if (todoText.textContent.trim() === '') {
                todoItem.remove(); // 텍스트가 비었으면 항목 삭제
            } else {
                todoText.textContent = todoText.textContent.trim(); // 앞뒤 공백 제거
                todoText.contentEditable = false; // 입력 후 수정 불가능하도록 설정

                // 엑스 버튼 추가 (입력 확정 후 생성)
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.textContent = '×'; // 엑스 기호
                deleteBtn.addEventListener('click', () => {
                    todoItem.remove(); // 해당 항목 삭제
                });
                todoItem.appendChild(deleteBtn);
            }
        }
    });

    // 다른 곳을 클릭했을 때 입력이 비었으면 항목 삭제
    todoText.addEventListener('blur', () => {
        if (todoText.textContent.trim() === '') {
            todoItem.remove();
        } else {
            todoText.contentEditable = false;
            
            // 엑스 버튼 추가 (입력 확정 후 생성)
            if (!todoItem.querySelector('.delete-btn')) {
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.textContent = '×';
                deleteBtn.addEventListener('click', () => {
                    todoItem.remove();
                });
                todoItem.appendChild(deleteBtn);
            }
        }
    });

    // 추가된 투두 항목을 맨 위에 삽입
    todoItemsContainer.insertBefore(todoItem, todoItemsContainer.firstChild);
    
    // 생성된 항목에 자동으로 포커스 주기
    todoText.focus();
});
