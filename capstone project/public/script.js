function inputChanged(){
    document.getElementById("count").innerHTML=document.getElementById("titlevalue").value.length;
}
function performToggle(){
    let state=document.getElementsByClassName("sidebar")[0].style;
    if(state.width=="25%"){
        state.width="0px" ;
        document.getElementById("selectinvisible").classList.add("invisiblecontent");
    }
    else{
        state.width="25%";
        document.getElementById("selectinvisible").classList.remove("invisiblecontent");
    }    
}
let vHeight = innerHeight/4;
let smallWindow = document.getElementsByClassName("openwindow")[0];
if(smallWindow){
smallWindow.style.top = 4;
}
function openWindow(){
    smallWindow.style.display="flex";
    document.getElementById("maindiv").classList.add("staticbackdrop");
}
function closeWindow(){
    smallWindow.style.display="none";
    document.getElementById("maindiv").classList.remove("staticbackdrop");
}
document.getElementsByClassName("enableedit")[0].addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("edittext").disabled=false;
})
document.getElementsByClassName("enableeditsubmit")[0].addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("edittext").disabled=false;
    document.getElementById("eventdelegation").submit();
})
// document.getElementById("eventdelegation").addEventListener("submit",function(event){
//     event.preventDefault();
//     if(event.target.classList.contains("enableeditsubmit")){
//          document.getElementById("edittext").disabled=false;
//          this.submit();
//     }
//     else if(event.target.classList.contains("enableedit")){
//          document.getElementById("edittext").disabled=false;
//    }
//  })
