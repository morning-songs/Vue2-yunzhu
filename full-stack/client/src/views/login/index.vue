<template>
  <div class="login-page">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="LoginFrom"
      class="login-form"
    >
      <h2 class="title">若依后台管理系统</h2>
      <el-form-item prop="username">
        <span class="el-icon"><i class="el-icon-user-solid"></i></span>
        <el-input v-model="loginForm.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="el-icon"><i class="el-icon-lock"></i></span>
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="authCode">
        <span class="el-icon"><i class="el-icon-key"></i></span>
        <el-input
          v-model="loginForm.authCode"
          placeholder="验证码"
          class="auth-code"
          @blur="isRight()"
        >
        </el-input>
        <div class="code-img" @click="getAuthCode()">{{authText}}</div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberpsd">记住密码</el-checkbox>
      <el-form-item class="item-enter">
        <el-button type="primary" class="login-enter is-disabled" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
// 导入发起登录请求的方法
import {loginPost} from "@/api/user"
import {mapActions} from "vuex";
import { changeTitle } from "../../untils/changeTitle";

export default {
  name: "Login",
  data() {
    return {
      // 表单数据源
      loginForm: {
        username: "admin",
        password: "123456",
        authCode: "",
        rememberpsd: false,
      },
      authText: '点击获取',
      rightCode: '',
      oBtn: document.querySelector(".login-page .item-enter .login-enter"),
      // 控件校验规则
      rules: {
        // 对prop同名控件，设置校验规则
        username: [
          // trigger：触发器
          { required: true, message: "请输入用户名", trigger: "blur" }, // trigger: 'blur'：失去焦点后，开始校验
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        authCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 1, max: 2, message: "请输入正确的验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions("user", ["login"]), // 导入user数据模块的login方法

    // 判断验证码是否正确
    isRight() {
      this.oBtn = this.oBtn || document.querySelector(".login-page .item-enter .login-enter");

      if (this.loginForm.authCode && this.loginForm.authCode === this.rightCode) {
        this.oBtn.classList.remove("is-disabled");
        return this.authText = '校验通过';
      } else {
        this.oBtn.classList.add("is-disabled");
        this.getAuthCode(); // 重新获取校验码
        return this.authText = '重新校验';
      }
    },

    // 获取随机数
    getRandom (n) {
        return Math.floor(Math.random() * n);
    },

    // 获取验证码
    getAuthCode () {
      let a = this.getRandom(10),
          b = this.getRandom(10);

      return this.authText = this.operationRandom()(a, b);
    },

    // 获取随机运算结果
    operationRandom() {
      
      return (() => {
        let operationArr = ["+", "-", "x"];
        
        return (a, b) => {
            let random = this.getRandom(3),
                operationChar = operationArr[random];

            switch (random) {
                case 0: 
                    this.rightCode = a + b + '';
                    return `${a} ${operationChar} ${b} = ?`;
                case 1:
                    this.rightCode = a - b + '';
                    return `${a} ${operationChar} ${b} = ?`;
                case 2:
                    this.rightCode = a * b + '';
                    return `${a} ${operationChar} ${b} = ?`;
            }
        }
      })();
    },

    // 点击登录
    submitForm() {
      // 点击登录，将数据提交到后台
      this.$refs.LoginFrom.validate(async (valid) => {
        // 回调参数是一个布尔值：是否通过rules中的校验（前端校验）
        if(!valid) {
          // 不通过，直接结束
          return;
        }
        
        try {
          // 发起登录请求，提交loginForm表单数据，获取登录者数据
          const data = await loginPost(this.loginForm).then((data) => {return data;});
          /*  登录成功
                1、跳转到首页
                2、将得到的token存到本地缓存以及vuex中（页面不刷新，vuex状态不会改变）
          */
          // 登录成功后的异步处理：存入token，跳至首页
          this.login(data);
        } catch (error) {
          // 登录失败
          console.log("登陆失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url("~@/assets/images/login-background.jpg") no-repeat;
  background-size: cover;
}
.login-page .login-form {
  width: 350px;
  padding: 25px 25px 5px;
  text-align: center;
  background-color: #fff;
  border-radius: 6px;
  h2.title {
    margin-bottom: 30px;
    line-height: 20px;
    font-size: 18px;
    color: #707070;
  }
  .el-form-item {
    height: 38px;
    /deep/ .el-form-item__content {
      height: inherit;
      .el-input {
        height: inherit;
      }

      .auth-code {
        float: left;
        width: 220px;
      }
      .code-img {
        box-sizing: border-box;
        float: right;
        width: 100px;
        height: inherit;
        border: 1px solid rgb(7, 124, 7);
        border-radius: 4px;
        cursor: pointer;
      }
      .el-icon {
        height: inherit;
        position: absolute;
        left: 5px;
        z-index: 1;
        color: #c0c4cc;
        i {
          font-size: 16px;
        }
      }
    }
  }
  /deep/ input.el-input__inner {
    height: inherit;
    padding: 0 15px 0 30px;
  }
  .item-enter {
    margin-top: 25px;
    width: 100%;
    height: 36px;
    .login-enter {
      width: 100%;
      height: inherit;
      font-size: 14px;
    }
  }
  .el-checkbox {
    position: relative;
    left: -135px;
  }
}
.footer {
      position: absolute;
      height: 40px;
      line-height: 40px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #fff;
  }
</style>