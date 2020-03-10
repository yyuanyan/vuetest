<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像区域-->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="头像">
            </div>
            <!--登录表单区域-->
            <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!--按钮区域-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetloginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                //登录表单的数据绑定对象
                loginForm:{
                    username: 'admin',
                    password: '123456'
                },
                //表单的验证规则
                loginFormRules:{
                    //验证用户名是否合法
                    username: [
                        {required: true, message: '请输入登录名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3到10位', trigger: 'blur'}
                        ],
                    //验证密码是否合法
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3到10位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            //点击重置按钮 重置登录表单
            resetloginForm:function () {
                //console.log(this.$refs);
                // resetFields为Form表单的methods
                this.$refs.loginFormRef.resetFields();
            },
            login:function () {
                this.$refs.loginFormRef.validate(async valid => {
                    // console.log(valid);
                    if (!valid) return;
                    const {data: res} = await this.$http.post('login', this.loginForm);
                    console.log(res);
                    if (res.meta.status !== 200) return this.$message.error("登录失败！");
                    this.$message.success("登陆成功！");
                    /*1、将登陆成功的token存储在sessionStorage里面
                        1.1、项目中出了登录之外的API接口，必须在登陆之后才可以访问
                        1.2、token只能在当前网站打开期间生效，所以将token存储在sessionStorage中*/
                    window.sessionStorage.setItem("token",res.data.token);
                    //通过编程式导航跳转至后台主页，路由地址是/home
                    this.$router.push("/home");
                });
            }
        }
    }
</script>

<style lang="less" scoped>
.login_container{
    background: #2b4b6b;
    height: 100%;
}
    .login_box{
        height: 300px;
        width: 450px;
        background: #ffffff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 130px;
        width: 130px;
        border: 1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #dddddd;
        background: #ffffff;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eeeeee;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>