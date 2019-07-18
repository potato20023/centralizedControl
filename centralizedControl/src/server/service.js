let service = {}

if(process.env.NODE_ENV == 'development'){
    // 开发环境
    service.url = 'http://192.168.17.215:4000'
    // service.url = 'http://192.168.18.101:10000'
}else{
    // 部署环境
    service.url = 'http://192.168.17.133:3000'
}

export default service