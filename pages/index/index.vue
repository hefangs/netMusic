<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<text class="iconfont icon-search1"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<view class="index-list">
					<view class="index-list-item">
						<view class="index-list-img">
							<image src="../../static/logo.png" mode=""></image>
							<text>每天更新</text>
						</view>
						<view class="index-list-text">
							<view>1.与我无关 - 阿冗</view>
							<view>1.与我无关 - 阿冗</view>
							<view>1.与我无关 - 阿冗</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import musichead from '@/components/musichead/musichead.vue'
export default {
	data() {
		return {}
	},
	components: {
		musichead
	},
	onLoad() {},
	methods: {}
}
</script>

<style scoped lang="scss">
.index {
}
.index-search {
	display: flex;
	align-items: center;
	height: 70rpx;
	margin: 20rpx;
	background: #f7f7f7;
	border-radius: 50rpx;
	text {
		font-size: 40rpx;
		margin-left: 20rpx;
		margin-right: 10rpx;
		color: #aaa;
	}
	input {
		font-size: 28rpx;
		flex: 1;
	}
}
.index-list {
	margin: 0 20prx;
	.index-list-item {
		display: flex;
		margin: 20rpx;
		.index-list-img {
			width: 150rpx;
			height: 150rpx;
			position: relative;
			margin-right: 20rpx;
			 image {
				width: 100%;
				height: 100%;
			}
			text {
				position: absolute;
				left: 10rpx;
				bottom: 10rpx;
				color: white;
				font-size: 20rpx;
			}
		}
		.index-list-text {
			font-size: 24rpx;
			line-height: 54rpx;
		}
	}
}




</style>
