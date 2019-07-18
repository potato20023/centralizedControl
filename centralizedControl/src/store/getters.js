const getters = {
    data:state => state.data,
    screenWidth:state => state.mode.screenWidth,    // 屏幕宽
    screenHeight:state => state.mode.screenHeight,  // 屏幕高
    showTree:state => state.mode.showTree, //左侧列表当前是显示乡镇还是学校
    townId:state => state.mode.townId,    // 当前乡镇id
    townName:state => state.mode.townName,
    schoolId:state => state.mode.schoolId,   // 当前选择学校的id
    schoolName:state => state.mode.schoolName,
    web:state => state.mode.web,    // 学校设备实时信息
    deviceList:state => state.mode.deviceList,    // 设置当前学校设备列表
}


export default getters