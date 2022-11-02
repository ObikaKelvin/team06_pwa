// dummy data
console.log("inclass")
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

class User{
    User(fullName, email, userName, password)
    {
        this.fullName=fullName;
        this.email=email;
        this.userName=userName;
        this.password=password;
    }
}


let signUp= document.getElementById('submitAccount');
signUp.addEventListener('click',(e)=>{    
    let fullName= document.getElementById('fullName');
    let email= document.getElementById('email');
    let userName= document.getElementById('username');
    let password= document.getElementById('password');
    let danger= document.getElementById("danger");
    let emptyField= document.getElementById("emptyField"); 


    if(fullName.value===''||email.value===''||userName.value===''||password.value===''){
        console.log('empty field')
        emptyField.style.display='block';
        danger.style.display='none';
        e.preventDefault();
     }
     else{
        if(userArray.filter(value=>value.userName===userName.value).length>0) {
            danger.style.display='block';
            emptyField.style.display='none';
            e.preventDefault();
        }
        else{
            let newUser=new user1(fullName.value,email.value,userName.value,password.value)
            userArray.push(newUser);
        }
     }
  
})
