<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem>
          <Input v-model="formInline.username">
            <Icon type="person" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input>
        </FormItem>
        <FormItem label="时间范围：">
          <Row>
            <Col span="9">
                <DatePicker type="datetime" placeholder="起始时间" v-model="formInline.beginTime"></DatePicker>
            </Col>
            <Col span="1" style="text-align: center">-</Col>
             <Col span="9">
                <DatePicker type="datetime" placeholder="终止时间" v-model="formInline.endTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search">查询</Button>
          <Button type="primary" icon="ios-play">回放</Button>
          <Button type="primary" icon="stats-bars">统计</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
export default {
  components:{ 
  },
  data(){
    return{
      formInline: {
        user: '',
        beginTime: '',
        endTime: '',
      },
      ruleValidate:rules.user,
    }
  },
  methods:{
    getUserModal(){
      this.$store.state.userModalVisible = true;
      var userModalChange = true;
      this.$store.commit("setuserModal",userModalChange);
    },
  },
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  z-index: 100;
  right: 0px;
  height: 55px;
}
</style>
