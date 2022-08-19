<template>
	<view class="index">
		<musichead title="小何云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<text class="iconfont icon-search1"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<view class="index-list">
					<view class="index-list-item" v-for="(item,index) in topList" :key="index">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text" >
							<view v-for="(item,index) in item.tracks" :key="index">{{index+1}}.{{item.first}}-{{item.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import musichead from '@/components/musichead/musichead.vue'
import {topList} from '@/common/api.js'
export default {
	data() {
		return {
			topList:[]
		}
	},
	components: {
		musichead
	},
	onLoad() {
		topList().then(res =>{
			if(res.length){
				this.topList = res
			}
		})
	},
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
				border-radius: 25rpx;
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
			font-size: 22rpx;
			line-height:56rpx;
		}
	}
}




</style>
