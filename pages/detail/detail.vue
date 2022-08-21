<template>
	<view class="detil">
		<view class="fixbg" :style="{'background-image':`url(${songDetail.al.picUrl})`}"></view>
		<musichead :title="songDetail.name" :icon="true" class="top" color="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image :src="songDetail.al.picUrl" mode=""></image>
					<text class="iconfont icon-zanting"></text>
					<view></view>
				</view>
				<view class="detil-lyric">
					<view class="detil-lyric-wrap">
						<view class="detil-lyric-item"></view>
						<view class="detil-lyric-item active">测试文字测试文字文字</view>
						<view class="detil-lyric-item">测试文字测试文字文字</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">喜欢这首歌的人也听</view>
					<view class="detail-like-item" v-for="(item,index) in songSimi" :key="index">
						<view class="detail-like-img">
							<image :src="item.album.picUrl" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>{{item.name}}</view>
							<view>
								<image src="/static/logo.png" mode="" v-if="item.privilege.flag > 1 && item.privilege.flag < 50"></image>
								<image src="/static/logo.png" mode="" v-if="item.privilege.maxbr == 999000"></image>
								{{item.album.artists[0].name}} - {{item.name}} 
							</view>
						</view>
						<text class="iconfont icon-iconfontplay2"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">精彩评论</view>
					<view class="detail-comment-item">
						<view class="detail-comment-img">
							<image src="../../static/WX20220821-182146.png" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>xxxx</view>
									<view>xxxxxx</view>
								</view>
								<view class="detail-comment-like">11111
									<text class="iconfont icon-dianzan"></text>
								</view>
							</view>
							<view class="detail-comment-text">xxxx111111111111111111111111xxxxx</view>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '@/components/musichead/musichead.vue'
	import {songDetail,songSimi,songComment,songLyric,songUrl} from '@/common/api.js'
	export default {
		data() {
			return {
				songDetail:{
					al:{}
				},
				songSimi:[
				
				]
			}
		},
		onLoad(options){
			this.getMusic(options.id)
		},
		components: {
			musichead
		},
		methods: {
			getMusic(id){
				Promise.all([songDetail(id),songSimi(id)]).then((res) =>{
					// console.log(res[0][1].data.songs)
					if(res[0][1].data.code == 200){
						this.songDetail = res[0][1].data.songs[0]
					}
					if(res[1][1].data.code == 200){
						console.log(res[1][1].data)
						this.songSimi = res[1][1].data.songs
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-play {
		
		width: 580rpx;
		height: 580rpx;
		background: url('~@/static/WX20220821-182146.png');
		background-size: cover;
		margin: 214rpx auto 0 auto;
		position: relative;
		image{
			
			width: 377rpx;
			height: 377rpx;
			border-radius: 50%;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
		}
		text{
			width: 100rpx;
			height: 100rpx;
			font-size: 100rpx;
			color:  white;  
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
		}
		view{
			width: 230rpx;
			height: 360rpx;
			background: url('@/static/logo.png');
			position: absolute;
			left: 80rpx;
			right: 0;
			top: -200rpx;
			margin: auto;
			background-size: cover;
		}
	}
	.detil-lyric{
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		overflow: hidden;
		color: #6f6e73;
		.detil-lyric-wrap{}
		.detil-lyric-item{
			height: 82rpx;
		}
		.detil-lyric-item.active{
			color: white;
		}
	}
	.detail-like{
		margin: 0 30rpx;
		.detail-like-head{
			font-size: 36rpx;
			color: white;
			margin: 50rpx 0;
		}
		.detail-like-item{
			display: flex;
			align-items: center;
			margin-bottom: 28rpx;
			text{
				font-size: 50rpx;
				color:#c6c2bf ;
			}
		}
		.detail-like-img{
			width: 82rpx;
			height: 82rpx;
			border-radius: 20rpx;
			overflow: hidden;
			margin-right: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail-like-song{
			flex: 1;
			color: #c6c2bf;
			image{
				width: 26rpx;
				height: 20rpx;
				margin-right: 10rpx;
			}
		}	
	}
	.detail-like-song view:nth-child(1){
		font-size: 28rpx;
		color: white;
		margin-bottom: 12rpx;
	}
	.detail-like-song view:nth-child(2){
		font-size: 22rpx;
	}
	
	.detail-comment{
		margin: 0 30rpx;
		.detail-comment-head{
			font-size: 36rpx;
			color: white;
			margin: 50rpx 0;
		}
		.detail-comment-item{
			margin-bottom: 28rpx;
			display: flex;
		}
		.detail-comment-img{
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 18rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.detail-comment-content{
			flex: 1;
			color: #cbcacf;
		}
		.detail-comment-title{
			display: flex;
			justify-content: space-between;
		}
		.detail-comment-name{}
		.detail-comment-like{
			font-size: 28rpx;
		}
		.detail-comment-text{
			font-size: 28rpx;
			line-height: 40rpx;
			color: black;
			margin-top: 20rpx;
			border-bottom: 1px #e0e0e0 solid;
			padding-bottom: 40rpx;
		}
	}
	.detail-comment-name view:nth-child(1){font-size: 26rpx;}
	.detail-comment-name view:nth-child(2){font-size: 26rpx;}
	
</style>
