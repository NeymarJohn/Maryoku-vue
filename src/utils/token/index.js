const TOKEN ="user_token"


export const setToken=(token)=>localStorage.setItem(TOKEN,token)

export const getToken=()=>localStorage.getItem(TOKEN)

export const deleteToken=()=>localStorage.removeItem(TOKEN)