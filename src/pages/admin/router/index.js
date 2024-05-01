import Vue from 'vue';
import Router from 'vue-router';
import Index from "@/pages/admin/views/Index";
import Ranking from "@/pages/admin/views/Ranking";
import Config from "@/pages/admin/views/Config";
import Bulletin from "@/pages/admin/views/Bulletin";
import Category from "@/pages/admin/views/Category";
import Challenge from "@/pages/admin/views/Challenge";
import Log from "@/pages/admin/views/Log";
import User from "@/pages/admin/views/User";


Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },{
            path: '/ranking',
            name: 'Ranking',
            component: Ranking
        },{
            path: '/config',
            name: 'Config',
            component: Config
        },{
            path: '/bulletin',
            name: 'Bulletin',
            component: Bulletin
        },{
            path: '/category',
            name: 'Category',
            component: Category
        },{
            path: '/challenge',
            name: 'Challenge',
            component: Challenge
        },{
            path: '/log',
            name: 'Log',
            component: Log
        },{
            path: '/user',
            name: 'User',
            component: User
        },

    ]
});

export default router;
