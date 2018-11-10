import Vue from 'vue'
import VueRouter from 'vue-router'

//如果是使用模块化的方式来开发，必须写下面的代码
Vue.use(VueRouter)

// 在Vue原型上挂在一个属性 $axios
import axios from 'axios'
//设置baseURL之后，发送请求的时候会把baseURL和路径拼接起来
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true //  让浏览器携带cookie
Vue.prototype.$axios = axios

//导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import order from '../components/order/order.vue'
// import login from '../components/account/login.vue'
// import payorder from '../components/pay/payorder.vue'
// import paysuccess from '../components/pay/paysuccess.vue'
// import vipcenter from '../components/vip/vipcenter.vue'
// import myorders from '../components/vip/myorders.vue'
// import orderinfo from '../components/vip/orderinfo.vue'
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const payorder = () => import(/* webpackChunkName: "payorder" */ '../components/pay/payorder.vue')
const paysuccess = () => import(/* webpackChunkName: "paysuccess" */ '../components/pay/paysuccess.vue')
const vipcenter = () => import(/* webpackChunkName: "vipcenter" */ '../components/vip/vipcenter.vue')
const myorders = () => import(/* webpackChunkName: "myorders" */ '../components/vip/myorders.vue')
const orderinfo = () => import(/* webpackChunkName: "orderinfo" */ '../components/vip/orderinfo.vue')


const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/goodslist'
        }, {
            path: '/goodslist',
            component: goodslist
        }, {
            path: '/goodsinfo/:goodsId',
            component: goodsinfo
        }, {
            path: '/shopcart',
            component: shopcart
        }, {
            path: '/login',
            component: login
        },
        /***下面的路由规则，是需要进行登录校验的 ***/
        {
            path: '/order',
            component: order,
            meta: {
                checkoutLogin: true
            }
        }, {
            path: '/pay',
            component: payorder,
            meta: {
                checkoutLogin: true
            }
        },
        {
            path: '/paysuccess',
            component: paysuccess,
            meta: {
                checkoutLogin: true
            }
        },
        {
            path: '/vipcenter',
            component: vipcenter,
            meta: {
                checkoutLogin: true
            }
        },
        {
            path: '/myorders',
            component: myorders,
            meta: {
                checkoutLogin: true
            }
        },
        {
            path: '/orderinfo',
            component: orderinfo,
            meta: {
                checkoutLogin: true
            }
        },
    ]
})
/**
 * 这个方法可以拦截到所有的路由跳转
 * 如果不调用next，就不会跳转
 */

router.beforeEach((to, from, next) => {

    // ...
    // console.log(to)
    //记录想跳转去的页面
    if (to.path !== '/login') {
        localStorage.setItem('wantVisitPath', to.fullPath)
    }

    if (to.meta.checkoutLogin) {
        // 需要进行登录验证
        // 在这里需要检查一下是否登录，如果登录了，next，
        // 如果没有登录，通过编程式导航 router.push(xxx)
        const url = 'site/account/islogin'
        axios.get(url).then(response => {
            // console.log(response.data)
            if (response.data.code === 'logined') {
                // 表示已经登陆过了
                next()
            } else {
                router.push({
                    path: '/login'
                })
            }
        })
    } else {
        next()
    }
})

//es6中导出一个成员
export default router