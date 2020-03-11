<template>
  <div class="proposal-add-files-wrapper">
    <div class="files-cont">
      <div class="item">
        <ul>
          <li>
            <span>Kosher Certificate</span>
            <span>Required</span>
          </li>
          <li>
            <span>
              <md-icon>arrow_upward</md-icon>
              Upload
            </span>
          </li>
        </ul>
      </div>
      <div class="item optional">
        <ul>
          <li>
            <span>Other</span>
            <span>Optional</span>
          </li>
          <li>
            <span>
              <md-icon>arrow_upward</md-icon>
              Upload
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'proposal-add-files',
    components: {
    },
    props: {
    },
    data () {
      return {
      }
    },
    methods: {
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
  .proposal-add-files-wrapper {
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    margin-top: 25px;
    font-family: Manrope;

    .files-cont {
      .item {
        padding: 29px 34px;
        border-bottom: 1px solid #707070;
        ul {
          padding: 0;
          list-style: none;
          margin: 0;
          display: flex;
          justify-content: space-between;

          li {
            color: #050505;
            &:first-child {
              span {
                &:first-child {
                  font-size: 20px;
                  font-weight: 800;
                }
                &:last-child {
                  color: #818080;
                  font-size: 14px;
                  font-weight: 800;
                }
              }
            }
            &:last-child {
              color: #f51355;
              font-size: 16px;
              font-weight: 800;

              i {
                color: #f51355;
              }
            }
          }
        }

        &.optional {
          ul {
            li {
              &:first-child {
                span:first-child {
                  font-size: 20px;
                  font-weight: normal;
                }
              }
            }
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }  
</style>
