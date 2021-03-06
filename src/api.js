import axios from 'axios';
import store from '@/store';

// 總覽
const NWEOverview = axios.create({
  baseURL: 'http://10.124.131.87:8880/overview/'
});

// 生產排程
const NWEPlan = axios.create({
  baseURL: 'http://10.124.131.87:8880/plan/'
});

// 資料輸入、維護
const NWEData = axios.create({
  baseURL: 'http://10.124.131.87:8880/data/'
});

// 計畫預覽、工單計畫
const NWEOrder = axios.create({
  baseURL: 'http://10.132.41.95:8002/api/'
});

const Token = axios.create({
  baseURL: 'http://10.124.131.87:8880/token/'
})

export const login = (username,passwd) => {
  let formData = new FormData();
  formData.append('username', username)
  formData.append('password', passwd)
  return Token.post('/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

// 攔截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer '+ store.getters.token
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})


// 生產狀態
export const overviewMachineStateCount = (field) => NWEOverview.get('/machine/statecount/?field='+field)
export const overviewMachineAbnormal = (field) => NWEOverview.get('/machine/abnormalacc/?field='+field)
export const overviewMachineFailureRate = (field) => NWEOverview.get('/machine/failurerate/?field='+field)
export const overviewMachineStartRate = (field) => NWEOverview.get('/machine/state/?field='+field)
export const overviewMachineBoard = (field) => NWEOverview.get('/machine/board/?field='+field)
export const overviewSecurityInfo = (machine_NO) => NWEOverview.get('/security/info/?machine_NO='+machine_NO)
export const overviewSecurityTest = (machine_NO) => NWEOverview.get('/security/test/?machine_NO='+machine_NO)
export const overviewSecurityState = (field) => NWEOverview.get('/security/state/?field='+field)

// 模具維護
export const dataMoldSearch = (moldno) => NWEData.get('/mold/',{ params: { moldno: moldno } })

// 機台維護
export const dataMachineColor = () => NWEData.get('/machinecolor/')
export const dataImportMachine = (user,file) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('file', file)
  return NWEData.post('/import/machine/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditMachineColor = (row, user) => {
  let formData = new FormData();
  formData.append('machine_NO', row.machine_NO)
  formData.append('machine_ton', row.machine_ton)
  formData.append('product_color', row.product_color)
  formData.append('user', user)
  return NWEData.post('/machinecolor/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

// 前置作業時間
export const dataCtTime = () => NWEData.get('/cttime/')
export const dataImportCtTime = (user,file) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('file', file)
  return NWEData.post('/import/cttime/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditCtTime = (row, user) => {
  let formData = new FormData();
  formData.append('machine_ton', row.machine_ton)
  formData.append('mold_cttime', row.mold_cttime)
  formData.append('user', user)
  return NWEData.post('/cttime/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataDelCtTime = (machine_ton) => {
  let formData = new FormData();
  formData.append('machine_ton', machine_ton);
  return NWEData.post('/delcttime/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

// 料號維護
export const dataPlasticColor = (plastic_part_NO) => {
  if (typeof(plastic_part_NO) == 'undefined') return NWEData.get('/plasticcolor/')
  else return NWEData.get('/plasticcolor/?plastic_part_NO='+plastic_part_NO)
}
export const dataImportPlasticColor = (user,file) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('file', file)
  return NWEData.post('/import/plasticcolor/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditPlasticColor = (row, user) => {
  let formData = new FormData();
  formData.append('plastic_part_NO', row.plastic_part_NO)
  formData.append('plastic_color', row.plastic_color)
  formData.append('user', user)
  return NWEData.post('/plasticcolor/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

// 常用or共有api
export const dataColorList = () => NWEData.get('/colorlist/')
export const dataTonList = () => NWEData.get('/tonlist/')
export const dataSourceList = () => NWEData.get('/sourcelist/')
// 範例檔案下載 filetype =>
// tondata: 前置作業時間、machineton: 機台維護、plasticcolor: 料號維護
// dayplan: 急單、weekplan: 周料號
export const dataFileDownload = (filetype) => NWEData.get('/filedown/?filetype='+filetype,{ responseType: 'blob' })

// 生產排程：急單
export const dataDayPlan = () => NWEData.get('/dayplan/')
export const dataImportDayPlan = (user,file) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('file', file)
  return NWEData.post('/import/dayplan/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditDayPlan = (row, user) => {
  // alert(row.sec_Part_NO)
  let formData = new FormData();
  formData.append('sec_Part_NO', row.sec_Part_NO)
  formData.append('plan_number', row.plan_number)
  formData.append('require_source', row.require_source)
  formData.append('require_date', row.require_date)
  formData.append('place_of_shipment', row.place_of_shipment)
  formData.append('user', user)
  return NWEData.post('/dayplan/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataDelDayPlan = (sec_Part_NO) => {
  let formData = new FormData();
  formData.append('sec_Part_NO', sec_Part_NO);
  return NWEData.post('/deldayplan/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

// 生產排程：周料號
export const dataWeekPlan = () => NWEData.get('/weekplan/')
export const dataImportWeekPlan = (user,file) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('file', file)
  return NWEData.post('/import/weekplan/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditWeekPlan = (row, user) => {
  let formData = new FormData();
  formData.append('Part_NO', row.Part_NO)
  formData.append('plan_number', row.plan_number)
  formData.append('user', user)
  return NWEData.post('/weekplan/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataDelWeekPlan = (Part_NO) => {
  let formData = new FormData();
  formData.append('Part_NO', Part_NO);
  return NWEData.post('/delweekplan/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

export const planTonList = (line) => {
  if (typeof(line) == 'undefined') return NWEPlan.get('/tonlist/')
  else return NWEPlan.get('/tonlist/?line='+line)
}

// 計畫工單
export const PlanOrder = (field,line,ton) => {
  return NWEOrder.get('/planorder/?',{params: { field: field, line: line, ton: ton}})
}

// 計畫工單
export const WorkOrder = (field,line,ton) => {
  return NWEOrder.get('/workorder/?',{params: { field: field, line: line, ton: ton}})
}

//機台資料
export const MachineData = () => {
  return NWEPlan.get('/machinedata/')
}

//周計畫料號
export const WeeksPlan = () => {
  return NWEPlan.get('/weekplan/')
}

//料號資訊
export const PartNoInfo = (part_no) => {
  return NWEPlan.get('/partNoInfo/?',{params: { part_no : part_no}})
}

//料號資訊
export const Export_NWE_Planning = (start_date,end_date,data_type) => {
  return NWEPlan.get('/export/?',{params: { start_date : start_date,end_date:end_date,data_type:data_type}})
}

export const planWorklist = (line) => {
  return NWEPlan.get('/worklist/',{params: { line: line }})
}
export const planWorkTonlist = (line) => {
  return NWEPlan.get('/worktonlist/',{params: { line: line }})
}