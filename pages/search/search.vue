<template>
	<view class="search">
		<musichead title="搜索" :icon="true" class="top" :iconblack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont icon-search1"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch(searchWord)" @input="handleToSuggest"/>
					<text class="iconfont icon-guanbi" v-show="searchType !==1" @tap="handleToClose"></text>
				</view>
				<block v-if="searchType == 1">

				<view class="search-history">
					<view class="search-history-head">
						<text>历史记录</text>
						<text class="iconfont icon-icon" @tap="handleToClear"></text>
					</view>
					<view class="search-history-list" >
						<view  v-for="(item,index) in searchHistory" :key="index">{{item}}</view>
					</view>
				</view>
				<view class="search-hot">
					<view class="search-hot-head">热搜榜</view>
					<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToWord(item.searchWord)">
						<view class="search-hot-top">{{index + 1}}</view>
						<view class="search-hot-word">
							<view>{{item.searchWord}}
								<image :src="item.iconUrl"></image>
							</view>
							<view>{{item.content}}</view>
						</view>
						<view class="search-hot-count">{{item.score}}</view>
					</view>
				</view>
				</block>
				<block v-else-if="searchType ==2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.artists[0].name}}-{{item.album.name }}</view>
							</view>
							<text class="iconfont icon-iconfontplay2"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType ==3">
					<view class="search-suggest">
						<view class="search-suggest-head">{{searchWord}}</view>
						<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont icon-search1">{{item.keyword}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import musichead from '@/components/musichead/musichead.vue'
import {searchHot,searchWord,searchSuggest} from '@/common/api.js'
export default {
	data() {
		return {
			searchHot : [],
			searchWord : '',
			searchHistory : [],
			searchType : 1,
			searchList : [],
			searchSuggest:[]
		}
	},
	onLoad(){
		searchHot().then(res =>{
			if(res[1].data.code == 200){
				this.searchHot = res[1].data.data 
			}
		})
		uni.getStorage({
			key: 'searchHistory',
			success: res =>{
				this.searchHistory  = res.data
			}
		})
	},
	components: { musichead },
	methods: {
		handleToWord(keyword){
			this.searchWord = keyword
			this.handleToSearch(keyword)
		},
		handleToSearch(keyword){
			this.searchHistory.unshift(keyword)
			this.searchHistory = [... new Set(this.searchHistory)]
			if(this.searchHistory.length > 10){
				this.searchHistory.length = 10
			}
			uni.setStorage({
				key : 'searchHistory',
				data : this.searchHistory
			})
			this.getSearchList(keyword)
		},
		handleToClear(){
			uni.removeStorage({
				key: 'searchHistory',
				success:res =>{
					this.searchHistory =  []
				}
			})
		},
		getSearchList(keyword){
			searchWord(keyword).then(res =>{
				if(res[1].data.code == 200){
					this.searchList =  res[1].data.result.songs
					this.searchType = 2
				}
			})
		},
		handleToClose(){
			this.searchType = 1
			this.searchWord = ''
		},
		handleToDetail(id){
			uni,uni.navigateTo({
				url: '/pages/detail/detail?id='+id,
			})
		},
		handleToSuggest(e){
			let val = e.detail.value
			if(!val){
				this.searchType = 1
				return;
			}
			searchSuggest(val).then(res =>{
				if(res[1].data.code == 200){
					this.searchSuggest= res[1.].data.result.allMatch
					this.searchType = 3
				}
			})
		}
	}
}
</script>

<style scoped>
.search-search {
	display: flex;
	align-items: center;
	height: 70rpx;
	margin: 20rpx;
	background: #f7f7f7;
	border-radius: 50rpx;
}
.search-search text {
	font-size: 40rpx;
	margin-left: 20rpx;
	margin-right: 10rpx;
	color: #aaa;
}
.search-search input {
	flex: 1;
	font-size: 26rpx;
}
.icon-search1 {
	font-size: 40rpx;
}
.icon-guanbi {
	font-size: 40rpx;
}

.search-history{
	font-size: 26prx;
	margin: 0 30rpx 50rpx 30rpx ;
}
.search-history-head{
	display: flex;
	justify-content: space-between;
	margin-bottom: 36rpx;
}
.search-history-list{
	display: flex;
	flex-wrap: wrap;
}
.search-history-list view{
	padding: 16rpx 28rpx;
	border-radius: 40rpx;
	margin-right: 30rpx;
	margin-bottom: 20rpx;
	background: #f7f7f7;
	font-size: 20rpx;
}

	.search-hot {
		margin-left: 30rpx;
		margin-right: 46rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
	}
	.search-hot-head {
		margin-bottom: 36rpx;
	}
	.search-hot-item {
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;
	}
	.search-hot-top {
		color: #fb2222;
		width: 60rpx;
		margin-left: 8rpx;
		}
	.search-hot-word {flex: 1;}
	.search-hot-word view:nth-child(1) {
		font-size: 25rpx;
		color: black;
	}
	.search-hot-word view:nth-child(2) {
		font-size: 24rpx;
		color: #878787;
	}
	.search-hot-word image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
	}
	.search-hot-count {color: #878787;}

 .search-result{
	 border-top: 2rpx solid #e4e4e4;
	 padding: 30rpx;
 }
 .search-result-item{
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 padding-bottom: 10rpx;
	 padding-top: 10rpx;
	 border-bottom: 2rpx solid #e4e4e4;
	 }
 .search-result-word{}
 .search-result-word view:nth-child(1){
	 font-size: 24rpx;
	 color: #235790;
	 margin-bottom: 5rpx;
 }
 .search-result-word view:nth-child(2){
	 font-size: 22rpx;
	 color: #898989;
	 }
 .search-result-item text{
	 font-size: 50rpx;
 }

	.search-suggest{
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
	}
	.search-suggest-head{
		color: #4574a5;
		margin-bottom: 44rpx;
	}
	.search-suggest-item{
		color: #5d5d5d;
		margin-bottom: 24rpx;
	}
	.search-suggest-item text{
		color: #bdbdbd;
		margin-right: 28rpx;
		position: relative;
		top: 2rpx;
		/* font-size: 30rpx; */
	}
 .icon-search1{
	 font-size: 35rpx;
 }


.top {
	margin-top: 60rpx;
	font-size: 35rpx;
}
</style>
