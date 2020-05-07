import axios from 'axios';

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

export const overviewMachineStateCount = (field) => NWEOverview.get('/machine/statecount/?field='+field)
export const overviewMachineStartRate = (field) => NWEOverview.get('/machine/state/?field='+field)
export const overviewMachineBoard = (field) => NWEOverview.get('/machine/board/?field='+field)

// 模具維護
export const dataMoldSearch = (moldno) => NWEData.get('/mold/',{ params: { moldno: moldno } })

// 機台維護
export const dataMachineColorSearch = () => NWEData.get('/machinecolor/')
export const dataImportMachine = (user,files) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('files', files)
  return NWEData.post('/import/machine/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditMachineColor = (machine_NO, product_color, user) => {
  let formData = new FormData();
  formData.append('machine_NO', machine_NO)
  formData.append('product_color', product_color)
  formData.append('user', user)
  return NWEData.post('/machinecolor/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}

// 前置作業時間
export const dataCtTime = () => NWEData.get('/cttime/')
export const dataImportCtTime = (user,files) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('files', files)
  return NWEData.post('/import/cttime/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditCtTime = (machine_NO, product_color, user) => {
  let formData = new FormData();
  formData.append('machine_NO', machine_NO)
  formData.append('product_color', product_color)
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
export const dataPlasticColor = () => NWEData.get('/plasticcolor/')
export const dataImportPlasticColor = (user,files) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('files', files)
  return NWEData.post('/import/plasticcolor/', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const dataEditPlasticColor = (machine_NO, product_color, user) => {
  let formData = new FormData();
  formData.append('machine_NO', machine_NO)
  formData.append('product_color', product_color)
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
export const dataImportDayPlan = (user,files) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('files', files)
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
export const dataImportWeekPlan = (user,files) => {
  let formData = new FormData();
  formData.append('user', user)
  formData.append('files', files)
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

// 計畫預覽
export const planTonList = (line) => {
  if (typeof(line) == 'undefined') return NWEPlan.get('/tonlist/')
  else return NWEPlan.get('/tonlist/?line='+line)
}
export const planPreview = () => NWEPlan.get('/preview/')
export const planEditPreview = () => NWEPlan.post('/preview/')
