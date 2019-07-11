let addForm = document.forms[0];
let searchId = document.getElementById('search-id');
let singlePersonDiv = document.getElementsByClassName('single-person')[0];

document.getElementById('search-submit').addEventListener('click', showSinglePerson);
document.getElementById('search-delete').addEventListener('click', deletePerson)

let first = true;

let personsList = document.getElementById('persons-list');
addPersonsIfExists();

addForm.addEventListener('submit', addPerson);

function addPerson() {
    event.preventDefault();
    let id = addForm.id.value;
    let name = addForm.name.value;
    let email = addForm.email.value;
    let mobile = addForm.mobile.value;
    let person = new Person(id, name, email, mobile);
    person.add();
}


function Person(id, name, email, mobile) {
    this.id = id;
    this.mobile = mobile;
    this.name = name;
    this.email = email;

    this.add = function () {
        let persons = localStorage.getItem('persons');
        if (!persons) {
            // persons not exists
            // create new
            persons = {};
            persons.data = [];
        } else {
            persons = JSON.parse(persons);
        }

        let obj = { id, name, email, mobile };

        if (!isExists(obj)) {
            // Person doesn't exists
            // Need to add
            persons.data.push(obj);

            persons = JSON.stringify(persons);
            localStorage.setItem('persons', persons);
            // } else {
            //     window.alert('Person already exists');
            addPersonsIfExists();
        }
    }

    // Function to remove person
    // this.remove = function () {
    //     let persons = localStorage.getItem('persons');
    //     searchId.value = searchId.value.trim();
    //     if (persons) {
    //         persons = JSON.parse(persons);
    //         // console.log(persons);
    //         for (let i = 0; i < persons.data.length; i++) {
    //             if (searchId.value == personsList.children[i].children[0].innerHTML) {
    //                 // ID exists
    //                 // console.log(personsList.children[i].children[0].id);
    //                 personsList.children[i].remove();

    //                 for (let i = 0; i < persons.data.length; i++) {
    //                     if (persons.data[i].id == searchId.value) {
    //                         // id exists
    //                         persons.data.splice(i, 1);
    //                         localStorage.setItem('persons', JSON.stringify(persons));

    //                         break;
    //                     }
    //                 }



    //                 return;
    //             }
    //             // console.log();
    //         }

    //         window.alert('ID not found.');
    //     }
    // }
}

function isExists(obj) {
    let persons = localStorage.getItem('persons');
    if (persons) {
        persons = JSON.parse(persons);
        for (let i = 0; i < persons.data.length; i++) {
            if (persons.data[i].id == obj.id) {
                // id exists
                alert('ID already exists');
                return true;
            } else if (persons.data[i].name == obj.name) {
                // name exists
                alert('Name already exists');
                return true;
            } else if (persons.data[i].email == obj.email) {
                // email exists
                alert('Email already exists');
                return true;
            } else if (persons.data[i].mobile == obj.mobile) {
                // mobile exists
                alert('Mobile already exists');
                return true;
            } else {
                return false;
            }
        }
    }
}

function addPersonsIfExists() {
    let persons = localStorage.getItem('persons');

    if (persons) {
        // if persons exists
        persons = JSON.parse(persons);

        for (let i = 0; i < persons.data.length; i++) {
            addToScreen(persons.data[i]);
        }
    }
}

function addToScreen(personData) {
    if (first) {
        first = false;
        personsList.style.display = 'block';
        personsList.children[0].children[0].innerHTML = personData.id;
        personsList.children[0].children[2].innerHTML = personData.name;
        personsList.children[0].children[4].innerHTML = personData.email;
        personsList.children[0].children[6].innerHTML = personData.mobile;
    } else {
        let newListItem = personsList.children[0].cloneNode(true);

        // console.log(newListItem);

        newListItem.children[0].innerHTML = personData.id;
        newListItem.children[2].innerHTML = personData.name;
        newListItem.children[4].innerHTML = personData.email;
        newListItem.children[6].innerHTML = personData.mobile;

        personsList.append(newListItem);
    }
}

function deletePerson() {
    let persons = localStorage.getItem('persons');
    searchId.value = searchId.value.trim();
    if (persons) {
        persons = JSON.parse(persons);
        // console.log(persons);
        for (let i = 0; i < persons.data.length; i++) {
            if (searchId.value == personsList.children[i].children[0].innerHTML) {
                // ID exists
                // console.log(personsList.children[i].children[0].id);
                // personsList.children[i].children[0].style.border = '1px solid red';
                if (confirm('Are you sure ?')) {
                    personsList.children[i].remove();
                    for (let i = 0; i < persons.data.length; i++) {
                        if (persons.data[i].id == searchId.value) {
                            // id exists
                            persons.data.splice(i, 1);
                            localStorage.setItem('persons', JSON.stringify(persons));
    
                            break;
                        }
                    }
                } else {
                    // personsList.children[i].children[0].style.backgroundColor = 'none';
                }

                return;
            }
            // console.log();
        }

        window.alert('ID not found.');
    }
}

function showSinglePerson() {
    if (searchId.value) {
        let persons = localStorage.getItem('persons');

        if(persons) {
            // already exists
            // console.log('already exists');
            persons = JSON.parse(persons);
            for (let i = 0; i < persons.data.length; i++) {
                if (searchId.value == persons.data[i].id) {
                    // console.log('match found')

                    console.log(singlePersonDiv.children[0]);
                    // ID exists
                    singlePersonDiv.children[0].children[0].innerHTML = `ID: ${persons.data[i].id}`;
                    singlePersonDiv.children[0].children[2].innerHTML = `Name: ${persons.data[i].name}`;
                    singlePersonDiv.children[0].children[4].innerHTML = `Email: ${persons.data[i].email}`;
                    singlePersonDiv.children[0].children[6].innerHTML = `Mobile: ${persons.data[i].mobile}`;

                    singlePersonDiv.style.display = 'flex';
                }
            }
        } else {
            // no person exists
            alert('No people exists.');
        }

    } else {    
        alert('Enter valid ID.');
    }
}