export function getUserInfo(){
    const userInfo = JSON.parse(localStorage.getItem("userToken"));
    return userInfo; 
}

export function isLogged(){
    const userInfo = JSON.parse(localStorage.getItem("userToken"));
    return userInfo != null; 
}