<template>
  <modal-as-header>
    <template slot="body">
      <div class="congrats">
        <img src="/static/icons/salute.svg">
        <div style="display: inline-block">
          Congratulations!
          <br/>
          First transaction closed.
        </div>
      </div>
      <div class="middle-slot">
        Please fill in your personal account so that
        <br/>
        we can transfer money to you.
      </div>
      <div class="batons-wrapper">
        <p>
          Remind me later
        </p>
        <md-button class="md-vendor">Lets start</md-button>
      </div>
    </template>
  </modal-as-header>

</template>

<script>
import ModalAsHeader from "../ModalAsHeader";
export default {
  name: "FirstTransaction",
  components:{
    ModalAsHeader
  }
};
</script>

<style lang="scss" scoped>
*{
  font-family:'Manrope-Regular';
  text-align: start;
}
.congrats {
  font-size: 22px;
  font-weight: bold;
  color: #0fac4c;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.middle-slot{
  border-left: 1px solid darkgray;
  padding-left: 10px;
}
.batons-wrapper{
  display: flex;
  align-items: baseline;
  flex-direction: row;
  p{
    font-size: 16px;
    font-weight: bold;
    color: #050505;
    text-decoration: underline;
    margin-right: 5px;
  }

}
</style>