var superagent = require('superagent-charset');
var cheerio = require('cheerio');

var fs = require('fs');

var url = 'http://www.shufe.edu.cn/structure/shizhidw/zhimingjs.htm';

superagent.get(url).end(function(err, res){
	if(err){
		console.log('Get teacher list page failed!' + '\n');
	} else{
		var $list = cheerio.load(res.text);
		$list('tr[height = "20"] td a').each(function(id, element){
			var name = $list(element).find('span').text() + '\n';
			var href = $list(element).attr('href');
			console.log(href);

			if(name && href){
				// superagent.get(href).end(function(err, res_t){
				// 	if(err){
				// 		console.log('Get teacher page failed!' + '\n');
				// 	} else{
				// 		var $teacher = cheerio.load(res_t.txt);
				// 		var detail = $teacher('td[align = left] eq:2').text().replace(/[\n|\s|\t|\r]+/g, ' ');
				// 		console.log('success');

						fs.open('teacher.txt', 'a', function(err, fo){
							if(err){
								console.log('Open file failed!' + '\n');
							} else{
								fs.write(fo, name, function(err, fw){
									if(err){
										console.log('Write file failed!' + '\n');
									} else{
										console.log('Write file succeeded!' + '\n');
									}
									fs.close(fo);
								})
							}
						})
				//	}
				//})
			}
		})
	}
})

