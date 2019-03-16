<template>
    <div>
      <div class="md-layout">
            <div class="md-layout-item md-size-15">
                <label>
                     Where
                 </label>
            </div>
            <div class="md-layout-item md-size-85" style="padding-left: 0px; ">
                <div>
                    <md-icon style="font-size: 15px !important; padding-right: 1%;">room</md-icon>
                </div>
            </div>
        </div>
    
        <div class="md-layout">
            <div class="md-layout-item md-size-100">
                <p>The main office @ 15 Sunset Blvd. Transportation will be provided from the office. If you're arriving solo, the venue is located @ street name. Parking is available in building garage.
                </p>
            </div>
        </div>
    
    
    
        <div class="md-layout">
            <div class="md-layout-item md-size-15">
                <label>
                    when
                 </label>
            </div>
            <div class="md-layout-item md-size-85" style="padding-left: 0px;">
                <div>
                    <md-icon style="font-size: 15px !important;padding-right: 2%;">alarm</md-icon>
                </div>
            </div>
        </div>
    
        <div class="md-layout">
            <div class="md-layout-item md-size-100">
                <p>
                    March 06, 2019, Wednesday - 1:00 PM
                </p>
            </div>
        </div>
    
    
    
        <div class="md-layout">
            <div class="md-layout-item md-size-27" style="padding-right: 0px;">
                <label>
                    Dress code
                </label>
            </div>
            <div class="md-layout-item md-size-70" style="padding-left: 0px; margin-right: 1%;">
                <div>
                    <md-icon style="font-size: 15px !important;padding-right: 35px;">face</md-icon>
                </div>
            </div>
        </div>
    
        <div class="md-layout">
            <div class="md-layout-item md-size-100">
                <p>
                    Corporate Style
                </p>
            </div>
        </div>
    

        <div class="md-layout " style="margin-bottom:8%; margin-top:2%">
            <div class="md-layout-item md-size-70">
                <div class="md-layout">
                    <div class="md-layout-item md-size-35" style="padding-left: 0px;">
                        <div style="width:50%; height: 100%;">
                            <button class="comming-button" ><span class="comming">Comming</span></button>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-35" style="margin-left: 0px;padding-left: 0px;">
                        <div style="width:50%; height: 100%;">
                         <button class="notcomming-button" > <span class="notcomming">Not coming</span></button>
                    </div>
                    </div>
                </div>    
            </div>
             <div class="md-layout-item">
                    
            </div>
             <div class="md-layout-item">
               
            </div>
        </div>
       
    
        <div class="md-layout">
            <div class="md-layout-item md-gutter ">
                <div style="width:100%;height:100%">
                    <img src="https://www.w3schools.com/w3css/img_lights.jpg" title="">
    
                </div>
            </div>
            <div class="md-layout-item " style="padding-left: 0px;">
                <div>
                    <img src="https://images.pexels.com/photos/237018/pexels-photo-237018.jpeg?cs=srgb&dl=asphalt-autumn-beauty-237018.jpg&fm=jpg" title="">
                </div>
            </div>
            <div class="md-layout-item " style="padding-left: 0px;">
                
                <div class="md-layout md-gutter md-alignment-center-center" style="background-color: #e1dfdf; width: 100%; height: 100%; margin:0 auto;">
                    <div class="md-layout-item" style="text-align:center;">
                        <div class="border-add-photo">
                            <div class="md-layout md-gutter md-alignment-center-center" style="background-color: #e1dfdf; width: 100%; height: 100%; text-align:center;margin:auto;">  
                               <div class="md-layout-item" style="text-align:center;">
                                   <div style="text-align:center;">
                                     <md-icon class="add-photo-icon" style="color:#ffffff;">add</md-icon>
                               </div>
                               
                               </div>
                            </div>
                        </div>
                            <div class="md-layout md-gutter md-alignment-center-center" style="margin-left: 0px;margin-right: 0px;">
                                 <div class="md-layout-item" style="padding-left: 0px;padding-right: 0px;">
                                   <div class="add-photo">add photo</div>
                                </div>
                            </div>
                    </div>
                
                   
                </div>
                  
            </div>
        </div>
    
    
    
        
    </div>
</template>

<script>
    export default {
        props: {
            EventLocation: {
                type: String
            },
            EventDate: {
                type: String
            },
            EventDressCode: {
                type: String
            }
        },
        mounted() {
            console.log('EEEe', this.EventLocation)
        },
    }
</script>

<style lang="scss">
    .test {
        font-size: 20px;
    }
    
    .add-photo {
        width: 67px;
        height: 14px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
        margin-left: 10px;

    }

    .add-photo-icon{
        font-size: 15px !important; 
        margin:auto; 
        padding-right: 20px;
        
    }
    .border-add-photo{
        border-style: dotted;
        border-width: 2px;
         border-color: #ffffff;
         text-align: center;
         margin: auto;
         width: 35px;
         height: 35px;
    }

    .comming-button
    {

     width: 94px;
     height: 26px;
     border-radius: 5px;
     background-color: #fb8f05;
    }

    .notcomming-button{
         width: 94px;
        height: 26px;
        border-radius: 5px;
        background-color: #e1dfdf;

    }

    .comming{
        width: 48px;
        height: 15px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
    }

    .notcomming{
        width: 72px;
        height: 15px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
    }
</style>
