<template>
  <div>
    <md-card>
      <md-card-header class="md-card-header-icon md-card-header-green">
        <div class="card-icon" style="padding: 12px;">
          <md-icon>fastfood</md-icon>
        </div>
        <h4 class="title">Dietary Preferences</h4>
      </md-card-header>

      <md-card-content>

        <div class="md-layout" style="margin-top:83px; margin-bottom:91px;">
          <div class="md-layout-item" v-for="(item,index) in dietaryIconOnList" >
            <img :src="`static/img/dietary/${item.on}.png`" @click="toggleFlag(index)" v-if="item.flagOn">
            <img :src="`static/img/dietary/${item.off}.png`" @click="toggleFlag(index)" v-if="!item.flagOn">
          </div>
          
        </div>
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
  import {
    Collapse
  } from "@/components";

  export default {
    components: {
      Collapse
    },

    data(){
      return{
        showOnIcon:true,
        showOffIcon:false,
        dietaryIconOnList:[
          {
            on:"eco_off",
            off:"eco_on",
            flagOn:true
            
          },
          {
            on:"egg_free_off",
            off:"egg_free_on",
            flagOn:true
            
          },
          {
            on:"gluten_free_off",
            off:"gluten_free_on",
            flagOn:true
          },
          {
            on:"gmo_free_off",
            off:"gmo_free_on",
            flagOn:true
          },
          {
            on:"kosher_off",
            off:"kosher_on",
            flagOn:true
          },
          {
            on:"lactose_free_off",
            off:"lactose_free_on",
            flagOn:true
          }
          
        ]
      }
    },

    methods:{
      toggleFlag(index){
        this.dietaryIconOnList[index].flagOn=!this.dietaryIconOnList[index].flagOn
      }
    }
    
  }
</script>
<style lang="scss" >
  .add-date{
    width: 66px;
    height: 12px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #999999;
  }
  .header-icon-dietary {
    width: 63px;
    height: 64px;
    border-radius: 3px;
    box-shadow: 0px 4px 20px 0 rgba(0, 0, 0, 0.14);
    background-image: linear-gradient(to right, #65ba69, #43a047 100%);
  }

  .dierty-constraints-main{
    width: 349px;
    height: 212px;
    border-radius: 6px;
    box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.14);
    background-color: #ffffff;
  }

</style>
