window.onload = render;
const myList = document.getElementById('list-items');
let completedCounter = 0;


//----------------event listeners--------------------


// add
document.getElementById('my-add-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // make sure the user enters valid task
    inputValue = document.getElementById('input').value.trim();
    if (!inputValue) {
        alert('Please enter a valid task.');
        return;
    }

    // store the task
    const newKey = generateUniqueKey();
    localStorage.setItem(newKey, inputValue);
    // creating new item 
    const newItem = document.createElement("li");
    createCheckBox(newItem);
    const textSpan = createNewSpan(newItem, inputValue);
    createEditBtn(newItem, newKey, textSpan);
    createDeleteBtn(newItem, newKey);

    myList.appendChild(newItem);
    document.getElementById('counter').innerText = localStorage.length;
    
    // Reset the form
    document.getElementById('my-add-form').reset();
});

// filter
document.getElementById('myDropdown').addEventListener('change', function(event) {
    event.preventDefault();

    const selectedValue = this.value;
    const allTasks = document.querySelectorAll('li');
    const completedTasks = document.querySelectorAll('.completed');
    const notCompletedTasks = [...allTasks].filter(task => !task.classList.contains('completed'));

    switch (selectedValue) {
        case 'active':
            completedTasks.forEach(task => task.style.display = 'none');
            notCompletedTasks.forEach(task => task.style.display = 'flex');
            break;
        case 'completed':
            completedTasks.forEach(task => task.style.display = 'flex');
            notCompletedTasks.forEach(task => task.style.display = 'none');
            break;
        case 'all-tasks':
            allTasks.forEach(task => task.style.display = 'flex');
            break;
    }
});

// search
document.getElementById('my-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const keyword = document.getElementById('input-search').value;
    const allTasks = document.querySelectorAll('li');

    allTasks.forEach(task => {
        if (!task.innerText.includes(keyword)) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex'; 
        }
    });
    document.getElementById('my-search-form').reset();
});


//----------------helper functions--------------------


function render(){
    for(let i=0; i<localStorage.length; i++){
        const taskKey = localStorage.key(i);
        const task = document.createElement('li');
        createCheckBox(task);
        const textSpan = createNewSpan(task, localStorage.getItem(taskKey));
        createEditBtn(task, taskKey, textSpan);
        createDeleteBtn(task, taskKey);
        myList.append(task);
    }
    document.getElementById('counter').innerText = localStorage.length;
}

function createCheckBox(newItem){
    // Create a checkbox and append it to the new item
    const newCheck = document.createElement('input');
    newCheck.type = 'checkbox';
    newCheck.classList.add('checkbox');
    newItem.appendChild(newCheck);

    // Add event listener for the checkbox
    newCheck.addEventListener('click', function() {
        newItem.classList.toggle('completed')
        if (newCheck.checked) {
            document.getElementById('completed-counter').innerText = ++completedCounter;
        } else {
            document.getElementById('completed-counter').innerText = --completedCounter;
        }
    }); 
}

function createDeleteBtn(newItem, taskKey){
    // Create a delete button and append it to the new item
    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.innerText = 'Delete';
    newDeleteBtn.classList.add('delete-btn');
    newItem.appendChild(newDeleteBtn);

    // Add event listener for the delete button
    newDeleteBtn.addEventListener('click', function() {
        newItem.remove();
        localStorage.removeItem(taskKey);
        document.getElementById('counter').innerText = localStorage.length;
        if(newItem.classList.contains('completed')){
            document.getElementById('completed-counter').innerText = --completedCounter;
        }
    });
}

function createEditBtn(newItem, taskKey, textSpan){
    // Create a hidden text input for editing the text
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.classList.add('input-field')
    textInput.value = localStorage.getItem(taskKey);
    textInput.style.display = 'none';  // Hide it by default
    newItem.appendChild(textInput);

    // Create a edit button and append it to the new item
    const newEditBtn = document.createElement('button');
    newEditBtn.innerText = 'Edit';
    newEditBtn.classList.add('edit-btn');
    newItem.appendChild(newEditBtn);

    // Add event listener for the edit button
    newEditBtn.addEventListener('click', function(){
        if (textInput.style.display === 'none') {
            // Switch to editing mode
            textSpan.style.display = 'none';
            textInput.style.display = 'block';
            textInput.focus();
            newEditBtn.innerText = 'Save';
        } else {
            // Save changes and switch back to display mode
            textSpan.textContent = textInput.value;
            localStorage.setItem(taskKey, textInput.value)
            textInput.style.display = 'none';
            textSpan.style.display = 'block';
            newEditBtn.innerText = 'Edit';
        }
    });
}

function generateUniqueKey(){
    return new Date().getTime().toString();
}

function createNewSpan(newItem, inputValue){
    // Create a span for displaying the text
    const textSpan = document.createElement('span'); 
    textSpan.textContent = inputValue;
    newItem.append(textSpan);
    return textSpan;
}