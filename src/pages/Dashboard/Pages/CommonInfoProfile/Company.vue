<template>

  <div class="md-layout" style="margin-left: 160px; margin-right: 160px;">
    <vue-element-loading :active="loading" spinner="ring" color="#FF547C" isFullScreen/>
    <div class="md-layout-item">
      <h2 class="title text-center" slot="title" style="text-align: center;">
        Hey, it's your company
      </h2>
      <signup-card style="padding-top: 32px; padding-bottom: 2px; padding-left: 0;">
        <div class="md-layout-item md-size-5" slot="content-left"></div>
        <div class="md-layout-item md-size-80" slot="content-middle">

          <!-- Company Name -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">
              Company Name
            </label>
            <div class="md-layout-item">
              <md-field>
                <md-input v-model="company_name" type="text" autofocus></md-input>
              </md-field>
            </div>
          </div>

          <!-- Workspace domain -->
          <div class="md-layout" style="display: none;">
            <label class="md-layout-item md-size-35 md-form-label">
              Workspace Domain
            </label>
            <div class="md-layout-item md-size-65">
              <md-field>
                <md-input v-model="workspace_domain" type="text"></md-input>
                <span class="md-suffix">.262days.com</span>
              </md-field>
            </div>
          </div>

          <!-- Company logo -->

          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">
              Company logo
            </label>
            <div class="md-layout-item md-size-65">
              <md-field>
                <input type="file" ref="inputFile" v-on="$listeners" @change="onFileChange"/>
                <md-input v-model="logo_name" type="text" disabled></md-input>
                <span class="md-suffix"><md-button class="md-simple md-rose" style="padding: 0; margin: 0; text-align: right;" @click.native="openPicker">Browse</md-button></span>
              </md-field>
            </div>
          </div>

          <!-- Office Address -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">
              Main Office Address
            </label>
            <div class="md-layout-item">
              <md-field>
                <!--<md-input v-model="main_office_adddress" type="text"></md-input>-->
                <places
                  style="border: none; padding: 0;"
                  v-model="main_office_adddress.label"
                  @change="val => { main_office_adddress.data = val }"
                  :options="{ countries: ['US','IL'] }">
                </places>
              </md-field>
            </div>
          </div>

          <!-- Number of employees -->

          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">
              Number of employees
            </label>
            <div class="md-layout-item">
              <md-field>
                <md-input v-model="number_of_employees" type="number"></md-input>
              </md-field>
            </div>
          </div>

          <!-- Industry -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">
              Industry
            </label>
            <div class="md-layout-item">
              <md-field>
                <md-select v-model="industry" name="industry" id="industry">
                  <md-option v-for="industryItem in industryList" :key="industryItem" :value="industryItem">{{industryItem}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <!-- Website -->
          <div class="md-layout">
            <label class="md-layout-item md-size-35 md-form-label">
              Website
            </label>
            <div class="md-layout-item">
              <md-field>
                <md-input v-model="website" type="text"></md-input>
              </md-field>
            </div>
          </div>

        </div>

        <div class="md-layout-item md-size-5" slot="content-right"></div>

        <div class="md-layout-item md-size-100" style="text-align: right; padding-top: 48px;" slot="footer">
          <div class="md-layout">

            <div class="md-layout-item md-size-100">
              <md-button class="md-simple pull-left" @click="skip">Skip</md-button>
              <md-button class="md-success pull-right" @click="next">Next</md-button>
            </div>
          </div>
        </div>
      </signup-card>
    </div>
  </div>

</template>
<script>
  //MAIN MODULES
  import LightBox from 'vue-image-lightbox'
  import { mapGetters } from 'vuex'

  //HELPER FUNC
  import {isWrong} from '@/utils/helperFunction'

  //MODELS
  import VueElementLoading from 'vue-element-loading';
  import CustomerFile from '@/models/CustomerFile';
  import Customer from '@/models/Customer';
  import Me from '@/models/Me';
  import auth from '@/auth';

  //COMPONENTS
  import InputText from '@/components/Inputs/InputText.vue'
  import Select from '@/components/Select/Select.vue'
  import Title from '@/components/Title/Title.vue'
  import Button from '@/components/Button/Button.vue'
  import Autocomplete from '@/components/Autocomplete/Autocomplete.vue'
  import { SignupCard } from "@/components";
  import Places from 'vue-places';

  export default {
    name:'Employee',
    components:{
      InputText,
      Select,
      Title,
      Button,
      Autocomplete,
      LightBox,
      Places,
      SignupCard,
      VueElementLoading
    },
    data(){
      return{
        auth: auth,
        loading: false,

        company_name:'',
        workspace_domain:'',
        upload_logo:null,
        main_office_adddress: {
          label: '',
          data: {}
        },
        number_of_employees:'',
        industry:'',
        website:'',
        isError:false,
        logo_name:'',
        images:[],
        isImageShow:false,
      }
    },
    attributes () {
      return {
        ...this.$attrs,
        type: this.type,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength
      }
    },
    mounted:function(){
      this.auth.currentUser(this, true, () => {
        this.$store.dispatch("user/getIndustry");
        //const auto =document.getElementById('city_getter');
        //this.autocomplete = new google.maps.places.Autocomplete(auto,{types: ['geocode']});
        let customer = this.auth.user.customer;
        this.company_name = customer.name;
        this.main_office_adddress = {
          label: `${customer.mainAddressLine1 || ''} ${customer.mainAddressLine2 || ''} ${customer.mainAddressCity || ''} ${customer.mainAddressStateRegion || ''} ${customer.mainAddressCountry || ''} ${customer.mainAddressZip || ''}`,
          data: {}
        };
        this.industry = customer.industry;
        this.number_of_employees = customer.numberOfEmployees;
        this.website = customer.website;
        this.workspace_domain = customer.workspaceDomain;
      })
    },
    computed:{
      ...mapGetters({
        industryList: 'user/getIndustryList'
      }),
    },

    methods: {
      next() {
        this.loading = true;
        const that = this;
        new Customer({
          id: this.auth.user.me.customer.id,
          onboarded: true,
          name: this.company_name,
          mainAddressLine1: this.main_office_adddress.data.name,
          mainAddressLine2: '',
          mainAddressCity: this.main_office_adddress.data.administrative,
          mainAddressStateRegion: this.main_office_adddress.data.county,
          mainAddressCountry: this.main_office_adddress.data.country,
          mainAddressZip: this.main_office_adddress.data.postcode,
          numberOfEmployees: this.number_of_employees,
          industry: this.industry,
          website: this.website,
          workspaceDomain: this.workspace_domain
        }).save().then(res => {

          Me.get().then(me => {
            that.auth.user.me = me;
            that.auth.user.customer = me.customer;
          });

          this.moveon();
        });
      },
      skip() {
        this.loading = true;
        new Customer({id: this.auth.user.me.customer.id, onboarded: true}).save().then(res => {
          this.moveon();
        });
      },
      moveon(){
        if (!this.auth.user.me.onboarded){
          this.$router.push({name: 'MeForm'});
        } else {
          this.$router.push({name: 'AnnualPlanner'});
        }
      },
      openPicker(){
        this.$refs.inputFile.click();
      },
      submitForm:function(){
        this.validFunc(this)
        if(this.isError==false){
          const info=isWrong(this,['company_name','main_office_adddress','number_of_employees','industry','website'])
          this.$store.dispatch("user/sendCompanyInfo",info)
          this.$router.push('/invite')
        }

      },
      onChange:function(selectedIndustry){
        alert(2);
        this.industry = selectedIndustry;
      },
      validFunc:function(ctx,required){

        const errorsObj=[]
        if(ctx['company_name']===''){
          errorsObj.push('company_name')
        }
        if(ctx['main_office_adddress']===''){
          errorsObj.push('main_office_adddress')
        }
        if(errorsObj.length!==0){
          ctx.isError=true
        }else{
          ctx.isError=false
        }
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let _this = this;
        console.log(file)
        reader.onload = e => {
          if (true) {
            this.isImageShow = true;
            this.logo_name=file.name
            const newImage={
              src:e.target.result,
              thumb:e.target.result
            }
            this.images.push(newImage)

            //     this.isModalLoading = true;
            //     let _calendar = new Calendar({id: this.$store.state.calendarId});
            //     let editedEvent = new CalendarEvent({id: this.event.id});
            this.logo_name=file.name
            console.log(e.target)
            return new CustomerFile({customerFile: e.target.result}).save().then(result => {
              _this.uploadedImages.push({src: e.target.result, thumb: e.target.result, id: result.id});
              this.isImageShow = true;
              this.logo_name=file.name
              const newImage={
                src:e.target.result,
                thumb:e.target.result
              }
              this.images.push(newImage)


            })
              .catch((error) => {
                console.log(error);
              });

          } else {
            _this.uploadedImages.push({ src: e.target.result, thumb: e.target.result });
          }
        }
        reader.readAsDataURL(file);
      }


    },

  }
</script>
<style lang="scss" scoped>
  input[type="file"] {
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
    border: 0;
  }
</style>
