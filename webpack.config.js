var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry:{
		index:path.resolve(__dirname,"./app/src/js/main.js")
	},
	output:{
		path:path.resolve(__dirname,"./app/build"),
		filename:"js/[name].js"
	},
    module: {
	    loaders: [
	    	{test: /\.js?$/,exclude: /node_modules/,loader : 'babel',query:{presets:['es2015','react']}},
            {test: /\.scss$/, loader:ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader!sass-loader") },
        ]
	},
	//开发的时候还是编译在一起方便开发, 上线再分离
	// externals:{
	// 	"react":"React",
	// 	"react-dom":"ReactDOM"
	// },
	plugins:[
		new HtmlWebpackPlugin({
            filename:__dirname+"/app/build/html/index.html",
            template:__dirname+"/app/src/template/index.html",
            chunks:["index"]
        }),
        new ExtractTextPlugin("./css/[name].css", { allChunks: true }),
       
	],
    
    devServer:{
        historyApiFallback:true,
        contentBase:"app/build/html/",
        hot:true,
        inline:true,
        progress:true,
        port:8081
    }
}