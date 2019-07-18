import requestD from '../server/request'

 // 获取乡镇数据
export function getDataD(data){
    return requestD({
        url:'/web/get_school_list',
        method:'get'
    })
}

// 通过学校id获取设备列表
export function getDevListD(data){
    // console.log(data)
    return requestD({
        url:'/web/get_dev_list/' + data.schoolId,
        // url:'/web/get_dev_list/dc73747fe41a4af6a7967a25dd4c7b5f',
        method:'get',
        data:data
    })
}

//通过设备id获取设备详情
export function getDevConfigListD(data){
    return requestD({
        url:'/web/get_dev_config/' + data.deviceId,
        // url:'/web/get_dev_config/856338dc-c6ef-4629-8353-8283e348561b',
        method:'get',
        data:data
    })
}

// 获取设备在线率
export function getOnlineInfoD(data){
    return requestD({
        url:'/web/getOnlineInfo',
        method:'post',
        data:data
    })
}
 // ​ 获取是定范围内(3天,5天)的离线设备列表
 export function getOfflineListD(data){
    return requestD({
        url:'/web/getOfflineList',
        method:'post',
        data:data
    })
}
 // ​ 月/周使用率
 export function getMonthUseD(data){
    return requestD({
        url:'',
        method:'',
        data:data
    })
}
 // ​ 各个乡镇的使用率
 export function getTownUseD(data){
    return requestD({
        url:'',
        method:'',
    })
}
 // ​ 学校使用率排名
 export function getschoolUseD(data){
    return requestD({
        url:'',
        method:'',
        data:data
    })
}
 // ​ 搜索
 export function getSearchD(data){
    return requestD({
        url:'',
        method:'',
        data:data
    })
}