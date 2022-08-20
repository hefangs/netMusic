<script>
	export default {
	
	}
</script>

<style>
	/*每个页面公共css */
	@import url('@/common/iconfont.css');
	.container{
		width: 100%;
		height: calc(100vh - 75px);
		overflow: hidden;
	}
	.container scroll-view{
		height: 100%;
	}
	.fixbg{
		width: 100vh;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		/* background-image: url('@/static/netlog.webp'); */
		background-size: cover;
		background-position:100% 100%;
		filter: blur(20rpx);
		transform:scale(1.2) ;
		
	}
</style>
