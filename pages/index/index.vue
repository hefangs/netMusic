<template>
	<view class="index">
		<musichead title="小何云音乐" :icon="false" class="top" color="black"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-search1"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<view v-if="isLoading">
				<m-for-skeleton
					:avatarSize="200"
					        :row="3"
					        :loading="isLoading"
					        isarc='square'
					        v-for="(item,key) in 4"
									:titleStyle = "{}"
									:title = "false"
					        :key="key">
        </m-for-skeleton>
					
				</view>
				<view class="index-list" v-else>
					<view class="index-list-item" v-for="(item, index) in topList" :key="index" @tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{ item.updateFrequency }}</text>
						</view>
						<view class="index-list-text">
							<view class="vie" v-for="(item, index) in item.tracks" :key="index">{{ index + 1 }}.{{ item.first }}-{{ item.second }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import musichead from '@/components/musichead/musichead.vue'
import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton"
import { topList } from '@/common/api.js'
export default {
	data() {
		return {
			topList: [],
			isLoading:true
		}
	},
	components: {
		musichead,mForSkeleton
	},
	onLoad() {
		topList().then(res => {
			if (res.length) {
				
					this.topList = res
					this.isLoading = false

			}
		})
	},
	methods: {
		handleToList(listId) {
			// console.log(listId)
			uni.navigateTo({
				url: '/pages/list/list?listId=' + listId
			})
		},
		handleToSearch(){
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
	}
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
			width: 200rpx;
			height: 200rpx;
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
			line-height: 56rpx;
			overflow: hidden;
			white-space: normal;
			text-overflow: ellipsis;
			.vie {
				width: 400rpx;
				color: #607EAA;
				font-size: 28rpx;
				margin-top: 13rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
	.top {
		margin-top: 60rpx;
		font-size: 35rpx;
	}
</style>
