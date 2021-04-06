<template>
	<!-- @keydown.enter="handleSubmit" -->
	<div class="main">
		<div class="htitle">
			<h1 style="padding-top: 50px;line-height: 2;text-align: center;">大气污染暴露测量与健康风险<br/>解析数据管理平台</h1>
			<!-- <img src="../assets/images/login_center_left.jpg"  style="float: left;padding-left:200px"> -->
		</div>
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<Form ref="loginForm" :model="formItem" :rules="rules">
					<FormItem>
						<Input v-model="formItem.username" placeholder="请输入用户名">
						<span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
						</Input>
					</FormItem>
					<FormItem prop="password">
						<Input type="password" v-model="formItem.password" placeholder="请输入密码">
						<span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                </span>
						</Input>
					</FormItem>
					<FormItem>
						<Button type="primary" long @click="loginin" :loading="isBtnLoading">{{btnText}}</Button>
					</FormItem>
				</Form>
				<!-- <p >没有账号？
					<span class="alreadylogin">免费注册&nbsp;
					<Icon type="ios-arrow-right"></Icon> </span>
				</p> -->
			</Card>
		</div>
	</div>
</template>

<script>
export default {
  data(){
    return{
      formItem :{
        username:'',
        password:'',
      },
      rules:{
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string',min: 6, max:20, message: '密码长度为6-20位', trigger: 'blur' }
        ],
      },
      serviceURL:'http://106.37.181.79/ahr/admin/',
      userID:'',
      isBtnLoading: false
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods:{
    loginin(){ 
      // this.isBtnLoading = true
      // this.$router.push({ path: "/main/individualExpose/arcgismap/TravelReplay"});
      // this.isBtnLoading = false
      var username = this.formItem.username;
      console.log(username);
      //获取用户id
      var url = this.serviceURL + "/user/list/" ;
      var params = "{" + `"flds"`+ ":" + `"name"` +"}";
      var resdata2 = '管理员';
      var whoami='admin';
      if(resdata2 == '管理员'){
        whoami = 'admin';
      }else if(resdata2 == '课题1管理'){
        whoami = 'admin1';
      }else if(resdata2 == '课题2管理'){
        whoami = 'admin2';
      }else if(resdata2 == '课题3管理'){
        whoami = 'admin3';
      }else if(resdata2 == '课题4管理'){
        whoami = 'admin4';
      }else if(resdata2 == '课题5管理'){
        whoami = 'admin5';
      }else{
        whoami = 'youke';

      }
      if(whoami !== 'youke'){
        this.$router.push({ path: "/main/individualExpose/arcgismap/TravelReplay" });
      }else{
        this.$router.push({ path: "/errorPage" });
      }

      // this.$ajax({
      //   method:"post",
      //   url:url,
      //   data:params
      // }).then((response) => {
      //   console.log(response);
      //   var resdata = response.data.result.data;
      //   var dataLen = resdata.length;
      //   for(var i = 0 ; i < dataLen;i++){
      //     var name = resdata[i].name;
      //     if(this.formItem.userName === name){
      //       this.userID = resdata[i].id;
      //     }
      //   }
      //   var url2 = this.serviceURL +" user/" + this.userID +"/";
      //   this.$ajax({
      //     method:'post',
      //     url:url2,
      //     data:params
      //   }).then((response) => {
      //     var resdata2 = response.data.result.data;
      //     if(resdata2 == '管理员'){

      //     }
      //     if(resdata2 == '课题1管理'){

      //     }
      //     if(resdata2 == '课题2管理'){

      //     }
      //     if(resdata2 == '课题3管理'){

      //     }
      //     if(resdata2 == '课题4管理'){

      //     }
      //     if(resdata2 == '课题5管理'){

      //     }
      //   }).catch((error) => {

      // //   })
      // }).catch((error) => {
      //   console.log(error);
      //   this.$Modal.error({
      //     title: '提示',
      //     content: "服务器未启动或当前网络异常，请重试！"
      //   })
      // })
    // },

  //   login() {
  //     var _this = this;
  //     if (!_this.username) {
  //       _this.$message.error('请填写用户名！！！');
  //       return;
  //     }
  //     if (!_this.password) {
  //       _this.$message.error('请填写密码');
  //       return;
  //     }
  //     let loginParams = {name: _this.username, password: _this.password};
  //     _this.isBtnLoading = true;
  //     requestLogin(loginParams).then(res => {
  //       _this.isBtnLoading = false;
  //       if(res.data.token){
  //         util.session('token', res.data);
  //         _this.$emit('login', _this.$router.currentRoute.query.from);
  //       }else{
  //         return Promise.reject({
  //           message: '登录异常！'
  //         });
  //       }
  //     }).catch(util.catchError);
  },
  },
  // created() {
  //   sessionStorage.clear();
  // }
}
</script>

<style scoped>
	.htitle {
		color: hsla(0, 36%, 96%, 0.959);
		font-weight: 400;
		/* float: left; */
	}

	.htitle>h1 {
		font-size: 3.5em;
		letter-spacing: 10px;
		text-shadow: 5px 9px 9px #a79e9e;
	}

	.hspan {
		font-size: 3em;
		margin: 0px 20px;
		letter-spacing: 5px;
		text-shadow: 5px 9px 9px #a79e9e;
	}

	.weifaspan {
		margin-left: 56px;
	}

	.main {
		width: 100%;
		height: 100%;
		/* background: #00b7d3;
  background-color :aquamarine; */
		background-image: url("../assets/images/login_center_left.jpg");
		background-size: cover;
		background-position: center;
		/* position: relative; */
	}

	.login-con {
		position: absolute;
		right: 40%;
		top: 55%;
		-webkit-transform: translateY(-60%);
		transform: translateY(-60%);
		width: 300px;
	}

	.ivu-card-head {
		float: left !important;
	}

	.login-con .form-con {
		padding: 10px 0 0;
	}

	.login-tip {
		font-size: 10px;
		text-align: center;
		color: #c3c3c3;
	}

	.login-con .login-tip {
		font-size: 10px;
		text-align: center;
		color: #c3c3c3;
	}

	.alreadylogin {
		color: #00b7d3;
		cursor: pointer;
	}
</style>
