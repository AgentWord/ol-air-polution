<template>
  <div class="errPage-container">
    <router-link to="/"> <Button icon='arrow-left' class="pan-back-btn">返回</Button></router-link>
    <Row>
      <Col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>如有需求请联系管理员</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/">回首页</router-link>
          </li>
        </ul>
      </Col>
      <Col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </Col>
    </Row>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
    }
  },
  methods: {
    // back() {
    //   if (this.$route.query.noGoBack) {
    //     this.$router.push({ path: '/login' })
    //   } else {
    //     this.$router.go(-1)
    //   }
    // }
  }
}
</script>

<style scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;

    }
  .errPage-container  .pan-back-btn {
      background: #008489;
      color: #fff;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
    }
   .list-unstyled >   li {
        padding-bottom: 5px;
        list-style: none;
      }
    .list-unstyled>  a {
        color: #008489;
        text-decoration: none;

      }
      .pan-back-btn{
        margin-left: -400px !important;
      }
</style>
