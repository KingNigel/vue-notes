const htmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
   entry:'./main.js',
   output:{
     path:"./dist",
     filename:"build.js"
   },
   module:{
     loaders:[{
       test:/\.css$/,
       loader:'style!css!autoprefixer'
     },{
       test:/\.(png|jpg)$/,
       loader:'url?limit=40'
     }]

   },
   plugins:[new htmlWebpackPlugin({
   title:'index', 
   filename:'index.html',
   template:'index1.html'
   })]

}