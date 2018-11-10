<template>
	<div>
		<div class="section">
			<div class="location">
				<span>当前位置：</span>
				<a href="/index.html">首页</a> &gt;
				<a href="/cart.html">购物车</a>
			</div>
		</div>
		<div class="section">
			<div class="wrapper">
				<div class="bg-wrap">
					<!--购物车头部-->
					<div class="cart-head clearfix">
						<h2>
							<i class="iconfont icon-cart"></i>我的购物车</h2>
						<div class="cart-setp">
							<ul>
								<li class="first active">
									<div class="progress">
										<span>1</span> 放进购物车
									</div>
								</li>
								<li class="active">
									<div class="progress">
										<span>2</span> 填写订单信息
									</div>
								</li>
								<li class="last">
									<div class="progress">
										<span>3</span> 支付/确认订单
									</div>
								</li>
							</ul>
						</div>
					</div>
					<!--购物车头部-->
					<div class="cart-box">
						<h2 class="slide-tit">
							<span>1、收货地址</span>
						</h2>
						<div id="orderForm" name="orderForm" url="">
							<div class="form-box address-info">
								<el-form :model="order" :rules="rules" status-icon ref="orderRef" label-width="150px">
									<el-form-item label="收件人姓名: " prop="accept_name">
										<el-input style="width:500px;" v-model="order.accept_name"></el-input>
									</el-form-item>
									<el-form-item label="所属地区: " prop="area">
										<v-distpicker :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value" @selected="onSelected"></v-distpicker>
									</el-form-item>
									<el-form-item label="详细地址: " prop="address">
										<el-input style="width:500px;" v-model="order.address"></el-input>
									</el-form-item>
									<el-form-item label="手机号码: " prop="mobile">
										<el-input style="width:500px;" v-model="order.mobile"></el-input>
									</el-form-item>
									<el-form-item label="电子邮箱: ">
										<el-input style="width:500px;" v-model="order.email"></el-input>
									</el-form-item>
									<el-form-item label="邮政编码: ">
										<el-input style="width:500px;" v-model="order.post_code"></el-input>
									</el-form-item>
								</el-form>
							</div>
							<h2 class="slide-tit">
								<span>2、支付方式</span>
							</h2>
							<ul class="item-box clearfix">
								<!--取得一个DataTable-->
								<li>
									<label>
											<el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
											<em>手续费：0.00元</em>
										</label>
								</li>
							</ul>
							<h2 class="slide-tit">
								<span>3、配送方式</span>
							</h2>
							<ul class="item-box clearfix">
								<!--取得一个DataTable-->
								<li>
									<label>
											<el-radio-group @change="expressChange" v-model="order.express_id">
												<el-radio label="1">顺丰快递<em>费用：20.00元</em></el-radio>
												<el-radio label="2">圆通快递<em>费用：10.00元</em></el-radio>
												<el-radio label="3">韵达快递<em>费用：8.00元</em></el-radio>
												</el-radio-group>
											<span class="Validform_checktip"></span>
										</label>
								</li>
							</ul>
							<h2 class="slide-tit">
								<span>4、商品清单</span>
							</h2>
							<div class="line15"></div>
							<table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
								<tbody>
									<tr>
										<th colspan="2" align="left">商品信息</th>
										<th width="84" align="left">单价</th>
										<th width="84" align="center">购买数量</th>
										<th width="104" align="left">金额(元)</th>
									</tr>
									<tr v-for="item in goodsList" :key="item.id">
										<td width="68">
											<a target="_blank" href="/goods/show-89.html">
												<img :src="item.img_url" class="img">
											</a>
										</td>
										<td>
											<a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
										</td>
										<td>
											<span class="red">
													￥{{item.sell_price}}
												</span>
										</td>
										<td align="center">{{item.buycouny}}</td>
										<td>
											<span class="red">
													￥{{item.sell_price*item.buycouny}}
												</span>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="line15"></div>
							<h2 class="slide-tit">
								<span>5、结算信息</span>
							</h2>
							<div class="buy-foot clearfix">
								<div class="left-box">
									<dl>
										<dt>订单备注(100字符以内)</dt>
										<dd>
											<textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
										</dd>
									</dl>
								</div>
								<div class="right-box">
									<p>
										商品
										<label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
										<label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
									</p>
									<p>
										运费：￥
										<label id="expressFee" class="price">{{order.expressMoment}}</label> 元
									</p>
									<p class="txt-box">
										应付总金额：￥
										<label id="totalAmount" class="price">{{getTotalAmount}}</label>
									</p>
									<p class="btn-box">
										<a class="btn button" @click="goBack">返回购物车</a>
										<a id="btnSubmit" class="btn submit" @click="goToOrder">确认提交</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	// 导入省市区联动的第三方包
	import VDistpicker from 'v-distpicker'
	//  导入本地存储的商品数量
	import {
		getLocalGoods
	} from '../../common/localStorage.js'
	export default {
		components: {
			VDistpicker
		},
		data() {
			// 自定义手机号规则
			var checkMobile = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				}
				if ((/^1[3,4,5,6,7,8][0-9]{9}$/).test(value)) {
					callback()
				} else {
					callback(new Error('手机号输入错误'))
				}
			}
			return {
				goodsList: [], //  商品数组
				totalCount: 0, //总数量
				totalPrice: 0, // 总金额
				order: {
					accept_name: '黄浩',
					area: {
						// 所属区域
						province: {
							code: '440000',
							value: '广东省'
						},
						city: {
							code: '440300',
							value: '深圳市'
						},
						area: {
							code: '440306',
							value: '宝安区'
						}
					},
					address: '庭威402右边倒数第三排第二个位置',
					mobile: 13843889438,
					email: 'huanghao@163.com',
					post_code: '9438',
					payment_id: '6', //  支付方式   默认是 6 
					express_id: '1', //  快速方式  默认是1
					expressMoment: 20, //   快递费 默认是顺丰  20元
					goodsAmount: 0, // 商品总金额   后台需要
					message: '请尽快发货'
				},
				rules: {
					accept_name: [{
						required: true,
						message: '请输入收件人姓名',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '详细地址不能为空',
						trigger: 'blur'
					}],
					//  自定义手机号规则
					mobile: [{
						validator: checkMobile,
						trigger: 'blur'
					}],
					area: [{
						required: true,
						message: '请选择所属地区',
						trigger: 'blur'
					}]
				}
			}
		},
		// 计算属性,计算快递费和商品总费用的和   总金额
		computed: {
			getTotalAmount() {
				return this.order.expressMoment + this.totalPrice
			}
		},
		created() {
			this.getGoodsListData()
		},
		methods: {
			getGoodsListData() {
				const url = `site/validate/order/getgoodslist/${this.$route.query.ids}`
				// console.log(url)
				this.order.goodsids = this.$route.query.ids
				const localGoods = getLocalGoods()
				// 按后台要求写一个对象,保存购买商品的清单
				const tempobj = {}
				// 发送请求
				this.$axios.get(url).then(response => {
					// console.log(response.data.message)
					// 遍历所得商品,利用id获取本地存储的商品数量
					response.data.message.forEach(item => {
						item.buycouny = localGoods[item.id]
						// console.log(item.buycouny)
						// 在遍历里面给清单对象赋值
						tempobj[item.id] = item.buycouny
						this.totalCount += item.buycouny
						this.totalPrice += item.buycouny * item.sell_price
					})
					this.goodsList = response.data.message
					// console.log(this.goodsList)
					// 商品总金额,后台传值需要
					this.order.goodsAmount = this.totalPrice
					// 将商品清单赋值给order里面的cargoodsobj
					this.order.cargoodsobj = tempobj
				})
			},
			onSelected(data) {
				getGoodsListData
				// console.log(data)
				this.order.area = data
			},
			// 切换快递方式,运费发送改变
			expressChange(label) {
				switch (label) {
					case '1':
						this.order.expressMoment = 20
						break
					case '2':
						this.order.expressMoment = 10
						break
					case '3':
						this.order.expressMoment = 8
						break
					default:
						break
				}
			},
			goBack() {
				this.$router.go(-1)
			},
			goToOrder() {
				// console.log(this.$route.query.ids)
				const urlArray=this.$route.query.ids
				// 先里面第三包效验表单输入是否符合
				this.$refs.orderRef.validate((valid) => {
					if (!valid) {
						console.log('error submit!!');
						return
					}
					// console.log(this.order)
					const url = 'site/validate/order/setorder'
					this.$axios.post(url, this.order).then(response => {
						// console.log(this.order)
						if (response.data.status === 0) {
							// 代表成功
							//1.跳转到payorder.vue页面
							this.$router.push({
								path: '/pay',
								query: {
									orderid: response.data.message.orderid
								}
							})
									//2.删除本地的商品信息
							// console.log(this.$route.query.ids)
							const idsArray = urlArray.split(',')
							idsArray.forEach(id => {
								this.$store.commit('deleteGoods', id)
							})
						}
					})
				})
			}
		}
	}
</script>