const Mock = require('mockjs')

const url = {
	radarD9: 'http://mockjs/radar/D9',
	radarD10: 'http://mockjs/radar/D10',
	machine_state: 'http://mockjs/machine_state/',
	defect: 'http://mockjs/defect_type/'
}

Mock.mock(url.radarD9, {
	"E線|1-100": 20,
	"F線|1-100": 30,
	"G線|1-100": 50
})
Mock.mock(url.radarD10, {
	"A線|1-100": 20,
	"B線|1-100": 30,
	"C線|1-100": 50,
	"D線|1-100": 80
})
Mock.mock(RegExp(url.machine_state + ".*"), {
	'正常|20-50': 43,
	'待機|1-20': 2, 
	'調機|1-20': 2,
	'維修|1-20': 5,
	'修模|1-10': 2,
	'換模|1-10': 5,
	'斷線|1-10': 1
})
Mock.mock(RegExp(url.defect + ".*"), {
	'料花|1-5': 4,
	'黑紋|1-5': 2, 
	'刮傷|1-5': 1,
	'毛邊|1-5': 1,
	'異色|1-5': 1
})