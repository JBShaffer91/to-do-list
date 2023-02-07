window.onload = function() {
  // Business logic
  let todos = [];
  const addTodo = function(text) {
    todos.push({ text: text, id: Date.now(), completed: false });
  };
  const editTodo = function(id, text) {
    const todo = todos.find(todo => todo.id === id);
    todo.text = text;
  };
  const deleteTodo = function(id) {
    todos = todos.filter(todo => todo.id !== id);
  };
  const getTodos = function() {
    return todos;
  };
  
  // UI logic
  const todoInput = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.querySelector('#todo-list');
  const renderTodos = function() {
    todoList.innerHTML = '';
    const todos = getTodos();
    todos.forEach(todo => {
      const todoItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', function() {
        todo.completed = this.checked;
        if (todo.completed) {
          deleteTodo(todo.id);
        }
        renderTodos();
      });
      todoItem.appendChild(checkbox);
      const label = document.createElement('label');
      label.innerText = todo.text;
      todoItem.appendChild(label);
      todoItem.dataset.id = todo.id;
      todoList.appendChild(todoItem);
    });
  };
  
  addButton.addEventListener('click', function(e) {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
    renderTodos();
  });
  
  renderTodos();
};
