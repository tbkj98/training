// var str = 'TBKJ';
// window.alert(str);

// Function will executes once the page gets loaded
// window.onload = function() {
//     Function will execute once the mainButton gets clicked.
//     var mainButton = 
//     mainButton.onclick = function() {
//         alert('I was clicked.');
//     }
// }

// Defining function for click event of mainButton
// document
//     .getElementById('mainButton')
//     .addEventListener('click', function() {
//         alert('I was clicked.');
//     });

// keep track of number of drivers
// let reminderCount = 0;

// window.onload = function() {
//     document
//         .forms[0]
//         .reminder.focus();
// };

var reminderList = document.getElementById('newReminderList');

var reminders = localStorage.getItem('reminders');

if (reminders != undefined) {
    // reminders exists
    // var remindersObject = JSON.parse(reminders);
    reminderList.innerHTML = reminders;
}


reminderList.addEventListener('click', performReminderAction);
document
    .forms[0]
    .addEventListener('submit', function (event) {
        // Prevent default form submit action
        event.preventDefault();
        // console.log(event);
        // console.log(this);
        // console.log(this.children[0].value);
        // console.log(this.reminder.value);

        // Validation for blank field
        // if (this.reminder.value == '') {
        //     // reminder is blank
        //     this.reminder.style.border = '1px solid red';
        //     // console.log('blank');
        //     return;
        // }

        var listItem = document.createElement('li');
        var reminderLabel = document.createElement('span');
        var deleteButton = document.createElement('button');


        // listItem.innerHTML = `Remind me to : <strong> ${this.reminder.value}</strong>`;

        reminderLabel.innerHTML = `Remind me to : <strong> ${this.reminder.value}</strong>`;
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('alignButton');

        listItem.append(reminderLabel);
        listItem.append(deleteButton);

        reminderList.prepend(listItem);

        // saving reminders locally
        save();
        
        // deleteButton.classList.add('alignButton');
        // listItem.addEventListener('click', toggleCompletion);

        reminderList.prepend(listItem);
        // .innerHTML +=   `<li>
        //                     Remind me to : <strong> ${this.reminder.value}</strong>
        //                 </li>`;
        // clearing input box
        this.reminder.value = '';
        this.reminder.focus();
    });

var toggleCompletion = function (ele) {

    // if (this.completed) {
    //     this.completed = false;
    //     this.classList.remove('completed');
    // }  else {
    //     this.completed = true;
    //     this.classList.add('completed');
    // }
    // if (c) {
    ele.classList.toggle('completed');
    //     c = true;
    // }

}

function performReminderAction() {
    // event.target.classList.toggle('completed');
    if (event.target.tagName == 'LI') {
        toggleCompletion(event.target);
        return;
    }

    // console.log(event.target);
    // Check if button was clicked
    if (event.target.tagName == 'BUTTON') {

        // show confirm dialog and ask for confirmation && delete the reminder LI from reminderList
        if (window.confirm('Are you sure ?'))  {
            event.target.parentElement.remove();
            save();

        } 
    }
}

function save() {
    localStorage.setItem('reminders', reminderList.innerHTML);
    console.log(reminderList.innerHTML);
}