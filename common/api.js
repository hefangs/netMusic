

import {baseUrl} from './config.js'
// 获取所有榜单内容摘要
// http://localhost:3000/toplist/detail
export function topList() {
	return new Promise((resolve, reject) => {
		let listIds = ['19723756', '3779629', '2884035', '3778678']
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list
				result.length = 4
				for (var i = 0; i < listIds.length; i++) {
					result[i].listId = listIds[i]
				}
				resolve(result)
				// console.log(res.data.list)
			}
		})
	})
}
// 获取歌单详情动态
// http://localhost:3000/playlist/detail?id=19723756
export function list(listId){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${listId}`,
		method:'GET'
	})
}

//  获取所有歌曲的详情
// http://localhost:3000/song/detail?ids=19723756
export function songDetail(id){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${id}`,
		method:'GET'
	})
}

// 获得相似歌曲
// http://localhost:3000/simi/song?id=19723756
export function songSimi(id){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${id}`,
		method:'GET'
	})
}

// 获取该音乐的所有评论 
// http://localhost:3000/comment/music?id=19723756
export function songComment(id){
	return uni.request({
		url:`${baseUrl}/comment/music?id=${id}`,
		method:'GET'
	})
}

// 获取歌词
// http://localhost:3000/lyric?id=19723756
export function songLyric(id){
	return uni.request({
		url:`${baseUrl}/lyric?id=${id}`,
		method:'GET'
	})
}

// 获取的是歌曲试听url
// http://localhost:3000/song/url?id=19723756
export function songUrl(id){
	return uni.request({
		url:`${baseUrl}/song/url?id=${id}`,
		method:'GET'
	})
}