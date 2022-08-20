import {baseUrl} from './config.js'
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
export function list(listId){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${listId}`,
		method:'GET'
	})
}
