import Vue from 'vue' 
import ols from '@/components/openlayer'
import arcgismap from '@/components/arcgisMap'

import iView from 'iview';
import VueRouter from 'vue-router' 
Vue.use(VueRouter)

export const routers = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/components/login'), 
    },
    {
        path: '/BMapPage',
        name: 'BMapPage',
        component: () =>
            import ('@/components/BMap'), 
    }, 
    //404
    {
        path: '/errorPage',
        name: 'errorPage',
        component: () =>
            import ('@/components/errorPage/errorPage'), 
    }, 
    {
        path: '/main',
        name: 'main',
        component: () =>
            import ('@/components/main'), 
        children: [
            //个体暴露可视化监测
            {
                path: 'individualExpose',
                name: 'individualExpose',
                meta: {
                    login_require: true
                },
                component: () =>
                    import ('@/components/individual-expose'), 
                children: [{
                        path: 'arcgismap',
                        name: 'arcgismap', 
                        component: arcgismap,
                        children: [/* {
                                path: 'TravelReplay',
                                name: 'TravelReplay',
                                component: () =>
                                    import ('@/components/individual-expose/TravelReplay'), 
                            }, */
                            {
                                path: 'RealtimeExposemeasure',
                                name: 'RealtimeExposemeasure',
                                component: () =>
                                    import ('@/components/individual-expose/RealtimeExposemeasure'), 
                            },
                            {
                                path: 'SimulatedExposemeasure',
                                name: 'SimulatedExposemeasure',
                                component: () =>
                                    import ('@/components/individual-expose/SimulatedExposemeasure'), 
                            }/* ,
                            {
                                path: 'HistoricalExposureReplay',
                                name: 'HistoricalExposureReplay',
                                component: () =>
                                    import ('@/components/individual-expose/HistoricalExposureReplay'), 
                            }, */
                        ]
                    },
                    {
                        path: 'arcgismap',
                        name: 'arcgismap', 
                        component: () =>
                            import ('@/components/BMap'), 
                        children: [{
                            path: 'HistoricalExposureReplay',
                            name: 'HistoricalExposureReplay',
                            component: () =>
                                import ('@/components/individual-expose/HistoricalExposureReplay'), 
                        }]
                    },
                    {
                        path: 'arcgismap',
                        name: 'arcgismap', 
                        component: () =>
                            import ('@/components/BMap'), 
                        children: [{
                            path: 'TravelReplay',
                            name: 'TravelReplay',
                            component: () =>
                                import ('@/components/individual-expose/TravelReplay'), 
                        }]
                    },
                    {
                        path: 'ArcgisMap3D',
                        name: 'ArcgisMap3D', 
                        component: () =>
                            import ('@/components/Arcgis-Map'), 
                        children: [{
                            path: 'VisualExposureScene3D',
                            name: 'VisualExposureScene3D',
                            component: () =>
                                import ('@/components/individual-expose/VisualExposureScene3D'), 
                        }, ]
                    }
                ]
            },
            //人群暴露可视化监测
            {
                path: 'populationExpose',
                name: 'populationExpose',
                meta: {
                    login_require: true
                },
                component: () =>
                    import ('@/components/population-expose'), 
                children: [{
                    path: 'arcgismap',
                    name: 'arcgismap',
                    component: arcgismap, 
                    children: [{
                            path: 'FineDrawingPollution',
                            name: 'FineDrawingPollution',
                            component: () =>
                                import ('@/components/population-expose/FineDrawingPollution'), 
                        },
                        {
                            path: 'PopDistributSimulation',
                            name: 'PopDistributSimulation',
                            component: () =>
                                import ('@/components/population-expose/PopDistributSimulation'), 
                        },
                        {
                            path: 'PopExposureCalculation',
                            name: 'PopExposureCalculation',
                            meta:{
                                title:"人群暴露统计"
                            },
                            component: () =>
                                import ('@/components/population-expose/PopExposureCalculation'), 
                        },
                        {
                            path: 'ExposureDynamicAnalysis',
                            name: 'ExposureDynamicAnalysis',
                            component: () =>
                                import ('@/components/population-expose/ExposureDynamicAnalysis'), 
                        },
                        {
                            path: 'ExposureSimulationPredict',
                            name: 'ExposureSimulationPredict',
                            meta:{
                                title:"人群暴露模拟预测统计"
                            },
                            component: () =>
                                import ('@/components/population-expose/ExposureSimulationPredict'), 
                        },
                    ]
                }]
            },
            //暴露风险时空统计
            {
                path: 'spaceStatistic',
                name: 'spaceStatistic',
                meta: {
                    login_require: true
                },
                component: () =>
                    import ('@/components/space-statistic'), 
                children: [{
                    path: 'arcgismap',
                    name: 'arcgismap',
                    component: arcgismap,
                    children: [{
                            path: 'IndividualRiskStatistics',
                            name: 'IndividualRiskStatistics',
                            component: () =>
                                import ('@/components/space-statistic/IndividualRiskStatistics'), 
                        },
                        {
                            path: 'PopulationRiskStatistics',
                            name: 'PopulationRiskStatistics',
                            component: () =>
                                import ('@/components/space-statistic/PopulationRiskStatistics'), 
                        },
                        {
                            path: 'RiskHotRanking',
                            name: 'RiskHotRanking',
                            component: () =>
                                import ('@/components/space-statistic/RiskHotRanking'), 
                        },
                        {
                            path: 'IndividualRiskRanking',
                            name: 'IndividualRiskRanking',
                            component: () =>
                                import ('@/components/space-statistic/IndividualRiskRanking'), 
                        },
                        {
                            path: 'RiskChangeAnalysis',
                            name: 'RiskChangeAnalysis',
                            component: () =>
                                import ('@/components/space-statistic/RiskChangeAnalysis'), 
                        },
                    ]
                }]
            },
            //暴露风险时空源解析
            {
                path: 'sourceAnalysis',
                name: 'sourceAnalysis',
                meta: {
                    login_require: true
                },
                component: () =>
                    import ('@/components/source-analysis'), 
                children: [{
                        path: 'arcgismap',
                        name: 'arcgismap',
                        component: ols, 
                        children: [{
                                path: 'TravelmodeRiskAnalysis',
                                name: 'TravelmodeRiskAnalysis',
                                component: () =>
                                    import ('@/components/source-analysis/TravelmodeRiskAnalysis'), 
                            }
                        ]
                    },
                    {
                        path: 'arcgismap',
                        name: 'arcgismap',
                        component: arcgismap, 
                        children: [
                            {
                                path: 'RiskTimePeriodAnalysis',
                                name: 'RiskTimePeriodAnalysis',
                                component: () =>
                                    import ('@/components/source-analysis/RiskTimePeriodAnalysis'), 
                            },
                            {
                                path: 'RiskLocationAnalysis',
                                name: 'RiskLocationAnalysis',
                                component: () =>
                                    import ('@/components/source-analysis/RiskLocationAnalysis'), 
                            },
                            {
                                path: 'PollutantAnalysis',
                                name: 'PollutantAnalysis',
                                component: () =>
                                    import ('@/components/source-analysis/PollutantAnalysis'), 
                            },
                            {
                                path: 'PollutionSourcesAnalysis',
                                name: 'PollutionSourcesAnalysis',
                                component: () =>
                                    import ('@/components/source-analysis/PollutionSourcesAnalysis'), 
                            },
                            {
                                path: 'ExposureMarkerParsing',
                                name: 'ExposureMarkerParsing',
                                component: () =>
                                    import ('@/components/source-analysis/ExposureMarkerParsing'), 
                            },
                        ]
                    },
                    // {
                    //     path: 'PollutionSourcesAnalyCharts',
                    //     name: 'PollutionSourcesAnalyCharts',
                    //     component: () =>
                    //         import ('@/components/echarts/PollutionSourcesAnalyCharts'), 
                    //     children: [{
                    //         path: 'PollutionSourcesAnalysis',
                    //         name: 'PollutionSourcesAnalysis',
                    //         component: () =>
                    //             import ('@/components/source-analysis/PollutionSourcesAnalysis'), 
                    //     }]
                    // }
                ]
            },
            //暴露风险情景仿真
            {
                path: 'sceneSimulation',
                name: 'sceneSimulation',
                meta: {
                    login_require: true
                },
                component: () =>
                    import ('@/components/scene-simulation'), 
                children: [{
                    path: 'arcgismap',
                    name: 'arcgismap',
                    component: () =>
                        import ('@/components/scene-simulation/exposurerisk-base'), 
                    children: [ 
                        {
                            path: 'PollutionControlSimulation',
                            name: 'PollutionControlSimulation',
                            component: () =>
                                import ('@/components/scene-simulation/PollutionControlSimulation'), 
                        },
                        {
                            path: 'PopulationMoveSimulation',
                            name: 'PopulationMoveSimulation',
                            component: () =>
                                import ('@/components/scene-simulation/PopulationMoveSimulation'), 
                        },
                        {
                            path: 'PollutionPredictSimulation',
                            name: 'PollutionPredictSimulation', 
                            component: () =>
                                import ('@/components/scene-simulation/PollutionPredictSimulation'), 
                        },
                        {
                            path: 'PrevetControlAssDecision',
                            name: 'PrevetControlAssDecision',
                            component: () =>
                                import ('@/components/scene-simulation/PrevetControlAssDecision'), 
                        },
                    ]
                },
                {
                    path: 'arcgismap',
                    name: 'arcgismap',
                    component: arcgismap, 
                    children: [{
                        path: 'TargetScenarioSimulation',
                        name: 'TargetScenarioSimulation', 
                        component: () =>
                            import ('@/components/scene-simulation/TargetScenarioSimulation'), 
                    }]
                }
                            
            ]
            },
            // {
            //     path: "*",
            //     redirect: "/"
            // }
        ]
    }
]  

const router = new VueRouter({
    base: "/subSystem/",
    routes: routers
});

export default router;

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.login_require)) { 
//       next('/login')
//     } else 
//       next()
//   })

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(function (item) {
//       return item.meta.login_require
//     })) {
//       next('/login')
//     } else 
//       next()
//   })
// router.afterEach((to) => {
//     // iView.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });