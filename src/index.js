import m from "mithril";
import Chart from 'chart.js/auto';
/*setup vars*/
const rxURL = "http://prac-app.vigilantioe.com:8081/render/?target=virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_rxbyt.value&from=-1h&until=now&format=json";
const txURL = "http://prac-app.vigilantioe.com:8081/render/?target=virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_txbyt.value&from=-1h&until=now&format=json";
const startingURL = "http://prac-app.vigilantioe.com:8081/render/?target=virgil.vigilant-pracapp-01.host.hostalive.perfdata.pl.value&from=-24h&until=now&format=json";
var jsonData = [];
var jsonData2 = [];
var jsonData1 = [];
var mainData = [];
var rawData = [];
var dataPoints = [];
var timeStamps = [];
var mainTime = [];
var rxTime = [];
var rxData = [];
var txTime = [];
var txData = [];
var barData = [];
var pieData = [];
var rxBarTime = [];
var txBarTime = [];
var barTime = [];
var pieTime = [];
var pie2Time =[];
var pie2Data = [];
var chartTitle = "";
var totData1 = 0;
var totData2 = 0;
var avgData1 = 0;
var avgData2 = 0;
var compareTotals = [];
var compareAverages = [];
const req = "http://prac-app.vigilantioe.com:8081/render?target=";
var startTarget = "virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_txbyt.value";
var currentTarget = startTarget;
var timePeriod = "-1h";
var fullTargetUrl="http://prac-app.vigilantioe.com:8081/render?target=virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_txbyt.value&from=-1h&until=now&format=json";
var fullTimeandFormat = "";
var until = "until=now";
var txBarData = [];
var rxBarData = [];
var rawRxJson = [];
var rawTxJson = [];
const weekday = ['Sun','Mon', 'Tue','Wed','Thur','Fri','Sat']
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* URL Constructor */
function buildTarget(target,time) {
	fullTimeandFormat = "from="+time+"&"+until+"&format=json";
	fullTargetUrl = req+target+"&"+fullTimeandFormat;
}
	buildTarget(currentTarget,timePeriod);
/* dropdown selectors*/
document.getElementById('target-selector').onchange = function () {
	newSelection();
}
/*auto refresher function */
var refreshInterval;
function autoRefresh(n){
	var delay = n*60*1000;
	refreshInterval = setInterval(function () {
		mockXHRjson();
		newSelection();
		barChartRender();
		mainChartRender();
	},delay);
}
document.getElementById('refresh-selector').onchange = function (){
	let e = document.getElementById('refresh-selector').value;
	switch(e){
		case "5m":
			autoRefresh(5);
			break;
		case "30m":
			autoRefresh(30);
			break;
		case "60m":
			autoRefresh(60);
			break;
		case "off":
			clearInterval(refreshInterval);
			break;
}
}

/*function newSelection(), 
 * target routing for url constructor
 * chart title setting
 * url constructor call
 * and updating chart call
 */
function newSelection(){
	let e = document.getElementById("target-selector").value;
	switch(e){
		case "PL":
			currentTarget="virgil.vigilant-pracapp-01.host.hostalive.perfdata.pl.value";
			chartTitle = "Packet Loss";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "RTA":
			currentTarget="virgil.vigilant-pracapp-01.host.hostalive.perfdata.rta.value";
			chartTitle = "Round Trip Average";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "IDLE":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_CPU.check_nrpe.perfdata.idle.value";
			chartTitle = "Idle";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "IOWAIT":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_CPU.check_nrpe.perfdata.iowait.value";
			chartTitle = "Iowait";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "STEAL":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_CPU.check_nrpe.perfdata.steal.value";
			chartTitle = "Steal";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "SYSTEM":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_CPU.check_nrpe.perfdata.system.value";
			chartTitle = "System";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "USER":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_CPU.check_nrpe.perfdata.user.value";
			chartTitle = "User";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "DISK":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Disk.check_nrpe.perfdata._.value"; 
			chartTitle = "Disk";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "ACTIVE":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Memory.check_nrpe.perfdata.Active.value"; 
			chartTitle = "Memory Active";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "CACHED":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Memory.check_nrpe.perfdata.MemCached.value";
			chartTitle = "Memory Cached";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "USED":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Memory.check_nrpe.perfdata.MemUsed.value"; 
			chartTitle = "Memory Used";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "SWAPCACHE":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Memory.check_nrpe.perfdata.SwapCached.value";
			chartTitle = "Swap Cache";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "SWAPUSED":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Memory.check_nrpe.perfdata.SwapUsed.value"; 
			chartTitle = "Swap Used";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "RX":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_rxbyt.value";
			chartTitle = "Data Received";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "RXerr":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_rxerrs.value";
			chartTitle = "Data Received Errors";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "TX":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_txbyt.value";
			chartTitle = "Data Transmit";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
		case "TXerr":
			currentTarget="virgil.vigilant-pracapp-01.services.Linux_Network.check_nrpe.perfdata.eth0_txerrs.value";
			chartTitle = "Data Transmission Errors";
			buildTarget(currentTarget,timePeriod);
			updateChart();	
			break;
	
	}
};

/*time selector dropdown attach
 * set dynamic (time range) title
 */
document.getElementById('time-selector').onchange = function () {
	var targettoTitle = document.getElementById('setTargettoTitle');
	let e = document.getElementById("time-selector").value;
	if(e == "1m"){//if 1month -720 hours, change until to yesterday
		targettoTitle.innerHTML = "1 Month";
		timePeriod="-720h";
		until = "until=-24h";
		buildTarget(currentTarget,timePeriod);
		updateChart();
		newSelection();
	}else if(e == "1w"){//if 1week -168h until now
		targettoTitle.innerHTML = "1 Week";
		timePeriod="-168h";
		until="until=now";
		buildTarget(currentTarget,timePeriod);
		updateChart();
		newSelection();
	}else if(e == "1h"){//if 1hour -1h until now
		targettoTitle.innerHTML = "1 Hour";
		timePeriod="-1h";
		until="until=now";
		buildTarget(currentTarget,timePeriod);
		updateChart();
		newSelection();
	}
};

/*functions &eval*/

//time since epoch to human readable
function epochToTime(e){
	var i = parseInt(e)*1000;
	var date = new Date(i);
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var day = date.getDay();
	var sday = weekday[day];
	var monthno = date.getMonth();
	var smonth = month[monthno];
	var dayno = date.getUTCDate();
	var paddedSeconds = (seconds.toString()).padStart(2,'0');
	var paddedMinutes = (minutes.toString()).padStart(2,'0');
	if(timePeriod=="-1h"){
		var nDate = date.getHours() + ":" + paddedMinutes + ":" + paddedSeconds;
	}else if(timePeriod=="-168h"){
		var nDate = sday+" "+ smonth + " " + dayno;
	}else if(timePeriod=="-720h"){
		var nDate = sday+", "+ smonth + " " + dayno;
	}

	return nDate;
}

//thought it was XHR, but fetch was needed. 
function mockXHRjson(){
	fetch(fullTargetUrl.toString())
		.then(response=>{
			if(response.ok) {
				return response.json();
			}
			throw new Error('errd');
		})
		.then((responseJson) => {
			rawData = responseJson;
			parseJsonData(rawData);
		})
}
//render bar pie and main line charts
function barChartRender(){
	barChart.data.datasets[0].data=txBarData;
	barChart.data.datasets[1].data=rxBarData;
	barChart.update();
}
function pieChartRender(){
	//build dynamic labels for Rx/Tx in MB
	var labelTot = [];
	var tot1 = (parseInt(compareTotals[0])/1024).toFixed(2);
	var tot2 = (parseInt(compareTotals[1])/1024).toFixed(2);
	labelTot.push('Total Rx: '+tot1.toString()+' MB');
	labelTot.push('Total1 Tx: '+tot2.toString()+' MB');
	var labelAvg = [];
	labelAvg.push('Average Rx: '+(parseInt(compareAverages[0])/1024).toFixed(2).toString()+' MB');
	labelAvg.push('Average Tx: '+(parseInt(compareAverages[1])/1024).toFixed(2).toString()+' MB');

	myPieChart.data.labels=labelTot;
	myPieChart.data.datasets[0].data=compareTotals;
	myPieChart.update();

	myPieChart2.data.labels=labelAvg;
	myPieChart2.data.datasets[0].data=compareAverages;
	myPieChart2.update();
}
function mainChartRender(){
	myChart.data.labels=mainTime;
	myChart.data.datasets[0].data=mainData;
	myChart.update();	
}
//fill datapoints and timestamps into arrays
function parseJsonData(json){
	var b = 0;
	mainData = [];
	mainTime = [];
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			if(timePeriod=="-1h"){
			b = 2;	
			}else if(timePeriod=="-168h"){
			b = 100;			
			}else if(timePeriod=="-720h"){
			b = 240;
			}
			if(i%b==0){
			mainData.push(item[i][0]);
			mainTime.push(epochToTime(item[i][1]));
			}
		}
	};
}
function parseRxJson(json){
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			rxData.push(item[i][0]);
			rxTime.push(epochToTime(item[i][1]));
		}
	};

}
function parseTxJson(json){
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			txData.push(item[i][0]);
			txTime.push(epochToTime(item[i][1]));
		}
	};

}
document.getElementById('manualStart').onclick = function(){
	updateChart();
}
window.onload = function initialSetup(){
	//run this when page loads to fill data with current live data, 1 hour until now
	//load Rx data into jsonData1 and Tx data into jsonData2
	//load mainData with perfdata p1
	//
	buildTarget(currentTarget,timePeriod);
	fetch(startingURL)
		.then(response=>{
			if(response.ok) {
				return response.json();
			}
			throw new Error('errd');
		})
		.then((responseJson) => {
			rawData = responseJson;
			parseJsonData(rawData);
			//update chart label
			myChart.data.label=mainTime;
			//update chart data
			myChart.data.datasets[0].data=mainData;
			//push update
			myChart.update();	
			

		})
	fetch(txURL)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error('errd');
		})
		.then((responseJson) => {
			//success
			var rawTxData = responseJson;
			//jsonData1 = responseJson;
			parseTxJson(rawTxData);
			setupTxBar(rawTxData);
			prepareBarPie1(rawTxData);
			totalsAndAverages();
		})
	fetch(rxURL)
		.then(response => {
			if(response.ok) {
				return response.json();
			}
			throw new Error('errd');
		})
		.then((responseJson) => {
			//success
			var rawRxData = responseJson;
			//jsonData2=responseJson;
			setupRxBar(rawRxData);
			parseRxJson(rawRxData);
			prepareBarPie2(rawRxData);
			totalsAndAverages();
		})
	updateChart();

}
/* chart rebuilder */
function updateChart(){
	//pull new json
	mockXHRjson();
	var graphTitle = document.getElementById('mainGraphTitle');
	graphTitle.innerHTML = chartTitle;
	mainChartRender();
	barChartRender();
	pieChartRender();
	}

function totalsAndAverages(){
	compareTotals = [];
	compareTotals.push(totData1);
	compareTotals.push(totData2);
	compareAverages = [];
	compareAverages.push(avgData1);
	compareAverages.push(avgData2);
	barChartRender();
	pieChartRender();

}
setTimeout(function (){
	newSelection();
}, 3500);

function prepareBarPie1(json){
	setupTotData1(json);
	setupAvgData1(json);
}
function prepareBarPie2(json){
	setupTotData2(json);
	setupAvgData2(json);
}
function jsonGetter(url){
	
}
//fill rxBarData
function setupRxBar(json){
		rxBarTime = [];
		rxBarData = [];
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			rxBarTime.push(epochToTime(item[i][1]));
			rxBarData.push(item[i][0]);
		}
		
	};
}
//fill txBarData
function setupTxBar(json){
		txBarData = [];
		txBarTime = [];
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			txBarTime.push(epochToTime(item[i][1]));
			txBarData.push(item[i][0]);
		}
	};
}
// find TOTAL data 1
function setupTotData1(json){
	totData1=0;
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			if(isNaN(parseInt(item[i][0]))===false){
				totData1+=parseInt(item[i][0]);
			}
		}
	};
}
//find TOTAL data 2
function setupTotData2(json){
	totData2=0;
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			if(isNaN(parseInt(item[i][0]))===false){
				totData2+=parseInt(item[i][0]);
			}
		}
	};
}
//find AVERAGE data 1
function setupAvgData1(json){
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			if(isNaN(parseInt(item[i][0]))===false){
				avgData1+=parseInt(item[i][0]);
			}
		}
		//compute average
		avgData1 = avgData1/item.length;
	};
}
//find AVERAGE data 2
function setupAvgData2(json){
	for(var key in json){
		var item = json[0].datapoints;
		for( let i=0;i<item.length;i++){
			if(isNaN(parseInt(item[i][0]))===false){
				avgData2+=parseInt(item[i][0]);
			}
		}
		//compute average
		avgData2 = avgData2/item.length;
	};
}
/* END LOGIC */

/*build charts once (main linechart 'myChart' is updated later)*/
var ctx = document.getElementById('myChart').getContext("2d");
var pieCtx = document.getElementById('pieChartCanvas').getContext("2d");
var barCtx = document.getElementById('barChartCanvas').getContext("2d");
var barChart = new Chart(barCtx, {
	type: 'bar',
	data: {
		labels: rxTime,
		datasets: [{
			fill: true,
			label: "Rx",
			data: rxBarData,
			backgroundColor: [
			'rgb(255,99,132)'
			]
		},
			{
			fill: true,
			label: "Tx",
			data: txBarData,
			backgroundColor: [
			'rgb(0,110,117)'
			]}
	
		]
	}
});

var myPieChart = new Chart(pieCtx, {
	type: 'pie',
	data: {
		labels: ['Total Rx: '+(parseInt(compareTotals[0])/1024).toFixed(2).toString()+' MB',
			'Total Tx: '+(parseInt(compareTotals[1])/1024).toFixed(2).toString()+' MB'
		],
		datasets: [{
			label: '1 Hour TOTAL Rx/Tx Pie Chart Comparison',
			data: compareTotals,
			width: "200",
			height: "200",
			backgroundColor: [
				'rgb(255,99,132)',
				'rgb(0,110,117)'],
			hoverOffset: 4
	}]

	},
});

var pieCtx = document.getElementById('pieChartCanvas2').getContext("2d");
var myPieChart2 = new Chart(pieCtx, {
	type: 'pie',
	data: {
		labels: ['Average Rx: '+(parseInt(compareAverages[0])/1024).toFixed(2).toString()+' MB',
			'Average Tx: '+(parseInt(compareAverages[1])/1024).toFixed(2).toString()+' MB'
		],
		datasets: [{
			label: '1 Hour AVERAGE Rx/Tx Pie Chart Comparison',
			data: compareAverages,
			width: "200",
			height: "200",
			backgroundColor: [
				'rgb(255,99,132)',
				'rgb(0,110,117)'],
			hoverOffset: 4
	}]

	}
});


var myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [...timeStamps],
		datasets: [
			{
			label: mainTime,
			data: mainData,
			width: "400",
			height: "400",
			backgroundColor: [
				'rgb(255,99,132)']
		}]
	}
});
