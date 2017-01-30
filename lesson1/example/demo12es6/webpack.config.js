const htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
   entry:'./main.js',
   output:{
     path:"./dist",
     filename:"build.js"
   },
   module:{
     loaders:[{
       test:/\.js$/,
       exclude:/node_modules/,
       loader:'babel-loader'
     },{
       test:/\.css$/,
       loader:'style!css!autoprefixer'
     },{
       test:/\.(png|jpg)$/,
       loader:'url?limit=40'
     }]
   },
   babel:{
     presets:['es2015'],
     plugins:['transform-runtime']
   },
   plugins:[new htmlWebpackPlugin({
   title:'index', 
   filename:'index.html',
   template:'index1.html'
   })]

}