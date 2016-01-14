var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


// app.get('/scrape', function(req, res){

	var url_stevens = 'https://www.stevenspass.com/site/mountain/reports/snow-and-weather-report/@@snow-and-weather-report/';
	var url_crystal = 'http://crystalmountainresort.com/the-mountain/current-conditions/';
	var url_baker = 'http://www.mtbaker.us/snow-report/';
	var url_snoqualmie = 'http://www.summitatsnoqualmie.com/conditions';

	var data = { 
				stevens: { overnight : "", last24 : "", last48 : "", temp : "", wind : "", vision: "", baseDepth: "", topDepth: "", weatherConditions: "", surfaceConditions: ""}, 
				crystal: { overnight : "", last24 : "", last48 : "", temp : "", wind : "", vision: "", baseDepth: "", topDepth: "", weatherConditions: "", surfaceConditions: ""}, 
				baker: { overnight : "", last12 : "", last24 : "", last48 : "", temp : "", wind : "", vision: "", baseDepth: "", topDepth: "", weatherConditions: "", surfaceConditions: ""}, 
				snoqualmie: { overnight : "", last12 : "", last24 : "", last48 : "", temp : "", wind : "", vision: "", baseDepth: "", topDepth: "", weatherConditions: "", surfaceConditions: ""}
				};	

	var json = new 
	// STEVENS PASS
	request(url_stevens, function(err, resp, html) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(html);
			var overnight = $('#page-report > div:nth-child(4) > div:nth-child(1) > div > div > div.page-report-snowfall-value').text();
			var last24 = $('#page-report > div:nth-child(4) > div:nth-child(2) > div > div > div.page-report-snowfall-value').text();
			var last48 = $('#page-report > div:nth-child(4) > div:nth-child(3) > div > div > div.page-report-snowfall-value').text();
			var temp = $('#page-report > div:nth-child(6) > div:nth-child(1) > div > div > div:nth-child(3)').text();
			var wind = $('#page-report > div:nth-child(6) > div:nth-child(1) > div > div > div:nth-child(4)').text();
			var vision = $('#page-report > div:nth-child(6) > div:nth-child(1) > div > div > div:nth-child(5)').text();
			var baseDepth = $('#page-report > div:nth-child(15) > div:nth-child(1) > div > div > div.page-report-snowdepth-value').text();
			var topDepth = $('#page-report > div:nth-child(15) > div:nth-child(2) > div > div > div.page-report-snowdepth-value').text();
			var weatherConditions = $('#page-report > div:nth-child(6) > div:nth-child(1) > div > div > div:nth-child(2)').text();
			var surfaceConditions = $('#page-report > div:nth-child(12) > div:nth-child(1) > div > div > div > p').text();
			// console.log("STEVENS: ", json.stevens);
		}
	})

	// CRYSTAL
	request(url_crystal, function(err, resp, html) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(html);
			json.crystal.overnight = $('#tablepress-15 > tbody > tr.row-2 > td.column-2').children().first().text();
			json.crystal.last24 = $('#tablepress-15 > tbody > tr.row-2 > td.column-2').children().first().text();
			json.crystal.last48 = $('#tablepress-15 > tbody > tr.row-2 > td.column-3').children().first().text();
			json.crystal.temp = $('#post-71 > div > div:nth-child(6) > div.col.grid_9_of_12 > div > ul > li:nth-child(1) > h2').text();						
			json.crystal.wind = $('#post-71 > div > div:nth-child(8) > div:nth-child(4) > div:nth-child(1) > div > div > h3').text();
			json.crystal.baseDepth = $('#bottom-depth').text();
			json.crystal.topDepth = $('#top-depth').text();
			json.crystal.weatherConditions = $('#current-indicator > h4').text();
			// console.log("CRYSTAL: ", json.crystal);
			// $('#tablepress-13 > tbody > tr').each(function () {
				// if ($('#tablepress-13 > tbody').children('tr')[0].css('background') = true) {
				// 	json.crystal.vision = $(this).children('tr')[1];
				// }
			// })
			json.crystal.vision = undefined;
			json.crystal.surfaceConditions = undefined;
		}
	})

	// MT. BAKER
	request(url_baker, function(err, resp, html) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(html);
			json.baker.last12 = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(1) > span > strong').text();
			json.baker.last24 = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2) > span > strong').text();
			json.baker.temp = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > span > strong').text();
			json.baker.baseDepth = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(2) > span > strong').text();
			json.baker.topDepth = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(3) > tbody > tr:nth-child(4) > td:nth-child(2) > span > strong').text();
			json.baker.weatherConditions = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(3) > tbody > tr:nth-child(5) > td:nth-child(2) > span > strong').text();
			json.baker.surfaceConditions = $('#blockStyle5296MainLayout1Cell1578 > div > table:nth-child(3) > tbody > tr:nth-child(6) > td:nth-child(2) > span > strong').text();
		// console.log("BAKER: ", json.baker);
		}
	})

	// SNOQUALMIE
	request(url_snoqualmie, function(err, resp, html) {
		if (!err && resp.statusCode == 200) {
			var $ = cheerio.load(html);
			json.snoqualmie.overnight = $('#page-report > div:nth-child(4) > div:nth-child(1) > div > div > div.page-report-snowfall-value').text();
			json.snoqualmie.last12 = $('#page-report > div:nth-child(4) > div:nth-child(2) > div > div > div.page-report-snowfall-value').text();
			json.snoqualmie.last24 = $('#page-report > div:nth-child(4) > div:nth-child(2) > div > div > div.page-report-snowfall-value').text();
			json.snoqualmie.last48 = $('#page-report > div:nth-child(4) > div:nth-child(3) > div > div > div.page-report-snowfall-value').text();
			json.snoqualmie.temp = $('#block-conditions-header > div > div.current-conditions > span.value').text();
			json.snoqualmie.wind = $('#page-report > div:nth-child(6) > div:nth-child(1) > div > div > div:nth-child(4)').text();
			json.snoqualmie.vision = $('#page-report > div:nth-child(6) > div:nth-child(1) > div > div > div:nth-child(5)').text();
			json.snoqualmie.baseDepth = $('#page-report > div:nth-child(15) > div:nth-child(1) > div > div > div.page-report-snowdepth-value').text();
			json.snoqualmie.topDepth = $('#page-report > div:nth-child(15) > div:nth-child(2) > div > div > div.page-report-snowdepth-value').text();
			json.snoqualmie.weatherConditions = $('#block-conditions-overview > div > div.current-conditions').text();
			json.snoqualmie.surfaceConditions = $('#page-report > div:nth-child(12) > div:nth-child(1) > div > div > div > p').text();
			// console.log("SNOQUALMIE: ", json.snoqualmie);

		}
	})
	console.log(json);
// 	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

//     console.log('File successfully written! - Check your project directory for the output.json file');

// })
// })	


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;