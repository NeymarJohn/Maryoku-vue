import axios from 'axios'

function getReq(){
    return axios({
        method:'get',
        url:`${process.env.SERVER_URL}/1/industries`,
        headers:{'Authorization': `Bearer ${window.localStorage.getItem("manage_id_token")}`}
    })
}
function postReq(endpoint,data){
    return axios({
        method:'post',
        url:`${process.env.SERVER_URL}${endpoint}`,
        headers:{'Authorization': `Bearer ${window.localStorage.getItem("manage_id_token")}`},
        data
    })
}
/*
company part - should post to `/1/onboarding/customer`
employee part - should post to `/1/onboarding/me`
List of industries get from: `/1/industries`
 */
//state
const mockCompany={
    logo:'static/img/reinhart-foodservice-logo.jpg',
    companyName:'Reynholm Industries',
    mainOffice:'San Diego, CA',
    numberOfEmployees: 200,
    industry:'Logistics',
    address: '5th Ave, Corner Pine st.San Diego, CA 19082',
    phone: '12 234 0945',
    email: 'company@example.com',
    domain:'www.example.com.es',
    branches:['Peninsula ave. 15 street, North Drive','Upper Lake street, corner Crest village','75 ave. Darktown 19880']
}


const state={
    user:null,
    industry:[],
    company:mockCompany    
}

//getters
const getters={
    getUser:(state, user,rootState)=>{
    return state.user
    },
    getIndustryList:(state)=>{
        return state.industry
    },
    getCompany:(state)=>{
        return state.company
    }
}

//actions
const actions={
    getUserFromApi({commit,state}, data){        
         commit("setUser" , data)
    },
    async getIndustry({commit,state}){
           try{
            const res= await getReq()
            commit("setIndustries" , res.data)
           }catch(e){               
            commit("setIndustries" , [])
           }       
    },
    async sendCompanyInfo({commit,state}, info){
        try{          
           const res=await postReq('/1/onboarding/me',info)           
        }catch(e){

        }
    },
    async sendOMInfo({commit,state}, om){
        try{          
           const res=await postReq('/1/onboarding/customer',om)           
        }catch(e){

        }
    },
    async sendEvent({commit,state}, event){
        try{          
           const res=await postReq('/1/onboarding/me',event)           
        }catch(e){

        }
    },
    async sendDietary({commit,state}, dietary){
        try{         
           const res=await postReq('/1/onboarding/me',dietary)           
        }catch(e){

        }
    },
    async sendInvitation({commit,state}, email){
        try{          
           const res=await postReq('/1/onboarding/me',email)
           
        }catch(e){

        }
    },
    async sendIndustry({commit,state}, industry){
        try{          
        //    const res=await postReq('/1/onboarding/me',email)
           commit("addIndustry" , industry)
        }catch(e){

        }
    },
    
}

//mutations
const mutations= {
    setUser(state,data){
        state.user=data
    },
    setIndustries(state,industry){
        state.industry=industry
    },
    addIndustry(state,industry){
         state.company.branches.push(industry)
        }
  
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}
