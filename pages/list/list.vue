<template>
	<view class="list">
		<view class="fixbg" :style="{'background-image':`url(${playList.coverImgUrl})`}"></view>
		<musichead title="歌单" :icon="true" class="top" color="black"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playList.coverImgUrl" mode=""></image>
						<text class="iconfont icon-xiangyousanjiaoxing">{{playList.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playList.name}}</view>
						<view>
							<image :src="playList.creator.avatarUrl"></image>{{playList.creator.nickname}}
						</view>
						<view>{{playList.description}}</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share">
					<text class="iconfont icon-fenxiang"></text>
					分享给微信好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{playList.trackCount}}首)</text>
					</view>
					<view class="list-music-item" v-for="(item,index) in playList.tracks" :key="index">
						<view class="list-music-top">{{index + 1 }}</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="privileges[index].flag > 60 || privileges[index].flag < 70 " src="../../static/logo.png" mode=""></image>
								<image v-if="privileges[index].maxbr == 999000 " src="../../static/logo.png" mode=""></image>
								{{item.ar[0].name}} -{{item.name}}
							</view>
						</view>
						<text class="iconfont icon-iconfontplay2"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import musichead from '@/components/musichead/musichead.vue'
import {list} from '@/common/api.js'
export default {
	data() {
		return {
			playList:{
				creator:{
					avatarUrl:'',
					nickname:''
				},
				coverImgUrl:'',
				playCount:null,
				name:'',
				description:'',
				trackCount:null,
				tracks:[]
			},
			privileges:[],
			isLoading:true
		}
	},
	onLoad(options) {
		uni.showLoading({
			title:'加载中...'
		})
		// console.log(options.listId)
		list(options.listId).then((res)=>{
			if(res[1].data.code ==200){
				this.playList = res[1].data.playlist
				this.privileges = res[1].data.privileges
				this.isLoading = false
				uni.hideLoading()
			}
		})
	},
	components: {
		musichead
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.list-head {
	display: flex;
	margin: 15rpx;
	.list-head-img {
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 40rpx;
		image {
			width: 100%;
			height: 100%;
		}
		text {
			position: absolute;
			top: 12rpx;
			right: 12rpx;
			color: white;
			font-size: 26rpx;
		}
	}
	.list-head-text {
		flex: 1;
		color: #f0f2f7;
	}
}
.list-head-text view:first-child {
	color: #ecccb2;
	font-size: 36rpx;
}
.list-head-text view:nth-child(2) {
	display: flex;
	margin: 20rpx 0;
	font-size: 30rpx;
	align-items: center;
	image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 15rpx;
	}
}
.list-head-text view:nth-child(3) {
	line-height: 34rpx;
	font-size: 28rpx;
}
.list-share {
	margin-top: 20px;
	width: 330rpx;
	height: 74rpx;
	margin: 0 auto;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 34rpx;
	color: white;
	text-align: center;
	line-height: 74rpx;
	font-size: 28rpx;
	.icon-fenxiang {
		margin-right: 15rpx;
	}
}
.list-music {
	background: white;
	border-radius: 50rpx;
	margin: 20rpx;	
	overflow: hidden;
	.list-music-head {
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}
	.list-music-item {
		display: flex;
		margin: 0 32rpx 66rpx 44rpx;
		align-items: center;
		color: #959595;
		text {
			font-size: 50rpx;
			color:#c7c7c7
		}
	}
	.list-music-top {
		width: 58rpx;
		font-size: 30rpx;
		line-height: 3 0rpx;
	}
	.list-music-song {
		flex: 1;
	}
}
.list-music-head text:nth-child(1) {
	height: 50rpx;
	font-size: 50rpx;
	
}
.list-music-head text:nth-child(2) {
	font-size: 30rpx;
	margin: 0 10rpx 0 26rpx;
}
.list-music-head text:nth-child(3) {
	font-size: 26rpx;
	color: #b2b2b2;
}
.list-music-song view:nth-child(1) {
	font-size: 28rpx;
	color: black;
	width: 70vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.list-music-song view:nth-child(2) {

	font-size: 20rpx;
	align-items: center;
	width: 70vw;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	
}
.list-music-song view:nth-child(2) image {
	width: 32rpx;
	height: 32rpx;
	margin-right: 10rpx;

}
</style>
