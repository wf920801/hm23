<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>
                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model="user_name" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click='login' name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        bus
    } from '../../common/commonvue.js'
    export default {
        data() {
            return {
                user_name: 'zhangsan',
                password: '123'
            }
        },
        methods: {
            login() {
                const url = 'site/account/login'
                this.$axios.post(url, {
                    user_name: this.user_name,
                    password: this.password
                }).then(response => {
                    // console.log(response)
                    if (response.data.status === 0) {
                        // console.log('111111111111')
                        // console.log(localStorage.getItem('wantVisitPath'))
                        this.$router.push({
                            path: localStorage.getItem('wantVisitPath')
                        })
                        // 登陆成功了,把登陆状态传给app.vue
                        bus.$emit('loginSuccess')
                    } else {
                        alert(response.data.message)
                    }
                })
            }
        }
    }
</script>