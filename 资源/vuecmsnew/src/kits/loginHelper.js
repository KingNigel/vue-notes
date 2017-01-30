const KEY = 'LOGIN';

export function getUserId(){
    return sessionStorage.getItem(KEY)
}

export function setUserId(userid){
    sessionStorage.setItem(KEY,userid)
}