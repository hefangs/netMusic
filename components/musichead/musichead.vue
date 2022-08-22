<template>
	<view class="music-head" :style="{color:color}">
		<view v-if="icon" class="music-head-icon" :class="{'music-head-iconblack':iconblack}">
			<text class="iconfont icon-fanhuijiantou" @tap="handleToBack"></text>
			<text class="iconfont icon-home" @tap="handleToHome"></text>
		</view>
		<view>
			<text>{{ title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:['title','icon','color','iconblack'],
		methods: {
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.music-head{ 
		margin-bottom: 20rpx;
		width: 100%;
		height: 75px;
		line-height:80px;
		font-size: 16px;
		text-align: center;
		color: #000000;
		position: relative;
		.music-head-icon{
			position: absolute;
			left: 8px;
			top: 46px;
			width: 90px;
			height: 32px;
			background:rgba(0,0,0,0.5);
			color: white;
			line-height: 31px;
			border-radius: 15px;
			display: flex;
			justify-content: space-evenly;
		}
	}
	.music-head-iconblack{
		color: black;
		border: 1px solid #eaeaea;
		background:white;
	}
</style>
