<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem>
          <Button type="primary" icon="ios-compose-outline" @click="importModal=true">输入参数</Button>
          <Button type="primary" icon="archive" @click="outportResult">输出结果</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 输入参数弹窗 -->
    <Modal  title="请输入各项指标的检测结果" v-model="importModal"  :mask-closable="false" width="800">
      <Form :label-width="150" label-position="left" :model="orderObj" :rules="ruleValidate" ref="orderForm" style="height:100%;padding-right:5px">
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="铅(Pb)：" prop="id" style="margin-bottom:0px">
                  <Input v-model="orderObj.Pb" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="铬(Cr)：" prop="name" style="padding-left: 10px;margin-bottom:0px">
                      <Input v-model="orderObj.Cr"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="砷(As)：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.As" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="NOx：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.NOx"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="其他挥发性有机污染物：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.OtherVOP" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="锑(Sb)：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.Sb"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="锑(Sb)：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.Sb" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="汞(Hg)：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.name"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="锑(Sb)：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.Sb" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="钡(Ba)：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.Ba"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="硝基多环芳烃：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.XJDHFT" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="炎症因子、细胞因子：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.YZXBYZ"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="镉(Cd)：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.Cd" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="硒(Se)：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.Se"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="SO2：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.SO2" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="其他多环芳烃：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.OtherDHFT"  :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
              <Col span="12">
              <FormItem label="其他物质：" prop="id" style="margin-top:20px;margin-bottom:0px">
                  <Input v-model="orderObj.OtherWZ" :placeholder="placeholder"/>
              </FormItem>
              </Col>
                <Col span="12">
                  <FormItem label="其他多环芳烃：" prop="name" style="margin-top:20px;margin-bottom:0px;padding-left: 10px;">
                      <Input v-model="orderObj.OtherDHFT" :placeholder="placeholder"/>
                  </FormItem>
              </Col>
          </Row>
      </Form>
      <Row>
        <!-- <Col span="8">
          <Form :model="formImport" :label-width="120" >
            <FormItem label="铅(Pb)">
                <Input v-model="formImport.Pb" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="铬(Cr)">
                <Input v-model="formImport.Cr" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="砷(As)">
                <Input v-model="formImport.As" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="NOx">
                <Input v-model="formImport.NOx" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="其他挥发性有机污染物">
                <Input v-model="formImport.OtherVOP" :placeholder="placeholder"></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="8">
          <Form :model="formImport" :label-width="80">
            <FormItem label="汞(Hg)">
                <Input v-model="formImport.Hg" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="锑(Sb)">
                <Input v-model="formImport.Sb" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="钡(Ba)">
                <Input v-model="formImport.Ba" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="硝基多环芳烃">
                <Input v-model="formImport.XJDHFT" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="炎症因子、细胞因子">
                <Input v-model="formImport.YZXBYZ" :placeholder="placeholder"></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="8">
          <Form :model="formImport" :label-width="80">
            <FormItem label="镉(Cd)">
                <Input v-model="formImport.Cd" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="硒(Se)">
                <Input v-model="formImport.Se" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="SO2">
                <Input v-model="formImport.SO2" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="其他多环芳烃">
                <Input v-model="formImport.OtherDHFT" :placeholder="placeholder"></Input>
            </FormItem>
            <FormItem label="其他物质">
                <Input v-model="formImport.OtherWZ" :placeholder="placeholder"></Input>
            </FormItem>
          </Form>
        </Col> -->
      </Row>
      <div slot="footer">
        <Button type="ghost" @click="onClose">取消</Button>
        <Button type="primary" @click="onSubmit">提交</Button>
      </div>
    </Modal>
    <!-- 输出结果弹窗 -->
    <Modal title="解析结果" v-model="outportModal" width="800">
      <Table :columns="columns1" :data="data1"></Table>
    </Modal>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
export default {
  components:{
  },
  data(){
    return{
      formInline:{},
      orderObj: {
        Pb: '',
        Cr: '',
        As: '',
        NOx: '',
        OtherVOP: '',
        Hg: '',
        Sb: '',
        Ba: '',
        XJDHFT: '',
        YZXBYZ: '',
        Cd: '',
        SO2: '',
        OtherDHFT: '',
        OtherWZ: '',
      },
      ruleValidate:rules.user,
      importModal:false,
      outportModal:false,
      placeholder:"请输入指标值",
      columns1:[
        {
          title:"检验标志物",
          // key:"inspectionSign"
          key:"检验标志物"
        },
        {
          title:"含量",
          key:"含量"
          // key:"content"
        },
        {
          title:"正常含量",
          key:"正常含量"
          // key:"normalContent"
        },
        {
          title:"超标含量",
          key:"超标含量"
          // key:"exceedContent"
        },
        {
          title:"超标原因",
          key:"超标原因",
          width:200
          // key:"exceedReason "
        },
      ],
      data1:[],
      index:-1,
    }
  },
  methods:{
    //关闭弹窗
    onClose(){
      this.importModal = false;
    },
    //提交信息
    onSubmit(){
      this.onClose();
      this.$http.sendMock({url:"ExposureMarkerParsing",
        data:this.formImport},this, res => {
          this.data1 = res.data;
          this.index = 1
      })
    },
    //解析结果
    outportResult(){
        if(this.index == -1){
            this.$Message.info("请先提交参数")
            return
        }
        this.outportModal = true
    }
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
