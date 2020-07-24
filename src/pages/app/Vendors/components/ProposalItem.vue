<template>
  <div class="proposal-item-wrapper">
    <div class="title-cont default" 
      :class="[{'pb-40': isVCollapsed}]" 
      v-if="step<=1"
    >
      <div class="with-subtitle" @click="isVCollapsed=!isVCollapsed">
        <div class="text-cont">
          <h3 class="title"><img :src="img"/>{{category}}</h3>
          <h5 v-if="!isVCollapsed">{{subTitle}}</h5>
        </div>
        <div class="action">
          <img v-if="!isVCollapsed" :src="`${iconUrl}Group 3671 (2).svg`"/>
          <img v-else :src="`${iconUrl}Asset 567.svg`"/>
        </div>
      </div>
      <p v-if="!isVCollapsed">
        Which element would you like to involve in your <strong>{{category}}</strong> proposal?
      </p>
      <div class="sub-items-cont" v-if="!isVCollapsed">
        <span class="prev" @click="prev()" v-if="serviceSlidePos < 0">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
        <div class="sub-items" :style="{'left': `${serviceSlidePos}px`}" ref="servicesCont">
          <select-proposal-sub-item
            :item="s"
            v-for="(s, sIndex) in services"
            :key="sIndex"
          />
        </div>
        <span class="next" @click="next()" v-if="serviceSlidePos >= 0 || (this.servicesWidth + this.serviceSlidePos - 200) > 0">
          <md-icon>keyboard_arrow_right</md-icon>
        </span>
      </div>
      <div class="add-item-cont" v-if="step == 0 && clickedItem && !isVCollapsed">
        <div class="fields-cont">
          <div class="field">
            <span>Description</span>
            <input v-model="serviceItem" readonly class="description"/>
          </div>
          <div class="field">
            <span>QTY</span>
            <input v-model="qty" type="number" min="0" placeholder="" class="qty" @keyup="calculateSubTotal()" />
          </div>
          <div class="field">
            <span>Price per unit</span>
            <input v-model="unit" type="number" min="0" placeholder="" class="priceperunit" @keyup="calculateSubTotal()" />
          </div>
          <div class="field">
            <span>Total</span>
            <input v-model="subTotal" type="number" min="0" placeholder="" class="total"/>
          </div>
        </div>
        <div class="action-cont">
          <a class="cancel" @click="cancel()">Cancel</a>
          <a class="save" @click="saveItem(serviceItem, qty, subTotal)">Add This</a>
        </div>
      </div>
    </div>
    <div class="title-cont dropdown" v-if="step == 2" @click="clickItem(category)">
      <div class="left-side">
        <div class="check-cont">
          <img v-if="isChecked" :src="`${iconUrl}Group 6258 (2).svg`"/>
          <img v-else :src="`${iconUrl}Rectangle 1245 (2).svg`"/>
        </div>
        <h3 class="title"><img :src="img"/>{{category}}</h3>
      </div>
      <div class="right-side">
        <div class="budget-cont">
          <span>Budget</span>
          <span>{{`$${totalOffer()}`}}</span>
        </div>
        <div class="proposal-range-cont">
          <p>You're the First bidder</p>
          <span class="grey" v-if="proposalRange">Proposals range</span>
          <span v-if="proposalRange">{{`$${newProposalRequest.bidRange.low} - $${newProposalRequest.bidRange.high}`}}</span>
        </div>
        <img 
          :src="`${iconUrl}Component 36 (2).svg`"
          :style="`transform: ${isChecked ? 'rotate(90deg)' : ''}`"
        />
      </div>
    </div>
    <div class="sub-items-cont" v-if="step == 2 && isChecked">
      <h3>Which elements would you like to involve in your proposal?</h3>
      <div class="sub-items-cont" v-if="step == 2 && isChecked">
        <span class="prev" @click="prev()" v-if="serviceSlidePos < 0">
          <md-icon>keyboard_arrow_left</md-icon>
        </span>
        <div class="sub-items" :style="{'left': `${serviceSlidePos}px`}" ref="servicesCont">
          <select-proposal-sub-item
            :active="true"
            :item="s"
            v-for="(s, sIndex) in services"
            :key="sIndex"
          />
        </div>
        <span class="next" @click="next()" v-if="serviceSlidePos >= 0 || (this.servicesWidth + this.serviceSlidePos - 200) > 0">
          <md-icon>keyboard_arrow_right</md-icon>
        </span>
      </div>
    </div>
    <div class="add-item-cont" v-if="step == 2 && clickedItem && isChecked">
      <div class="fields-cont">
        <div class="field">
          <span>Description</span>
          <input v-model="serviceItem" readonly class="description"/>
        </div>
        <div class="field">
          <span>QTY</span>
          <input v-model="qty" type="number" min="0" placeholder="" class="qty" @keyup="calculateSubTotal()" />
        </div>
        <div class="field">
          <span>Price per unit</span>
          <input v-model="unit" type="number" min="0" placeholder="" class="priceperunit" @keyup="calculateSubTotal()" />
        </div>
        <div class="field">
          <span>Total</span>
          <input v-model="subTotal" type="number" min="0" placeholder="" class="total"/>
        </div>
      </div>
      <div class="action-cont">
        <a class="cancel" @click="cancel()">Cancel</a>
        <a class="save" @click="saveItem(serviceItem, qty, subTotal)">Add This</a>
      </div>
    </div>
    <div class="editable-sub-items-cont" v-if="(step <= 1 && !isVCollapsed) || (step == 2 && isChecked)">
      <div class="editable-sub-items-header">
        <span>
          Description
        </span>
        <span>
          QTY
        </span>
        <span>
          Price per unit
        </span>
        <span>
          Subtotal
        </span>
      </div>
      <!-- v-for="(req, rIndex) in proposalRequest.requirements.filter( r => services.includes(r.requirementTitle))"  -->
      <editable-proposal-sub-item
        v-for="(req, rIndex) in newProposalRequest.requirements.filter( r => services.includes(r.requirementTitle))" 
        :key="rIndex"
        :item="req"
        :active="true"
        :step="1"
      />
      <div class="tax-discount-wrapper">
        <div class="row">
          <div class="item-cont">
            <div class="plabel">
              <img :src="`${iconUrl}Asset 612.svg`"/>
              <span>Add Discount</span>
            </div>
            <div class="ptitle" v-if="isEditDiscount">
              % Percentage
              <br/>
              <input class="percent-value" v-model="discount" type="number" min="0" max="100" @keyup="setRange(discount, 'discount')"/>
            </div>
          </div>
          <div class="percent-cont">
            <span v-if="!isEditDiscount">{{discount}}%</span>
          </div>
          <div class="price-cont">
            <span>${{totalOffer * discount / 100 | withComma }}</span>
          </div>
          <div class="edit-cont">
            <img class="edit" :src="`${iconUrl}Asset 585.svg`" @click="isEditDiscount=true" v-if="!isEditDiscount"/>
            <a class="cancel" v-if="isEditDiscount" @click="cancelDiscount()">Cancel</a>
            <a class="save" v-if="isEditDiscount" @click="saveDiscount()">Save</a>
          </div>
        </div>
        <div class="row">
          <div class="item-cont">
            <div class="plabel">
              <img :src="`${iconUrl}Asset 613.svg`"/>
              <span>Add Taxes</span>
            </div>
            <div class="ptitle" v-if="isEditTax">
              % Percentage
              <br/>
              <input class="percent-value" v-model="tax" type="number" min="0" max="100" @keyup="setRange(tax, 'tax')"/>
            </div>
          </div>
          <div class="percent-cont">
            <span>{{tax}}%</span>
          </div>
          <div class="price-cont">
            <span>${{totalOffer() * tax / 100 | withComma}}</span>
          </div>
          <div class="edit-cont">
            <img class="edit" :src="`${iconUrl}Asset 585.svg`" @click="isEditTax=true" v-if="!isEditTax"/>
            <a class="cancel" v-if="isEditTax" @click="isEditTax=false;tax=0">Cancel</a>
            <a class="save" v-if="isEditTax" @click="isEditTax=false">Save</a>
          </div>
        </div>
      </div>
      <div class="editable-sub-items-footer">
        <span>
          Total
        </span>
        <span>
          ${{calculatedTotal() | withComma}}
        </span>
      </div>
    </div>
    <div class="upload-files-wrapper" v-if="(step <= 1 && !isVCollapsed) || (step == 2 && isChecked)">
      <div class="title-cont">
        <h3><img :src="`${iconUrl}Asset 608.svg`"/>Upload This Files:</h3><h5>And add additional if you want</h5>
      </div>
      <div class="files-cont">
        <div class="item">
          <div class="left">
            <span class="filename">Legal Requirements</span>
            <span class="req">Required</span>
          </div>
          <div class="right" @click="uploadDocument('legal')" v-if="getFileByTag('legal') == null">
            <img :src="`${iconUrl}Asset 609.svg`"/>Upload
            <input
              type="file"
              class="hide"
              ref="legalDocument"
              accept="application/text, application/pdf"
              @change="onFilePicked"
            />
          </div>
          <div class="right" v-else>
            <span class="filename">{{getFileByTag('legal')}}</span>
            <img class="check" :src="`${iconUrl}Group 3599 (2).svg`"/>
            <img class="remove" :src="`${iconUrl}Group 3671 (2).svg`" @click="removeFileByTag('legal')"/>
          </div>
        </div>
        <!-- <div class="item">
          <div class="left">
            <span class="filename">Legal Requirements</span>
            <span class="req">Required</span>
          </div>
          <div class="right">
            <img :src="`${iconUrl}Asset 609.svg`"/>Upload
          </div>
        </div> -->
        <div class="option">
          <div class="left">
            <span class="filename">Other</span>
            <span class="req">*Optional</span>
          </div>
          <div class="right" @click="uploadDocument('option')" v-if="getFileByTag('option') == null">
            <img :src="`${iconUrl}Asset 609.svg`"/>Upload
            <input
              type="file"
              class="hide"
              ref="optionDocument"
              accept="application/text, application/pdf"
              @change="onFilePicked"
            />
          </div>
          <div class="right" v-else>
            <span class="filename">{{getFileByTag('option')}}</span>
            <img class="check" :src="`${iconUrl}Group 3599 (2).svg`"/>
            <img class="remove" :src="`${iconUrl}Group 3671 (2).svg`" @click="removeFileByTag('option')"/>
          </div>
        </div>
      </div>
    </div>
    <div class="additional-photos-wrapper" v-if="step == 2 && isChecked">
      <div class="title-cont">
        <h3><img :src="`${iconUrl}Asset 605.svg`"/>Upload Additional Photos</h3><h5>(15 photos top, under 20KB)</h5>
      </div>
      <div class="upload-cont">
        <p>You've already uploaded photos of your basic services</p>
        <div class="upload">
          <a class="choose-file" @click="uploadDocument('image')"><img :src="`${iconUrl}Asset 578.svg`"/>Choose File</a><br/>
          <span class="or">Or</span><br/>
          <span>Drag your file here</span>
          <input
            type="file"
            class="hide"
            ref="imageFile"
            accept="image/gif, image/jpg, image/png"
            @change="onFilePicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ProposalRequest from '@/models/ProposalRequest'
  import ProposalRequestFile from '@/models/ProposalRequestFile'

  import InputProposalSubItem from '@/components/Inputs/InputProposalSubItem.vue'
  import SelectProposalSubItem from './SelectProposalSubItem.vue'
  import EditableProposalSubItem from './EditableProposalSubItem.vue'

  export default {
    name: 'proposal-item',
    components: {
      InputProposalSubItem,
      SelectProposalSubItem,
      EditableProposalSubItem
    },
    props: {
      category: String,
      isCollapsed: Boolean,
      isDropdown: Boolean,
      proposalRange: Boolean,
      subTitle: String,
      img: String,
      step: Number,
      services: Array,
      proposalRequest: Object,
    },
    data () {
      return {
        isAllFilledInfo: false,
        iconUrl: 'http://static.maryoku.com/storage/icons/NewSubmitPorposal/',
        isVCollapsed: false,
        isChecked: false,
        isEditDiscount: false,
        isEditTax: false,
        clickedItem: false,
        discount: 0,
        tax: 0,
        serviceItem: null,
        qty: 0,
        unit: 0,
        subTotal: 0,
        newProposalRequest: {},
        files: [],
        docTag: null,
        serviceSlidePos: 0,
        servicesWidth: 0,
      }
    },
    methods: {
      clickItem(category) {
        this.isChecked = !this.isChecked

        this.$root.$emit('update-additional-services', category)
      },
      setRange(value, type) {
        let val = value

        if (value > 100) {
          val = 100
        } 
        if (value < 0) {
          val = 0
        }
        if (type=='tax') {
          this.tax = val
        } else {
          this.discount = val
        }
      },
      cancel() {
        this.clickedItem = !this.clickedItem
      },
      saveItem(title, qty, price) {
        this.clickedItem = !this.clickedItem
        this.newProposalRequest.requirements.push({
          comments: [],
          dateCreated: '',
          includedInPrice: true,
          itemNotAvailable: false,
          price: price,
          priceUnit: 'qty',
          proposalRequest: {id: this.proposalRequest.id},
          requirementComment: null,
          requirementId: '',
          requirementMandatory: false,
          requirementPriority: null,
          requirementTitle: title,
          requirementValue: `${qty}`,
        })
        this.$root.$emit('update-proposal-budget-summary', this.newProposalRequest, {})
      },
      calculateSubTotal() {
        this.subTotal = this.qty * this.unit
      },
      saveDiscount() {
        this.isEditDiscount=false
        this.$root.$emit(
          'update-proposal-budget-summary', 
          this.newProposalRequest, 
          {
            category: this.category,
            value: this.discount
          }
        )
      },
      cancelDiscount() {
        this.isEditDiscount=false;
        this.discount=0
      },
      uploadDocument(fileId = null) {
        this.docTag = fileId
        this.selectedImage = typeof fileId !== 'object' ? fileId : null
        if (this.docTag == 'legal') {
          this.$refs.legalDocument.click()
        } else if (this.docTag == 'image') {
          this.$refs.imageFile.click()
        }else {
          this.$refs.optionDocument.click()
        }
      },
      onFilePicked (event, tag) {
        let file = event.target.files || event.dataTransfer.files

        if (!file.length) {
          return
        }
        if (file[0].size <= 5000000) {
          // 5mb
          this.createProposalFile(file[0], tag)
        } else {
          this.alretExceedPictureSize = true
          this.$notify({
            message: "You've Uploaded an Image that Exceed the allowed size, try small one!",
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'warning'
          })
        }
      },
      createProposalFile (file, tag) {
        let reader = new FileReader()
        let vm = this

        reader.onload = e => {
          let proposalRequest = new ProposalRequest({ id: vm.$route.params.id })

          this.files.push({
            tag: this.docTag,
            filename: file.name
          })

          if (this.docTag == 'image') {
            swal({
              title: `You've Uploaded an Image named ${file.name}`,
              text: '',
              type: 'success',
              timer: 3000
            })
          }

          // return new ProposalRequestFile({
          //   vendorProposalFile: e.target.result,
          // }).for(proposalRequest).save().then(result => {
          //   this.isLoading = false
          // }).catch(error => {
          //   this.isLoading = false
          //   console.log(error)
          // })
        }
        reader.readAsDataURL(file)
      },
      getFileByTag(tag) {
        const file = this.files.filter( f => f.tag == tag)
        if (file.length > 0) {
          return file[0].filename 
        } else {
          return null
        }
      },
      removeFileByTag(tag) {
        this.files = this.files.filter( f => f.tag != tag )
      },
      totalOffer () {
        // let total = parseFloat(this.proposalRequest.requirementsCategoryCost)
        let total = 0
        let vm = this
        const requirements = this.newProposalRequest.requirements.filter( 
          r => this.services.includes(r.requirementTitle)
        )
        
        requirements.map(function (item) {
          if (item.price) {
            if (item.priceUnit === 'total') {
              total += parseFloat(item.price)
            } else {
              if (vm.newProposalRequest !=  undefined) {
                total += parseFloat(item.price)
              } 
            }
          }
        })

        return total
      },
      calculatedTotal () {
        let total = this.totalOffer()

        total = total - ( total * this.discount / 100)
        total += total * this.tax / 100

        return total
      },
      prev() {
        this.servicesWidth = this.$refs.servicesCont.clientWidth
        if (this.servicesWidth - this.serviceSlidePos > 0) {
          this.serviceSlidePos += 200
        }
      },
      next () {
        this.servicesWidth = this.$refs.servicesCont.clientWidth
        if (this.servicesWidth + this.serviceSlidePos - 200 > 0) {
          this.serviceSlidePos -= 200
        }
      },
    },
    created() {
    },
    mounted() {
      this.isVCollapsed = this.isCollapsed
      this.newProposalRequest = this.proposalRequest

      this.$root.$on('remove-proposal-requirement', (reqId) => {
        this.newProposalRequest.requirements = this.newProposalRequest.requirements.filter(req => req.id != reqId)
        this.$root.$emit('update-proposal-budget-summary',  this.newProposalRequest, {})
      })

      this.$root.$on('add-service-item', (item) => {
        this.clickedItem = !this.clickedItem
        this.serviceItem = item
        this.qty = this.unit = this.subTotal = 0
      })

      this.$root.$on('clear-slide-pos', (item) => {
        this.serviceSlidePos = 0
      })

      this.servicesWidth = this.$refs.servicesCont.clientWidth
    },
    filters: {
      withComma (amount) {
        return amount ? amount.toLocaleString() : 0
      }
    },
    computed: {
      
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .proposal-item-wrapper {
    border-radius: 3px;
    box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding: 40px 34px 0px 34px;
    font-family: 'Manrope-Regular', sans-serif;
    color: #050505;
    margin: 50px 0 30px 0;

    .title-cont {
      .with-subtitle {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text-cont {
          display: flex;
          align-items: center;
          h3.title {
            font-weight: 800;
            font-size: 30px;
            margin: 0;
            margin-right: 20px; 
            img {
              width: 28px;
              margin-right: 19px;
              position: relative;
              top: -3px;
            }
          }
          h5 {
            font-size: 20px;
            margin: 0;
          }
        }
        .action {
          cursor: pointer;
          img {
            width: 20px;
          }
        }
      }
      p {
        font-size: 16px;
        margin: 0;
        margin-top: 23px;

        strong {
          font-weight: 800;
        }
      }

      &.dropdown {
        padding: 8px 8px 42px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        .left-side {
          width: 100%;
          display: flex;
          align-items: center;

          .check-cont {
            img {
              width: 33px;
            }
          }
          h3 {
            display: inline-block;
            margin: 0;
            font-size: 30px;
            font-weight: 800;

            img {
              width: 34px;
              margin-left: 55px;
              margin-right: 22px;
              position: relative;
              top: -2px;
            }
          }
        }
        .right-side {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;

          .budget-cont {
            margin-left: 4em;
            span {
              color: #818080;
              &:first-child {
                font-size: 14px;
                margin-right: 1rem;
              }
              &:nth-child(2) {
                font-size: 20px;
                font-weight: 800;
              }
            }
          }
          .proposal-range-cont {
            text-align: right;
            margin-left: 65px;
            p {
              margin-top: 0;
              font-size: 14px;
            }
            span {
              font-size: 14px;
              &.grey {
                color: #818080;
              }
              &:last-child {
                color: #050505;
                font-weight: 800;
              }
            }
          }
          img {
            width: 12px;
            margin-left: 50px;
          }
        }
      }
    }

    .add-item-cont {
      .fields-cont {
        display: flex;
        .field {
          flex: 1;
          margin-right: 1em;
          span {
            font: 800 16px 'Manrope-Regular', sans-serif;
          }
          input {
            text-transform: capitalize;
            width: 100%;
            padding: 20px 28px;
            border: 1px solid #707070;
            font: normal 16px 'Manrope-Regular', sans-serif;
            color: #050505;
          }
          &:first-child {
            flex: 3;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .sub-items-cont {
      padding: 1rem 0;
      overflow: hidden;
      position: relative;

      h3 {
        font-size: 30px;
        font-weight: 800;
        padding-bottom: 2rem;
        margin: 0;
      }
      .sub-items {
        // display: flex;
        display: block;
        position: relative;
        white-space: nowrap;
        width: calc(100% - 2rem);
        // overflow-x: auto;
      }
      .prev {
        position: absolute;
        cursor: pointer;
        z-index: 99;
        left: 0;
        background: #fff;
        padding: 1.5rem 0;
        top: 0;
        i {
          color: #f51355!important;
        }
      }
      .next {
        z-index: 99;
        position: absolute;
        cursor: pointer;
        right: 0;
        background: #fff;
        padding: 1.5rem 0;
        top: 0;
        i {
          color: #f51355!important;
        }
      }
    }

    .add-attributes-cont {
      display: flex; 
    }

    .action-cont {
      text-align: right;
      margin-top: 35px;
      a {
        font-size: 16px;
        font-weight: 800;

        &.clear {
          color: #050505;
          padding: 8px 32px;
          margin-right: 1rem;
        }
        &.add {
          background-color: #d5d5d5;
          border-radius: 3px;
          padding: 8px 32px;
          color: #ffffff;
          max-height: 38px;
          cursor: pointer;

          &.active {
            background-color: #f51355;
            color: #ffffff;
          }
        }
      }
    }

    .editable-sub-items-cont {
      margin-top: 2rem;

      .editable-sub-items-header {
        border-top: 1px solid #707070;
        padding: 40px 40px 30px 40px;
        
        span {
          display: inline-block;
          font-size: 16px;
          font-weight: 800;

          &:first-child {
            width: 40%;
          }
          &:nth-child(2) {
            width: 10%;
          }
          &:nth-child(3) {
            width: 15%;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .tax-discount-wrapper {
        .row {
          padding: 35px;
          border: 2px solid #d5d5d5;
          border-bottom: none;
          display: flex;
          align-items: center;

          .item-cont {
            width: calc(50% + 26px);
            display: flex;
            align-items: center;

            .plabel {
              flex: 1;
            }
            .ptitle {
              font: normal 14px 'Manrope-Regular', sans-serif;
              text-align: center;
              flex: 1;

              .percent-value {
                min-width: 10rem;
                border: 1px solid #dddddd;
                margin-top: 1rem;
                text-align: center;
                margin-left: 2em;
              }
            }
          }
          .percent-cont {
            width: calc(15% - 14px);
          }
          .price-cont {
            width: calc(15% + 1px);
          }
          .edit-cont {
            text-align: right;
            width: 20%;
            .edit {
              width: 21px;
              margin-right: 31px;
              cursor: pointer;
            }
          }

          img {
            width: 15px;
            margin-right: 22px;

            &.edit {
              cursor: pointer;
            }
          }
          span {
            color: #818080;
            font-size: 16px;
            font-weight: 800;
          }
        }
      }
      .editable-sub-items-footer {
        box-shadow: 0 3px 41px 0 rgba(0, 0, 0, 0.08);
        background-color: #d5d5d5;
        padding: 21px 40px;
        border: 2px solid #d5d5d5;
        border-bottom: none;

        span {
          font-size: 20px;
          font-weight: 800;
          display: inline-block;

          &:first-child {
            width: calc(60% + 34px);
          }
          &:last-child {
            width: calc(35% - 5px);
          }
        }
      }
    }

    .upload-files-wrapper {
      margin-top: 60px;
      margin-left: -34px;
      margin-right: -34px;
      padding: 60px 0 10px 0;
      border-top: 1px solid #707070;

      .title-cont {
        display: flex;
        align-items: flex-end;
        margin-bottom: 25px;
        padding: 0 34px;
        
        h3 {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          margin-right: 10px;
          img {
            width: 24px;
            margin-right: 10px;
          }
          margin-right: 10px;
        }
        h5 {
          margin: 0;
          font-size: 14px;
          position: relative;
          top: -6px;
        }
      }
      .files-cont {
        .item, .option {
          display: flex;
          justify-content: space-between;
          padding: 30px 34px;
          border-bottom: 1px solid #707070;

          .left {
            span {
              font-weight: 800;
              &.filename {
                font-size: 20px;
                margin-right: 23px;
              }
              &.req {
                color: #818080;
                font-size: 14px;
              }
            }
          }
          .right {
            cursor: pointer;
            color: #f51355;
            font-size: 16px;
            font-weight: 800;
            img {
              width: 13px;
              margin-right: 9px;

              &.check {
                width: 32px;
                margin-right: 0;
                margin-left: 2rem;
              }
              &.remove {
                margin-right: 0;
                margin-left: 1rem;
              }
            }
            span {
              &.filename {
                color: #050505;
                text-decoration: underline;
                font: 800 16px 'Manrope-Regular', sans-serif;
              }
            }
          }
        }
        .option {
          margin-bottom: 10px;
          border: none;
          .left {
            span {
              &.filename {
                font-size: 20px;
                font-weight: normal;
              }
            }
          }
        }
      }
    }

    .additional-photos-wrapper {
      margin-left: -34px;
      margin-right: -34px;
      padding: 60px 0 10px 0;
      border-top: 1px solid #707070;

      .title-cont {
        display: flex;
        align-items: flex-end;
        padding: 0 34px;
        
        h3 {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          margin-right: 10px;
          img {
            width: 24px;
            margin-right: 10px;
          }
          margin-right: 10px;
        }
        h5 {
          margin: 0;
          font-size: 14px;
          position: relative;
          top: -6px;
        }
        p {
          font-size: 16px;
          margin: 0;
          margin-left: 72px;
        }
      }
      .upload-cont {
        padding-bottom: 84px;
        p {
          font-size: 16px;
          margin-left: 72px;
          margin-top: 9px;
          margin-bottom: 30px;
        }
        .upload {
          border: 1px dashed #f51355;
          margin: 0 34px;
          padding: 32px;
          cursor: pointer;
          text-align: center;

          a.choose-file {
            font-size: 14px;
            font-weight: 800;
            padding: 8px 24px;
            color: #f51355;
            border: 1px solid #f51355;
            border-radius: 3px;
            display: inline-block;

            img {
              width: 10px;
              margin-right: 8px;
            }
          }
          span {
            display: inline-block;
            &.or {
              padding: 5px 0;
            }
          }
        }
      }
    }
    .pb-40 {
      padding-bottom: 40px;
      cursor: pointer;
    }
    a {
      cursor: pointer;
      padding: 8px 26px;

      &.cancel {
        font: 800 16px 'Manrope-Regular', sans-serif;
        color: #050505;
        background: transparent;
      }
      &.save {
        font: 800 16px 'Manrope-Regular', sans-serif;
        color: white;
        background: #f51355;
        border-radius: 3px;
      }
      &:hover {
        color: #dddddd!important;
      }
    }
    .hide {
      display: none;
    }
  }
</style>
