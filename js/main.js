var nameInput=document.getElementById("name");
var urlInput=document.getElementById("url");
var addbtn=document.getElementById("addbtn");

var tabelbody=document.getElementById("table-body");

var bookmarks;
var mainindex=0;
if(localStorage.getItem("bookmarks")==null){
    bookmarks=[];
}
else{
    bookmarks= JSON.parse(localStorage.getItem("bookmarks")) ;
    displaybook(bookmarks);
}

var nameRagex=/^[A-Za-z]{1,}$/;

function namevalid(){

    if(nameRagex.test(nameInput.value)){
        return true;
    } else{
        return false;
    }

}


var urlRagex=/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;

function urlvalid(){

    if(urlRagex.test(urlInput.value)){
        return true;
    } else{
        return false;
    }

}


nameInput.onkeyup= function(){
    if(namevalid() && urlvalid()){
        addbtn.removeAttribute("disabled")
    }
    else{
        addbtn.disabled ="true";
    }
}


urlInput.onkeyup= function(){
    if(namevalid() && urlvalid()){
        addbtn.removeAttribute("disabled")
    }
    else{
        addbtn.disabled ="true";
    }
}


addbtn.onclick=function(){

    if(addbtn.innerHTML=="update"){
        addbtn.innerHTML="Submit"
        var bookmark={
            name:nameInput.value,
            url:urlInput.value,
         }
      bookmarks.splice(mainindex,1,bookmark);
    }
    else{
        var bookmark={
            name:nameInput.value,
            url:urlInput.value,
         }

         bookmarks.push(bookmark);

    }
  
   localStorage.setItem( "bookmarks" , JSON.stringify(bookmarks) );
   displaybook(bookmarks);
   cleardata();
}


function displaybook(anyArray){
  var  marks="";

  for( var i=0 ; i<anyArray.length; i++){
    marks+=`
    <tr>
    <td>${anyArray[i].name}</td>
    <td><a href="${bookmarks[i].url}"></a><button  class="btn btn-primary "> visit </button></td>

    <td><button  onclick="updatebook(${i})" class="btn btn-info " > Update </button> </td>
    <td><button  onclick="dleletebook(${i})" class="btn btn-primary "> Delelte</button>  </td>


</tr>`
  }
     
  document.getElementById("table-body").innerHTML=marks;
}

function dleletebook(index){
     
    bookmarks.splice(index , 1);
    localStorage.setItem( "bookmarks" , JSON.stringify(bookmarks) );
    displaybook(bookmarks);
}

function cleardata(){
    nameInput.value="";
    urlInput.value="";
}

function updatebook(index){
   
     nameInput.value=bookmarks[index].name;
     urlInput.value=bookmarks[index].url;

     addbtn.innerHTML="update";
     mainindex=index;

}

function search(term){
     var searchbook=[];
     for( var i=0 ; i<bookmarks.length ; i++){
       if(bookmarks[i].name.toLocaleLowerCase().includes(term)) {
        searchbook.push(bookmarks[i])

       }
     }
     displaybook(searchbook)
}

