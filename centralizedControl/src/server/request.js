import axios from 'axios'
import service from './service'

// 创建实例
const requestD = axios.create({
    baseURL:service.url,
    timeout:5000
})

// 请求拦截器
requestD.interceptors.request.use(config => {
    return config;
},err=>{
    return Promise.reject(err)
})

// 响应拦截器
requestD.interceptors.response.use(res=>{
    return res.data;
},err=>{
    Promise.reject(err)
})

export default requestD