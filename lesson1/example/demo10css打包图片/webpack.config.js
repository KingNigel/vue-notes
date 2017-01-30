module.exports={
   entry:'./main.js',
   output:{
     filename:"./build.js"
   },
   module:{
     loaders:[{
       test:/\.css$/,
       loader:'style!css!autoprefixer'
     },{
       test:/\.(png|jpg)$/,
       loader:'url?limit=40'
     }]

   }
}