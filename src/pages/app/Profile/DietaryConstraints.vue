<template>
    <div class="dierty-constraints-main">
        <md-card>
            <md-card-header class="md-card-header-icon ">
                <div class="md-layout">
                    <div class="card-icon  header-icon-dietary">
                        <md-icon style=" text-align: center;">perm_identity</md-icon>
                    </div>
    
                    <div class="md-layout-item  title-My-Events">
                        My Special Dates
                    </div>
                </div>
            </md-card-header>
            <md-card-content>
            

            <div class="md-layout" style="margin-top:83px; margin-bottom:91px;">
                <div class="md-layout-item md-size-20">
                    <md-icon>add_circle_outline</md-icon>
                </div>
                <div class="md-layout-item md-size-20">
                   <md-icon>all_inclusive</md-icon>
                </div>
                <div class="md-layout-item md-size-20">
                    <md-icon>ac_unit</md-icon>
                </div>
                <div class="md-layout-item md-size-20">
                   <md-icon>spa</md-icon>
                </div>
                <div class="md-layout-item md-size-20">
                    <md-icon>sentiment_satisfied_alt</md-icon>
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
