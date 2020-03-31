// Your code goes here
let input = document.querySelector('.input');
let search = document.querySelector('.search_btn');
let card = document.querySelector('.card');


function handleClick(e) {
    e.preventDefault();

    if(input.value.trim()) {
        let username = input.value;
        let url = 'https://api.github.com/users/';
        fetchInfo(username,url);
        input.value = '';       
    }
}

function fetchInfo(username,url) {
    var xmlhttp = new XMLHttpRequest();
    let method = "GET"
    url = `https://api.github.com/users/${username}`; 
    xmlhttp.open(method,url,true); // initializes the newly created network request takes true parameter deafult for asynchronous opertion.


  // pass the  retrieved data ( found in xmlhttp.response ) to createUI function.
    xmlhttp.onload = function() {

        if(xmlhttp.status != 404) {
            userDetail = JSON.parse(xmlhttp.response);
            createUI(userDetail);
        } else {
            card.style.visibility = 'visible';
            card.classList.add('errormsg');
            card.innerHTML = `<p style="color: #fff"> User was not found! :( </p>`
        }
    }

    xmlhttp.send();
}

function createUI(object) {
    console.log(object);
   
    card.style.visibility = 'visible';
   
    let addDom = `<div class = "imgWrapper">
                    <img src = "${object.avatar_url}" alt = "profile image">
                </div>

                <div class = "user_info">
                    <p>Name : ${object.name || ""}</p>
                    <p>Id : ${object.id}</p>
                    <p>Bio : ${object.bio || ''}</p> 
                </div>`;
    
    card.innerHTML = addDom;

}

search.addEventListener('click',handleClick);