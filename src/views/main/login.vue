<template>
  <div class="login"  :style="{backgroundImage: 'url(' + bg2 + ')' }">
  <!-- <div class="login"> -->

    <!-- <a class="example-image-link" href="http://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg" data-lightbox="example-set" data-title="Click the right half of the image to move forward."><img class="example-image" src="http://lokeshdhakar.com/projects/lightbox2/images/thumb-3.jpg" alt=""/></a> -->
    <div class="login-bg">
      <div class="login-header">
        <div class="brand">
          <!-- <a class="example-image-link" href="http://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg" data-lightbox="example-set" data-title="Click the right half of the image to move forward."><img class="example-image" src="http://lokeshdhakar.com/projects/lightbox2/images/thumb-3.jpg" alt=""/></a>
      <a class="example-image-link" href="http://lokeshdhakar.com/projects/lightbox2/images/image-4.jpg" data-lightbox="example-set" data-title="Or press the right arrow on your keyboard."><img class="example-image" src="http://lokeshdhakar.com/projects/lightbox2/images/thumb-4.jpg" alt="" /></a>
      <a class="example-image-link" href="http://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg" data-lightbox="example-set" data-title="The next image in the set is preloaded as you're viewing."><img class="example-image" src="http://lokeshdhakar.com/projects/lightbox2/images/thumb-5.jpg" alt="" /></a>
      <a class="example-image-link" href="http://lokeshdhakar.com/projects/lightbox2/images/image-6.jpg" data-lightbox="example-set" data-title="Click anywhere outside the image or the X to the right to close."><img class="example-image" src="http://lokeshdhakar.com/projects/lightbox2/images/thumb-6.jpg" alt="" /></a> -->
          <!-- <img
            alt   = "logo"
            src   = "@/assets/img/login_logo.png"
            width = "330"
          > -->
          <!-- <div style="font-size:30px;color:#00acac;">长期护理保险护理服务管理系统</div> -->
          <img
            alt     = "logo"
            src     = "@/assets/img/jingbanlogo.png"
            width   = "330"
            preview = '0'
            style   = "cursor:pointer"
          >
        </div>
      </div>
      <div class="login-content">

        <form
          id              = "loginFm"
          @submit.prevent = "submitLogin"
          class           = "margin-bottom-0"
        >
          <div class="form-group m-b-20">
            <input
              type        = "text"
              class       = "form-control input-lg"
              placeholder = "登录账号"
              id          = "loginName"
              name        = "loginName"
              maxlength   = "100"
              value       = ""
              v-model     = "userName"
            >
          </div>
          <div class="form-group m-b-20">
            <input
              type        = "password"
              class       = "form-control input-lg"
              placeholder = "密码"
              id          = "loginPwd"
              name        = "loginPwd"
              maxlength   = "20"
              v-model     = "password"
            >
          </div>
          <div class="checkbox m-b-20">
            <label>
              <input
                type    = "checkbox"
                name    = "remember"
                value   = "1"
                checked = "checked"
                v-model = "remeberMe"
              > <span></span>记住我(下回可自动登录)
            </label>
            <span id    = "err_span" style="color:red;width:100%;height:30px;font-size:16px;"></span>
            <!-- <span
              style = "color: red"
              id    = "err_span"
            ></span> -->
          </div>
          <div class="login-buttons">
            <button
              id    = "submitFinal"
              type  = "submit"
              class = "btn btn-success btn-block btn-lg"
            >登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Bg2 from '@/assets/img/login_banckground.png'
export default {
  inject: ['reload'],
  data() {
    return {
      userName : "",
      password : "",
      remeberMe: 1,
      bg2      : Bg2
    };
  },
  methods: {
    submitLogin() {
      // console.log(this.$store.state.count)
      if(this.remeberMe==false){
        this.remeberMe=0;
      }
      if(this.remeberMe==true){
        this.remeberMe=1;
      }
      this.$axios({
        method: "post",
        url   : `${this.$store.state.globalRouter}/login`,
        data  : {
          loginName: this.userName,
          loginPwd : this.password,
          remember : this.remeberMe
        }
      }).then(res => {
        if (res.data.resultCode == "000000") {
          // alert('登录成功')
          this.$store.state.loginName = res.data.data.fullName;
          this.$store.state.menuList  = res.data.data.menuList;
          this.$store.state.getRouter = res.data.data.menuList;
          this.$store.state.status    = 1;

          localStorage.setItem("userName", res.data.data.fullName);
          localStorage.setItem("router", JSON.stringify(res.data.data.menuList));

          if(this.remeberMe==1 || this.remeberMe=='1'){
             // 存cookie
              var expdate = new Date();   //初始化时间
              expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
              document.cookie = "userName"+"="+this.userName+";expires="+expdate.toGMTString()+";path=/";
              document.cookie = "passWord"+"="+this.password+";expires="+expdate.toGMTString()+";path=/";
          }




          // 路由跳转前进行判断
          let _route = res.data.data.menuList;
          let flage  = 1
          let _path  = "shouye"
if(_route.length>=1){
_route.forEach((item,index)=>{
if(item.children.length>0&&flage){
_path = item.children[0].path;
flage = 0;
// return ;//forEach 中return 无法一次结束所有循环
}
})
}
// console.log(_path)
this.$router.push({ path: "/"+_path });
          // this.$router.push({ path: "/shouye" });
        }else{
          $('#err_span').html(res.data.resultMsg)
        }
      });
    }
  },
  mounted() {
    if (window.localStorage.getItem("router")) {
      window.localStorage.removeItem("router");
      location.reload();
      // this.reload();
    }
    if (document.cookie.length>0){
    var c_start=document.cookie.indexOf("userName=")
    //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
    if (c_start!=-1){
      c_start=c_start + 'userName'.length+1
      var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      this.userName=unescape(document.cookie.substring(c_start,c_end));
      };
      var c_start1=document.cookie.indexOf("passWord=")
    //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
    if (c_start1!=-1){
      c_start1=c_start1 + 'passWord'.length+1
      var c_end1=document.cookie.indexOf(";",c_start1)
      if (c_end1==-1) c_end1=document.cookie.length
      this.password=unescape(document.cookie.substring(c_start1,c_end1));
      }
  }



  },

  computed: {}
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/style.min.css";

.login {
  width     : 100%;
  height    : 100%;
  background: #fff center top no-repeat;
  // background-image: url('http://i4.fuimg.com/598922/81b4f39dc84f7e4b.jpg?ynotemdtimestamp=1531126286789');
  background-size: cover;
}
.login-bg {
  // margin    : 0 auto;
  // background: rgba(50, 65, 78, 0.8) !important;
  height    : 360px;
  position  : absolute;
  top       : 50%;
  margin-top: -180px;
  width     : 100%;
  left: 25%;
}
.login-header {
  position  : static;
  text-align: center;
  padding   : 0;
  left      : auto;
  margin    : 0;
  // padding    : 35px 0;
  padding    : 24px 0;
  top        : -80px;
  font-weight: 300;
  right      : 0;
}
.login-content {
  color  : #999;
  width  : 400px;
  margin : 0 auto;
  padding: 0px 40px;
  .checkbox {
    text-align: left;
  }
  input {
    border: none;
    border-color: rgba(241,239,243,1);
    border-radius: 30px;
    background:rgba(241,239,243,1)
  }
  #submitFinal{
    border-radius: 30px;
    padding: 12px 17px;
  }
}
</style>

