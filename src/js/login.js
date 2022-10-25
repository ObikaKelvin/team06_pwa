let user1={
    fullName:"Jack",
    email:"jack123@gmail.com",
    userName:"jack123",
    password:"jack1234",
}

let user2={
    fullName:"Jack",
    email:"jack123@gmail.com",
    userName:"jack123",
    password:"jack1234",
}

let userArray=[user1, user2]

let login= document.getElementById('login');
login.addEventListener('click',(e)=>{    
    let userName= document.getElementById('username');
    let password= document.getElementById('password');
    let noUser= document.getElementById("noUser");
    if(userName.value===''||password.value===''){
        emptyField.style.display='block';
        noUser.style.display='none';
        e.preventDefault();
     }
     else{
        if(userArray.filter(user=>user.userName===userName.value&&user.password===password.value).length==0) {
            noUser.style.display='block';
            emptyField.style.display='none';
            e.preventDefault();
        }
    }
})