module.exports={
   entry:'./main.js',
   output:{
     filename:"./build.js"
   },
   module:{
     loaders:[{
       test:/\.css$/,
       loader:'style-loader!css-loader'
     }]

   }
}