export interface ChildRoute {
    path: string,
    name: string,
    component: string
}
export interface BestAFSRoute {
    path: string
    routes?: Array<ChildRoute>
    component?: string
    //如果需要出现在左侧的菜单栏只需添加name属性
    name?: string
    icon?: string
    redirect?: string
    // 新页面打开
    target?: string
    // 不展示顶栏
    headerRender?: boolean
    // 不展示页脚
    footerRender?: boolean
    // 不展示菜单
    menuRender?: boolean
    // 不展示菜单顶栏
    menuHeaderRender?: boolean
    // 权限配置，需要与 plugin-access 插件配合使用
    access?: string
    // 隐藏子菜单
    hideChildrenInMenu?: boolean
    // 隐藏自己和子菜单
    hideInMenu?: boolean
    // 在面包屑中隐藏
    hideInBreadcrumb?: boolean
    // 子项往上提，仍旧展示,
    flatMenu?: boolean
    // 路由鉴权
    wrappers?: Array<string>
}
const routes: BestAFSRoute[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        icon: 'HomeOutlined',
        name: 'Home',
        component: '@/pages/home/',
        wrappers: ['@/routes/PriviteRoute']
    },
    {
        path: '/login',
        // name:'登录',
        component: '@/pages/login/',
        headerRender: false,
        // 不展示页脚
        footerRender: false,
        // 不展示菜单
        menuRender: false
    }

]
export default routes