export function setLoginValues(token,username){
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('username',username);
}

export function getToken(){
    return sessionStorage.getItem('token');
}

export function getUsername(){
    return sessionStorage.getItem('username');
}

export function logout(){
    sessionStorage.clear();
}