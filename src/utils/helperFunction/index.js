
export const validFunc=(ctx,...rest )=>{
    const errors=[]

}

//sort func for sorting wrong value in object

export function isWrong(obj,nameList){
    var data={}
    nameList.forEach(item=>{
    if(obj[item]){data[item]=obj[item]}
    })
    return data
    }


export const cloneObject = obj => {
    return JSON.parse(JSON.stringify(obj))
}
