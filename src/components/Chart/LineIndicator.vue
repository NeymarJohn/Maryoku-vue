<template>  
<div >
<div class='indecator-event-block' v-if='isRate'>
<div class='indicator-event-info-block-rate'>
<span class='indicator-event-type-title-rate'>{{categoryEvent}}</span>
</div>
<div><span class='indicator-event-info-number-currentV'>{{`${Math.floor(leftWidth)}%`}}</span></div>
</div>
<div class='indecator-event-block' v-else>
<div class='indicator-event-info-block'>
<div class='indicator-event-type-title'>{{typeEvent}}</div>
<div class='indicator-event-date-title'>{{eventDate}}</div>
</div>
<div><span class='indicator-event-info-number-currentV'>{{currentValue}}</span>/<span class='indicator-event-info-number-total'>{{total}}</span></div>
</div>           
<div class='indicator-block'>
<div class='indicator-line' :class='leftIndicatorStyle' :style="{  width: leftWidth + '%' }"/>
<div class='indicator-line' :class='rightIndicatorStyle' :style="{  width: rightWidth + '%' }"/>
</div>
</div>
</template>
<script>
    export default {
        name: "LineIndicator",                
        data(){
            return{
                
            }
        },
        props: {
            text:String,
            buttonStyle:String,
            onClick:Function,            
            total:String,
            currentValue:String,
            leftSide:Number,
            leftIndicatorStyle:String,
            rightIndicatorStyle:String,
            isRate:Boolean,
            eventDate:{type:String, default:''},
            typeEvent:String,
            categoryEvent:String
        },
        computed:{
             leftWidth(){                  
                     if(this.currentValue*100/this.total){
                         return this.currentValue*100/this.total
                     }else{
                         return 0
                     }         
             },
             rightWidth(){
                  if(this.currentValue&&this.total){
                     return 100-this.currentValue*100/this.total
                 }else{
                     return 100
                 }                          
                 
             }
        }
        ,
        methods:{
           
        } 
    };
</script>
<style lang="scss">
    .indicator-block{
        display: flex;
        margin: 5px 0px

    }
    .icon-control-panel{
        cursor:pointer;
    }
    .indicator-line{       
        height: 12px;;
    }
    .indecator-event-block{
        display: flex;
        justify-content: space-between;
    }
    .indicator-event-date-title{
       font-size: 0.64rem;
        font-weight: 500;
        color:#c6c6c6 
    }
    .indicator-event-type-title{
       font-size: 0.64rem;
        font-weight: 500;
        color:#c6c6c6 
    }
    .indicator-event-info-block{
        display:flex;
        flex-direction: column;
        line-height: 0.84rem;
    }
    .indicator-event-info-number-total{
        font-weight: 500;
        color: #c6c6c6;
    }
    .indicator-event-info-number-currentV{
        color:black;
        font-weight: 500;
    }
    .indicator-event-info-block-rate{
        display:flex;
        flex-direction: column;
        line-height: 0.84rem;
            justify-content: center
    }
    .indicator-event-type-title-rate{
        font-size: 0.85rem;
        font-weight: 500;
        color:#c6c6c6
    }
    .right-side-indicator{
    background: #f4f4f4;
  }
  .left-side-indicator-participants{
    background: #bce9fc;
  }
  .left-side-indicator-rate{
    background:#aff3e1;
  }
</style>

