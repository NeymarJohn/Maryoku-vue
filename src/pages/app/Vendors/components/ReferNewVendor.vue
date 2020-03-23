<template>
  <div class="refer-new-vendor-wrapper">
    <h6>If you can't, Maybe someone else you know can?</h6>
    <div class="refer-cont">
      <div class="img-cont">
      </div>
      <div class="left-side">
        <h4>Refer a new vendor <br/>and get a commission</h4>
        <p>You have a chance to help us, the client & another vendor.</p>
      </div>
      <div class="right-side">
        <p>
          If the vendor you refer us to will be hired for this event, your will get a commision for your help
        </p>
        <a @click="referModal=true">refer a vendor <md-icon>navigate_next</md-icon></a>
      </div>
    </div>
    <modal v-if="referModal" class="refer-vendor-modal">
      <template slot="header">
        <div class="refer-vendor-modal__header">
          <h3>Refer a new vendor <br/>and get a commission</h3>
          <div class="header-description">
            <p>
              Mark the related service and fill the vendor's details
            </p>
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <md-icon>clear</md-icon>
        </button>
      </template>
      <template slot="body">
        <div class="refer-vendor-modal__body">
          <refer-modal-item :category="`Photographer`"></refer-modal-item>
          <refer-modal-item :category="`Bar`"></refer-modal-item>
          <refer-modal-item :category="`Dj`"></refer-modal-item>
        </div>
      </template>
      <template slot="footer">
        <div class="refer-vendor-modal__footer">
          <a class="cancel" @click="hideModal()">Cancel</a>
          <a class="cool" @click="showThanksModal()">Refer</a>
        </div>
      </template>
    </modal>
    <modal v-if="thanksModal" class="thank-you-modal">
      <template slot="header">
        <div class="thank-you-modal__header">
          <h3>
            Thank You!
          </h3>
          <div class="header-description">
          </div>
        </div>
        <button class="close" @click="hideModal()">
          <md-icon>clear</md-icon>
        </button>
      </template>
      <template slot="body">
        <div class="thank-you-modal__body">
          <p>
            We will let you know if this vendor is hired & credit you for your help!
          </p>
        </div>
      </template>
      <template slot="footer">
        <div class="thank-you-modal__footer">
          <button class="cool" @click="hideModal()">OK, Cool</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal } from '@/components'
  import ReferModalItem from './ReferModalItem.vue'

  export default {
    name: 'refer-new-vendor',
    components: {
      Modal,
      ReferModalItem
    },
    props: {
    },
    data () {
      return {
        referModal: false,
        thanksModal: false
      }
    },
    methods: {
      showThanksModal() {
        this.referModal = false
        this.thanksModal = true
      },
      hideModal() {
        this.referModal = false
        this.thanksModal = false
      }
    },
    created() {

    },
    mounted() {
    },
    computed: {
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .refer-new-vendor-wrapper {
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;

    h6 {
      font-size: 16px;
      font-weight: bold;
      text-transform: none;
    }
    .refer-cont {
      display: flex;
      padding: 55px;
      background-color: #ffffff;
      box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);

      .img-cont {
        margin-right: 33px;
      }
      .left-side {
        padding-right: 36px;
        border-right: 1px solid #f51355;
        width: 60%;

        h4 {
          color: #f51355;
          font-size: 30px;
          font-weight: 800;
          text-transform: capitalize;
          margin-top: 0;
          margin-bottom: 28px;
        }
        p {
          font-size: 14px;
          margin: 0;
        }
      }
      .right-side {
        padding-left: 36px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        p {
          font-size: 20px;
          color: #050505;
          width: 40%;
          margin: 0;
          line-height: 1.55;
        }
        a {
          color: #f51355;
          font-size: 16px;
          font-weight: 600;
          text-transform: capitalize;
          cursor: pointer;

          i {
            color: #f51355;
          }
        }
      }
    }

    .refer-vendor-modal {
      &__header {
        width: 100%;
        padding: 36px 36px 0;
        h3 {
          font-size: 30px;
          color: #f51355;
          font-weight: 800;
          margin: 0;
        }
        .header-description {
          p {
            font-size: 16px;
            font-weight: bold;
            line-height: 1.29;
            margin-top: 43px;
            margin-bottom: 7px;
          }
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 50px;
          color: #050505;
          cursor: pointer;
        }
      }
      &__body {
        padding: 10px 40px 0 40px;
      }
      &__footer {
        border-top: 1px solid #a0a0a0;
        width: 100%;
        text-align: right;
        margin: 0 36px;
        margin-top: -16px;
        padding: 63px 0px 40px 40px;
        .cancel {
          font-size: 16px;
          font-weight: bold;
          color: #050505;
          background-color: transparent;
          padding: 8px 36px;
          cursor: pointer;
          border: none;
        }
      }
    }
    .thank-you-modal {
      &__header {
        width: 100%;
        padding: 36px 53px 0;
        h3 {
          font-size: 30px;
          font-weight: 800;
          color: #f51355;
          margin: 0;
        }
        & + .close {
          background: transparent;
          border: none;
          position: absolute;
          top: 61px;
          right: 60px;
          color: #050505;
          cursor: pointer;
        }
      }
      &__body {
        padding-left: 53px;
        p {
          text-align: left;
          font-size: 20px;
          line-height: 1.55;
          margin: 0;
          margin-top: -4px;
          width: 60%;
        }
      }
      &__footer {
        padding: 10px 40px 40px 40px;
      }
    }
    .cool {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      background-color: #f51355;
      border-radius: 3px;
      padding: 8px 36px;
      cursor: pointer;
      border: none;
    }
  }
</style>
