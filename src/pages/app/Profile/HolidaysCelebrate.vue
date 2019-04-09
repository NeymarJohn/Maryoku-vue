<template>
    <div style="width:100%">
        <md-card>
            <md-card-header class="md-card-header-icon md-card-header-green">
                <div class="card-icon" style="padding: 12px;">
                <md-icon>ballot</md-icon>
                </div>
                <h4 class="title">Holidays I Celebrate</h4>
            </md-card-header>
            <md-card-content>    
                <div class="md-layout">
                    <div class="md-layout-item">
                        <md-checkbox v-model="holidayTypeChristian" value="Christian">Christian</md-checkbox>
                    </div>
                    <div class="md-layout-item">
                        <md-checkbox v-model="holidayTypeJewish" value="Jewish">Jewish</md-checkbox>
                    </div>
                </div>

                <div class="md-layout">
                    <div class="md-layout-item">
                        <md-checkbox v-model="holidayTypeHindu" value="Hindu" >Hindu</md-checkbox>
                    </div>
                    <div class="md-layout-item">
                        <md-checkbox  v-model="holidayTypeMuslim" value="Muslim">Muslim</md-checkbox>
                    </div>
                </div>
            </md-card-content>    
        </md-card>        
    </div>
</template>
<script>
export default {
    data(){
        return{
            holidayTypeChristian:'',
            holidayTypeJewish:'',
            holidayTypeHindu:'',
            holidayTypeMuslim:''
        }
    }
}
</script>
