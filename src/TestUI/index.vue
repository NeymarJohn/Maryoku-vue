<template>
    <div id="editable" contenteditable="true">
    </div>
</template>
<script>
// import {CommentInput} from "@/components";
export default {
  components:{
    // CommentInput,
  },
  props:{

  },
  data(){
      return {
        recordingData: [
            {value: 60, color: '#ffffff'},
            {value: 25, color: '#22cfe0'},
            {value: 15, color: '#fec02d'},
        ],
        innerHtml: '',
        text: '',
        highlight : 'Lorem',
      }
  },
  mounted() {
    // let el = document.getElementById("editable")
    // let range = document.createRange()
    // let sel = window.getSelection()
    //
    // range.setStart(el.childNodes[2], 5)
    // range.collapse(true)
    //
    // sel.removeAllRanges()
    // sel.addRange(range)
    $("#editable").keypress(this.keypress)
  },
  methods:{
    keypress(e){
      // console.log('keypress', e);
      console.log('innerHtml', e.target.innerHTML);
      console.log('innerText', e.target.outerText);
      this.innerHtml = e.target.innerHTML;
      this.text = e.target.outerText;
      this.adjustText(`\\b${this.highlight}\\w*`);
    },
    adjustText(regexp) {
      let regex = /@([^ ]+)/g
      console.log('adjustText', this.innerHtml.match(regexp));
      $("#editable").innerHTML = this.innerHtml.replace(/@([^ ]+)/g, '<b>@$1</b>')
      // $("#editable").html(this.innerHtml.replace(new RegExp(regexp, 'g'), '<b>$1</b>>'));
      // $("#editable").html(this.innerHtml.replace(new RegExp(regexp, 'g'), '<b>$1</b>>'));


    }
  }
}

</script>
<style lang="scss" scoped>
#editable{
    -moz-appearance: textfield-multiline;
    -webkit-appearance: textarea;
    border: solid 1px #989898;
    padding: 10px;
    font: medium -moz-fixed;
    font-family: "Manrope-regular",sans-serif;
    font-size: 15px;
    height: 100px;
    overflow: auto;
    border-radius: 3px;
    resize: both;
    width: 400px;
    background-color: white;
    color: #050505;
}
.address{
    margin: 0 5px;
    background-color: yellow;
}
</style>
