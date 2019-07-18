import {getDataD,getDevListD,getDevConfigListD,getOnlineInfoD,getOfflineListD,getMonthUseD,getTownUseD,getschoolUseD,getSearchD} from '../../api/api'

const state = {
    data:'',
    screenWidth:document.documentElement.clientWidth,  // 屏幕宽度
    screenHeight:document.documentElement.clientHeight,  // 屏幕高度
    showTree:window.sessionStorage.getItem('showTree'),  // 左侧列表当前是显示乡镇还是学校
    townId:window.sessionStorage.getItem('townId'),   // 当前乡镇id
    townName:window.sessionStorage.getItem('townName'),
    schoolId:window.sessionStorage.getItem('schoolId'),    // 当前学校id
    schoolName:window.sessionStorage.getItem('schoolName'),
    deviceList:window.sessionStorage.getItem('deviceList') != '' ? JSON.parse(window.sessionStorage.getItem('deviceList')) : '',    // 学校设备实时信息
    // deviceList:window.sessionStorage.getItem('deviceList'),// 当前设备列表
    showTree:window.sessionStorage.getItem('showTree') == undefined?1:window.sessionStorage.getItem('showTree'),   // 显示tree乡镇还是学校列表
}

const mutations = {
    'SET_DATA':(state,res)=>{
        state.data = res
    },
    // 设置屏幕宽度
    'SET_SCREEN_WIDTH':(state, res) => {
        state.screenWidth = res
    },
    // 设置屏幕高度
    'SET_SCREEN_HEIGHT':(state, res) => {
        state.screenHeight = res
    },
    // 设置左侧列表当前是显示乡镇还是学校
    'SET_SHOWTREE':(state, res)=>{
        state.showTree = res
    },
    // 设置当前乡镇id
    'SET_TOWN_ID':(state, res)=> {
        state.townId = res
    },
    // 设置当前乡镇名字
    'SET_TOWN_NAME':(state,res)=>{
        state.townName = res
    },
    // 设置当前学校id
    'SET_SCHOOL_ID':(state,res)=>{
        state.schoolId = res
    },
    // 设置当前学校名字
    'SET_SCHOOL_NAME':(state,res)=>{
        state.schoolName = res
    },
    // 学校设备实时信息
    'SET_WEB':(state,res)=>{
        state.web = res
    },
    // 设置当前学校设备列表
    'SET_DEVICE_LIST':(state,res)=>{
        state.deviceList = res
    }
}

const actions = {
    // 获取乡镇数据
    getData({commit},data){
        return new Promise((resolve,reject)=>{
            getDataD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 通过学校id获取设备列表
    getDevList({commit},data){
        return new Promise((resolve,reject)=>{
            getDevListD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    //通过设备id获取设备详情
    getDevConfigList({commit},data){
        return new Promise((resolve,reject)=>{
            getDevConfigListD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 获取设备在线率
    getOnlineInfo({commit},data){
        return new Promise((resolve,reject)=>{
            getOnlineInfoD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 获取指定范围内的离线设备列表
    getOfflineList({commit},data){
        return new Promise((resolve,reject)=>{
            getOfflineListD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 月/周使用率
    getMonthUse({commit},data){
        return new Promise((resolve,reject)=>{
            getMonthUseD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 各个乡镇的使用率
    getTownUse({commit},data){
        return new Promise((resolve,reject)=>{
            getTownUseD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 学校使用率排名
    getschoolUse({commit},data){
        return new Promise((resolve,reject)=>{
            getschoolUseD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 搜索
    getSearch({commit},data){
        return new Promise((resolve,reject)=>{
            getSearchD(data).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },

}

export default{
    state,
    mutations,
    actions
}