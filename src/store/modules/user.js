import axios from 'axios'
import Industry from '@/models/Industry';
import Me from '@/models/Me';
import Customer from '@/models/Customer';

function getReq(endpoint){
  return axios({
    method:'get',
    url:`${process.env.SERVER_URL}${endpoint}`,
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
  numberOfEmployees: '200',
  industry:'Logistics',
  address: '5th Ave, Corner Pine st.San Diego, CA 19082',
  phone: '12 234 0945',
  email: 'company@example.com',
  domain:'www.example.com.es',
  branches:['Peninsula ave. 15 street, North Drive','Upper Lake street, corner Crest village','75 ave. Darktown 19880']
}


const state={
  user:{
    id: "...",
  username: "...",
  emailAddress: "...",
  firstName: "...",
  lastName: "...",
  displayName: "...",
  pictureUrl: "...",
  locale: "...",
  location: null,
  role: null,
  permissions: null,
  onboarded: false,
  onboardingPath: "OM",
  phoneNumberCountryCode: null,
  phoneNumber: null,
  birthday: null,
  companyStartDate: null,
  importantDates: [
    
  ],
  defaultGroupId: "",
  defaultCalendarId: "",
  },
  industry:[],
  customer:{
    id: "",
    name: "example inc",
    workspaceDomain: "example.262days.com",
    onboarded: false,
    mainAddressLine1: null,
    mainAddressLine2: null,
    mainAddressCity: null,
    mainAddressStateRegion: null,
    mainAddressCountry: null,
    mainAddressZip: null,
    numberOnEmployees: 0,
    industry: null,
    website: "www.example.com",
    logoFileId:"" ,
    files: [
      
    ],
  }
}

//getters
const getters={
  getUser:(state, user,rootState)=>{
    return state.user
  },
  getIndustryList:(state)=>{
    return state.industry
  },
  getCustomer:(state)=>{
    return state.customer
  }
}

//actions
const actions={
   getUserFromApi({commit,state}, data){  
        
    

            Me.get()
            .then(res=>{
                commit("setUser" , res[0])
                commit('setCustomer',res[0].customer)
                Customer.find(res[0].customer.id)
                .then(res=>commit)
                .catch(e=>console.log(e, 'eto customer, error')) 
            }
             
            )
            .catch(e=>console.log(e))
            
           
        //  commit("setUser" , data)
    },
    async getIndustry({commit,state}){
        Industry
        .get()
        .then(res=>{
            commit("setIndustries" , res)
        })
        .catch(e=>{
            commit("setIndustries" , [])
        })
                
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
    async deleteBranchToCompany({commit,state},branch){{
        try{
            commit('deleteBranch', branch)
        }catch(e){
            console.log(e)
        }
    }},
    putUserFromApi({commit,state},data){
        // new Me({id:state.user.id,firstName:'Petya'}).save().then(res=>console.log(res,'true user')).catch(e=>console.log(e,'false user'))
        new Customer({id:state.customer.id,...data}).save().then(res=>console.log(res,'true customer')).catch(e=>console.log(e,'false customer'))
        console.log(data)
    }

}

//mutations
const mutations= {
    setUser(state,data){
        state.user=data
    },
    setIndustries(state,industry){
        state.industry=industry
    },
    setCustomer(state, customer){
        state.customer=customer
    },
    addIndustry(state,industry){
         state.company.branches.push(industry)
        },
    deleteBranch(state,branch){
        const newBranch=state.company.branches.filter(item=>item!==branch)        
        state.company.branches=newBranch
    }    
}

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}
