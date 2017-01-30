//  这个文件就是webpack的默认配置文件，默认的名称为：webpack.config.js
//  将来只需要在cmd面板上执行 webpack就会自动去查找webpack.config.js中的内容进行相关的打包操作
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:'./src/main.js', //webpack要打包的源文件是 src/main.js
	output:{
		path:'./dist/', //告诉webpack将来所有的打包文件都要放到这个目录下
		filename:'build.js' //打包以后输出的文件名称,./dist/build.js代表输出到当前目录下
	},
	module:{
		loaders:[
			{
				test: /vue-preview.src.*?js$/,  //表示匹配vue-previe这个组件中的js
				loader: 'babel-loader'  //使用babel-loader解析es6语法
			},
			{
				test:/\.vue$/, //vue的组件
				loader:'vue-loader' //负责编译vue组件的
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader!autoprefixer-loader' //加载顺序先执行css-loader再执行style-loader所以这个编写的顺序一定不能颠倒，否则无效
			},
			{
				test:/\.js$/,
				loader:'babel-loader',  //表示使用babel-loader去转换所有的.js文件中的es6语法为es5语法
				exclude:/node_modules/  //表示node_modules文件夹中的所有.js不转换
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!autoprefixer-loader!less-loader' //加载顺序先执行css-loader再执行style-loader所以这个编写的顺序一定不能颠倒，否则无效
			},
			{
				test:/\.scss$/,
				loader:'style-loader!css-loader!autoprefixer-loader!sass-loader' //加载顺序先执行css-loader再执行style-loader所以这个编写的顺序一定不能颠倒，否则无效
			},
			 {
		        test: /\.(png|jpg|ttf|svg|gif)$/,  //表示匹配的文件后缀名为 .png 或者.jpg也可以自己增加
		        loader: 'url?limit=40000' // url其实就是url-loader的缩写,后面的limit表示如果图片大小小于40000，那么则将这张图片编译成base64的字符串给浏览器使用，否则将图片打包到编译文件夹中（图片大小不不变），这里注意一下，值不能太大，否则会导致build.js文件过大影响性能
		     }
		]
	},
	babel: {  
      presets: ['es2015'], 
      plugins: ['transform-runtime']//为了保证在编译.vue文件的时候也能够正常
    },
	 plugins: [
	    new HtmlwebpackPlugin({
	      title: 'index',  //生成的页面标题
	      filename: 'index.html', //生成的文件名称
     	  template: 'index1.html' //根据index1.html这个模板来生成(这个文件请你自己生成)
	    })
	  ]
}