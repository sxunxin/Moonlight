const todoList = document.getElementById('todoList');
const todoItemsContainer = document.getElementById('todoItems');
const toggleTodoListBtn = document.getElementById('toggleTodoList');

document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todoList");
    const toggleButton = document.getElementById("toggleTodoList");

    toggleButton.addEventListener("click", function () {
        todoList.classList.toggle("show");

        // 정확한 너비 계산
        const todoWidth = todoList.getBoundingClientRect().width;

        if (todoList.classList.contains("show")) {
            toggleButton.style.right = `${todoWidth}px`;  // 리스트가 열린 후 버튼 이동
        } else {
            toggleButton.style.right = "0px";   // 닫힐 때 원래 위치로
        }
    });
});


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

// 페이지가 로드될 때 오늘 날짜를 표시
window.addEventListener('load', () => {
    const currentDate = new Date();
    const formattedDate = getFormattedDate(currentDate);
    document.querySelector('.date-display').textContent = formattedDate;
});

// 오늘 할 일 완료 버튼 클릭 시 날짜 하루 증가
document.querySelector('.end-day').addEventListener('click', () => {
    const todoItemsContainer = document.getElementById('todoItems');
    const completedTasks = todoItemsContainer.querySelectorAll('.todo-item input:checked'); // 완료된 항목 수

    // 투두 항목 초기화
    todoItemsContainer.innerHTML = '';

    // 기존 날짜를 가져와서 하루 증가
    const currentDate = new Date(document.querySelector('.date-display').textContent);
    currentDate.setDate(currentDate.getDate() + 1); // 하루 더하기

    // 새로운 날짜 포맷
    const newDate = getFormattedDate(currentDate);

    // 날짜 표시 영역에 새로운 날짜 넣기
    document.querySelector('.date-display').textContent = newDate;

    // 0.2초 후에 투두리스트 숨기기 (슬라이딩으로 들어가게)
    setTimeout(() => {
        document.getElementById('todoList').classList.remove('show'); // 투두리스트 숨기기
        
        // ✅ 토글 버튼 위치 초기화 (오른쪽 끝으로 복귀)
        toggleTodoListBtn.style.right = "0px"; 
    }, 200); // 0.2초 후에 실행

    // 완료된 할 일 수 만큼 별 추가
    addStars(completedTasks.length);
});


// 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
