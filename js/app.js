const loadphones = (searchText,datalimit)=>{
fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
.then(res=>res.json())
.then(data=>displayphone(data.data,datalimit))
} 

const displayphone = (phones,datalimit)=>{
console.log(phones)

const showall = document.getElementById('showall');

if(datalimit && phones.length >10){
 phones = phones.slice(0,10)
 showall.classList.remove('d-none')
}
else{
showall.classList.add('d-none')
}
const phonescontainer = document.getElementById('phonescontainer');
phonescontainer.innerHTML = '';
const nophone = document.getElementById('nophone');

if(phones.length===0 ){
nophone.classList.remove('d-none')
}
else{
nophone.classList.add('d-none')
}

phones.forEach(phone=>{
console.log(phone)
const carddiv= document.createElement('div');
carddiv.classList.add('col');
const {brand,phone_name,slug,image,} = phone;
carddiv.innerHTML =`
<div class="card h-80">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p> ${slug} </p>
        <p>${brand} </p>
    <button onclick="loadphoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails"> Details </button>
    </div>
    </div>
`
phonescontainer.appendChild(carddiv)
})
// loader spinner of
toggoleSpinner(false)
}

// common function all phone
const proccessSearch = (datalimit)=>{
toggoleSpinner(true)
const searchText =document.getElementById('search').value;
loadphones(searchText,datalimit);
}

document.getElementById('search-btn').addEventListener('click',function(){
// loader spinner start
proccessSearch(10)
})
// loader spinner function
const loader = document.getElementById('loader');
const toggoleSpinner = (isloading)=>{
if(isloading){
loader.classList.remove('d-none');
}
else{
loader.classList.add('d-none')
}
}

// show all button click
document.getElementById('showall-btn').addEventListener('click',function(){
proccessSearch()

})

document.getElementById('search').addEventListener('keypress',function(e){
if(e.key==='Enter'){
proccessSearch(10);
}
})

const loadphoneDetails = (id) =>{
fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
.then(res=>res.json())
.then(data=>displaydetails(data.data))
}
const displaydetails =(details)=>{
console.log(details)
const phonedetails = document.getElementById('phoneDetailsLabel');
phonedetails.innerText=details.brand;
document.getElementById('id').innerText =details.slug;


}
// loadphones();