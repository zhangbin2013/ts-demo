// 异步加载图片
let asyncLoadImage = (url: string) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
            resolve(image);
        }
        image.onerror = () => {
            reject(new Error('Image loading failed'));
        }
        image.src = url;
    })
}