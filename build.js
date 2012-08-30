var http = require('http');
var fs = require('fs'); 
 // GET.   
var options = {  
	host: 'localhost',   
	port: 1339,   
	path: ''  
};

function writeHTML(path, to){
	options.path = path;
	var req = http.get(options, function(res) {  
		console.log("Got response: " + res.statusCode);
		var s = '';
		res.on('data', function(data){s += data;});  
		res.on('end', function() {
			if(to.indexOf('index.html') >= 0){
				s = s.replace('index.html"', 'index.html" class="current" ');
			}else if(to.indexOf('demo.html') >= 0){
				s = s.replace('demo.html"', 'demo.html" class="current" ');
			}else if(to.indexOf('playground.html') >= 0){
				s = s.replace('playground.html"', 'playground.html" class="current" ');
			}else if(to.indexOf('gallery.html') >= 0){
				s = s.replace('gallery.html"', 'gallery.html" class="current" ');
			}
			fs.writeFileSync(to, s, 'utf8');
			console.log('HTML file created: ' + to);
		});   
	}).on('error', function(e) {  
		console.log("Got error: " + e.message);   
	});
}

var pages = [
	{path: '/gridx_site/index.djs', to: 'index.html'}
	,{path: '/gridx_site/gallery.djs', to: 'gallery.html'}
	,{path: '/gridx_site/license.djs', to: 'license.html'}
	,{path: '/gridx_site/playground.djs', to: 'playground.html'}
	,{path: '/gridx_site/about.djs', to: 'about.html'}
	,{path: '/gridx_site/demo.djs', to: 'demo.html'}
];

pages.forEach(function(page){
	writeHTML(page.path, page.to);
});