const todoList = document.getElementById('todoList');
const collectStarsBtn = document.getElementById('collectStarsBtn');
const closeBtn = document.querySelector('.close-btn'); 
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryContainer = document.getElementById('categoryContainer');

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

// 카테고리 블록 추가
document.getElementById('addCategoryBtn').addEventListener('click', () => {
    const categoryContainer = document.getElementById('categoryContainer');

    // 새로운 카테고리 블록 만들기
    const categoryBlock = document.createElement('div');
    categoryBlock.classList.add('category-block');

    // 입력 필드 생성 (contentEditable)
    const categoryInput = document.createElement('div');
    categoryInput.classList.add('category-input');
    categoryInput.contentEditable = true;

    // 최대 글자 수 설정
    const maxLength = 20; // 제한할 글자 수 

    categoryBlock.appendChild(categoryInput);

    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo-btn'); // 클래스 이름 변경
    addTodoBtn.innerHTML = '+';
    categoryBlock.appendChild(addTodoBtn);

    categoryContainer.appendChild(categoryBlock);

    // 생성된 항목에 자동으로 포커스 주기
    categoryInput.focus();

    // 입력 제한 처리
    categoryInput.addEventListener('input', (e) => {
        if (categoryInput.textContent.length > maxLength) {
            // 초과된 글자를 즉시 삭제
            categoryInput.textContent = categoryInput.textContent.substring(0, maxLength);
            // 커서가 맨 끝으로 가도록 설정
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
            e.preventDefault(); // 엔터키 기본 동작 방지
            if (categoryInput.textContent.trim() === '') {
                categoryBlock.remove(); // 입력이 없으면 삭제
            } else {
                categoryInput.textContent = categoryInput.textContent.trim();
                categoryInput.contentEditable = false; // 입력 확정 후 수정 불가
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
});

// 카테고리 블록에 할 일 항목 추가하는 함수
function addTodoToCategory(categoryBlock) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // 체크박스 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // 할 일 입력란 생성
    const todoInput = document.createElement('div');
    todoInput.classList.add('todo-input');
    todoInput.contentEditable = true;
    const maxLength = 30; // 최대 글자 수 설정

    // 체크박스를 할 일 항목에 추가
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoInput);

    // 할 일 항목을 카테고리 블록에 추가 (맨 위에서 1칸 아래에 추가)
    categoryBlock.insertBefore(todoItem, categoryBlock.firstChild?.nextSibling || categoryBlock.firstChild);

    // 입력란에 포커스
    todoInput.focus();

    // 입력란에서 글자 수 제한 처리
    todoInput.addEventListener('input', (e) => {
        if (todoInput.textContent.length > maxLength) {
            // 초과된 글자를 즉시 삭제
            todoInput.textContent = todoInput.textContent.substring(0, maxLength);
            // 커서가 맨 끝으로 가도록 설정
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
            e.preventDefault(); // 기본 엔터키 동작 방지
            if (todoInput.textContent.trim() === '') {
                todoItem.remove(); // 내용이 없으면 삭제
            } else {
                todoInput.textContent = todoInput.textContent.trim();
                todoInput.contentEditable = false; // 입력 확정 후 수정 불가
            }
        }
    });

    // 입력란에서 블러 이벤트 발생 시, 텍스트가 없으면 삭제
    todoInput.addEventListener('blur', () => {
        if (todoInput.textContent.trim() === '') {
            todoItem.remove();
        } else {
            todoInput.contentEditable = false;
        }
    });

    // 체크박스를 클릭하면 체크 상태에 따라 항목을 맨 아래로 이동
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // 체크되면 항목을 카테고리 블록의 맨 아래로 이동
            categoryBlock.appendChild(todoItem);
        } else {
            // 체크가 풀리면 항목을 카테고리 블록의 맨 위에서 1칸 아래로 이동
            categoryBlock.insertBefore(todoItem, categoryBlock.firstChild?.nextSibling || categoryBlock.firstChild);
        }
    });
}
