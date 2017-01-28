module.exports={
   entry:'./main.js',
   output:{
     filename:"./build.js"
   },
   module:{
     loaders:[{
       test:/\.css$/,
       loader:'style-loader!css-loader!autoprefixer-loader'
     },{
       test:/\.less$/,
       loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
     }]

   }
}