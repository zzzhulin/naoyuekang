function downloadFile(url, callback, saveImageToPhotosAlbum) {
	uni.showLoading({
		title: '保存图片中',
		mask: true
	});
	uni.downloadFile({
		url,
		success: (res) => {
			if (res.statusCode === 200) {
				saveImageToPhotosAlbum(res.tempFilePath, callback);
			}
		},
		fail: (err) => {
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: err.errMsg,
				duration: 2000
			})
		}
	})
}

function saveImageToPhotosAlbum(filePath, callback) {
	uni.saveImageToPhotosAlbum({
		filePath,
		success: (res) => {
			callback();
			uni.hideLoading();
			uni.showModal({
				title: '存图成功',
				content: '图片已保存到相册，可前往分享到朋友圈',
				showCancel: false,
				confirmText: '好的',
			})
		},
		fail: (err) => {
			uni.hideLoading();
			uni.showModal({
				title: '提示',
				content: '保存失败！未开通图片保存权限',
				confirmText: '去开通',
				success: function(res) {
					if (res.confirm) {
						uni.openSetting({
							success(res) {
								console.log(res.authSetting)
							}
						});
					}
				}
			});
		}
	})
}

function preview(urls) {
	// 预览图片
	uni.previewImage({
		urls,
	});
}

export default {
	save(url, callback) {
		downloadFile(url, callback, saveImageToPhotosAlbum)
	},
	preview,
}