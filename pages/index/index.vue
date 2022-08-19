<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<text class="iconfont icon-search1"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '@/components/musichead/musichead.vue'
	export default {
		data() {
			return {
			
			}
		},
		components:{
			musichead
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.index{}
	.index-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 10rpx 20rpx 10rpx 20rpx;
		background: #F7F7F7;
		border-radius: 50rpx;
		text{
			font-size: 52rpx;
			margin-left: 20rpx;
			margin-right:20rpx ;
			color: #aaa;
		}
		input{
			font-size: 28rpx;
			flex: 1;
		}
	}
</style>
