<style>
.ivu-radio-wrapper-checked {
  background: #0c92e9 !important;
  color: #fff !important;
}
</style>
<template>
  <div>
    <Button type="ghost" size="small" icon="ios-calendar-outline" @click="chooseDate"></Button>
    <RadioGroup v-model="value" type="button" size="small">
        <Radio label="时"></Radio>
        <Radio label="日"></Radio>
        <Radio label="月"></Radio>
    </RadioGroup>
  </div>
</template>

<script>
export default {
data(){
    return{
        value:'日',
        type:'day',
        finalTime: ["",""],
    }
},
mounted(){
    this.value='日';
    this.$emit('on-select-change',this.type,this.finalTime);
},
methods:{
    chooseDate(){
        this.$Modal.confirm({
            title: "选择时间",
            onOk: () => {
                 this.$emit('on-select-change',this.type,this.finalTime);
            },
            render: h => {
                return h('DatePicker', {
                    props: {
                        type:"daterange",
                        format:"yyyy-MM-dd",
                        placeholder:"请选择日期",
                        value:this.finalTime
                    },
                    style:{
                        width:"100%"
                    },
                    on: {
                        'on-change': (date,date2,date3) => {
                            this.finalTime=date;
                        }
                    }
                });
            }
        });
    }
},
watch:{
    value(newValue,oldValue){
        switch (newValue) {
            case '日':
                this.type='day';
                break;
            case '时':
                this.type='hour';
                break;
            case '月':
                this.type='month';
                break;
            case '寸':
               if(oldValue!="寸"){
                    this.value=oldValue.toString();
               }
                return;
            default:
                break;
        }
        this.$emit('on-select-change',this.type,this.finalTime);

    }
}
}
</script>


