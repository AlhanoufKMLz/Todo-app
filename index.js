let myList = document.getElementById('list-items');

document.getElementById('add').addEventListener('click', function(event) {
    event.preventDefault();
    let newItem = document.createElement("li");
    
    // Create a checkbox and append it to the new item
    let newCheck = document.createElement('input');
    newCheck.type = 'checkbox';
    newCheck.classList.add('checkbox');
    newItem.appendChild(newCheck);

    // Add event listener for the checkbox
    newCheck.addEventListener('click', function() {
        if (newCheck.checked) {
            newItem.classList.add('completed');
        } else {
            newItem.classList.remove('completed');
        }
    }); 
    
    // Append text after the checkbox
    let textNode = document.createTextNode(document.getElementById('input').value);
    newItem.appendChild(textNode);

    // Create a delete button and append it to the new item
    let newDeletebtn = document.createElement('button');
    newDeletebtn.innerText = 'Delete';
    newDeletebtn.classList.add('delete-btn');
    newItem.appendChild(newDeletebtn);

    // Add event listener for the delete button
    newDeletebtn.addEventListener('click', function() {
        newItem.remove();
    });


    myList.appendChild(newItem);
    
    // Reset the form
    document.getElementById('myForm').reset();
});








