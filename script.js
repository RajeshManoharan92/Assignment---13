document.addEventListener('DOMContentLoaded', CRUD)
var allusers = []
async function CRUD() {
    let response = await fetch("https://62053f31161670001741b6db.mockapi.io/users")
    let data = await response.json()
    allusers = data
    var tbody = document.querySelector('#tbody')
    data.forEach(element => {
        let tr = document.createElement('tr');
        Object.keys(element).forEach(key => {
            let td = document.createElement('td');
            if (key === 'Courses') {
                let ul = document.createElement('ul')
                element[key].forEach(Courses => {
                    let li = document.createElement('li')
                    li.innerText = Courses
                    ul.append(li)
                })
                td.append(ul)
            } else
                td.innerText = element[key]
            tr.append(td)
        })
        tr.innerHTML += `<td> <button class="btn btn-light";  id='edit-${element.id}' data-action='edit' data-id='${element.id}'> EDIT </button> <br></br>
             <button class="btn btn-light";  id='edit-${element.id} class="btn btn-light" ; id='delete-${element.id}' data-action='delete' data-id='${element.id}' > DELETE </button> </td>`
        tbody.append(tr)
    }
    );
}

document.querySelector('#userform').addEventListener('submit', Adddata)
async function Adddata(evt) {
    evt.preventDefault()
    var body = JSON.stringify({
        Name: document.querySelector('#t1').value,
        age: document.querySelector('#t2').value,
        email: document.querySelector('#t3').value,
        Courses: document.querySelector('#t4').value.split(',')
    })
    var id = document.querySelector('#id').value
    if (id) {
        var response = await fetch(`https://62053f31161670001741b6db.mockapi.io/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/JSON' },
            body: body,
        })
        var data = await response.json()
    }
    else {
        var response = await fetch('https://62053f31161670001741b6db.mockapi.io/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            body: body,
        })
        var data = await response.json()
    }
    location.reload()
}

document.querySelector('#usertable').addEventListener('click', action)
async function action(e) {
    e.preventDefault()
    var selectedData = allusers.filter(data => data.id === e.target.dataset.id)[0]
    if (e.target.dataset.action === "edit") {
        console.log(e.target.dataset.action)
        document.querySelector('#t1').value = selectedData.Name
        document.querySelector('#t2').value = selectedData.age
        document.querySelector('#t3').value = selectedData.email
        document.querySelector('#t4').value = selectedData.Courses.join(',')
        document.querySelector('#id').value = selectedData.id
        return;
    }
    if (e.target.dataset.action === "delete") {
        var Del = await fetch(`https://62053f31161670001741b6db.mockapi.io/users/${selectedData.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/JSON' },
        })
        var data = await Del.json()
        location.reload()
    }
}
