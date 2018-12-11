<template>
  <div class="md-layout">
    <modal v-if="modalOpen" @close="noticeModalHide" class="inspirations-modal">
      <template slot="header">
        <h4 class="modal-title">Inspirations</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="noticeModalHide">
          <md-icon>clear</md-icon>
        </md-button>
      </template>
      <template slot="body">
        <div class="inspiration-block">
          <div class="card-wrapper" v-for="item in inspirations" :key="item.id" @click="openNewTab(item.link)">
            <product-card header-animation="false">
              <img class="img" slot="imageHeader" :src="item.img">

              <h4 slot="title" class="title">
                <a href="#">{{ item.title }}</a>
              </h4>
              <div slot="description" class="card-description">
                Posted by {{ item.author }}
              </div>
              <div slot="description" class="card-company">
                {{ item.company }}
              </div>

              <template slot="footer">
                <div class="price">
                  <h4>{{ item.rating }}/5 <md-icon>star</md-icon></h4>
                </div>
                <div class="stats">
                  <p class="category">
                    <md-icon>inbox</md-icon>
                    #{{ item.category }}
                  </p>
                </div>
              </template>
            </product-card>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
  import { Modal, ProductCard } from "@/components";

  export default {
    name: 'event-modal-inspirations',
    components: {
      Modal,
      ProductCard
    },
    data() {
      return {
        modalOpen: false,
        inspirations: [
          {
            id: 1,
            img: "static/img/shutterstock_289440710.png",
            title: 'Healthy & Tasty',
            author: 'Joan Lee',
            company: 'Wix',
            rating: '3.5',
            category: 'Catering',
            link: '/',
          },
          {
            id: 2,
            img: "static/img/shutterstock_289440710.png",
            title: 'Happy New Year',
            author: 'Tina Turner',
            company: 'PeopleBuzz',
            rating: '4',
            category: 'Space',
            link: '/',
          },
          {
            id: 3,
            img: "static/img/shutterstock_289440710.png",
            title: 'Happy New Year',
            author: 'Tina Turner',
            company: 'PeopleBuzz',
            rating: '4',
            category: 'Space',
            link: '/',
          }
        ]
      }
    },
    methods: {
      noticeModalHide: function () {
        this.modalOpen = false;
      },
      toggleModal: function (show) {
        this.modalOpen = show;
      },
      openNewTab(link) {
        window.open(link, true);
      }
    }
  }
</script>
<style lang="scss">
  .inspirations-modal {
    .modal-container {
      max-width: 400px;
    }
    .modal-body {
      padding-top: 0;
      max-height: 80vh;
      overflow: auto;
    }

    .md-card-header {
      margin: 0 auto !important;

      img {
        max-height: 150px;
        width: auto !important;
      }
    }
    .card-wrapper {
      cursor: pointer;
    }
  }

</style>
