export function isLogged(){
    const userInfo = JSON.parse(localStorage.getItem("userToken"));
    return userInfo; 
}