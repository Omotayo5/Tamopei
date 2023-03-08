function createUserAccount(userName,password,email,id){
    let _userName = userName;
    let _password = encryptPass(password);
    let _email = email;
    let _id = id;

    return{
        setUsername(newUsername){
            if(typeof newUsername === "string" && newUsername.length>5){
                _userName = newUsername;
                return true
            }else{
                return false
            }
        },
        setPassword(newPassword){
            if(typeof newPassword === "string" && newPassword.length >8){
                _password = newPassword;
                return true;
            }else{
                return false;
            }
        },
        setEmailAddress(newEmail){
            if(typeof newEmail === "string" && newEmail.includes("@")){
                _email = newEmail;
                return true
            }else  if(newEmail.indexOf("@" === -1)){
                return indexOf("@");
            }
        },
        setNewId(id){
            if(typeof id === "string"){
                _id = id;
                return true;
            }else{
                return false;
            }
        },
        getUserName(){
            return _userName;
        },
        getEmail(){
            return _email;
        },
        getPass(){
            return _password;
        }
    }
}
function encryptPass(pass){
    return pass.split(",").reverse().join("");
}
const userAccount = createUserAccount("Dav","123rex","okiki","1124");
console.log(userAccount.getEmail(), userAccount.getPass())

