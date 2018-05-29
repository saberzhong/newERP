let dom = document.getElementById("container");
let myChart = echarts.init(dom);
labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
let labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
let labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false,
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
let radius = [40, 55];
option = {
    legend: {
        x : 'center',
        y : '20%',//控制图例位置 可选值（center，百分比）
        data:[
            'Product1', 'Product2', 'Product3', 'Product4'
        ]
    },
    title : {
        text: 'The progress status of products',
        subtext: 'The data is shown as the surplus production of the product',
        x: 'center',
        padding: [10, 10]
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: true},//readonly控制数据试图页面刷新是否按钮是否可见
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        width: '20%',
                        height: '30%',
                        itemStyle : {
                            normal : {
                                label : {
                                    formatter : function (params){
                                        return 'other\n' +params.value + '%\n'
                                    },
                                    textStyle: {
                                        baseline : 'middle'
                                    }
                                }
                            },
                        }
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    //数据图表开始
   series : [
        {
            type : 'pie',
            center : ['20%', '50%'],//参数（第一个控制x轴上位置，第二个参数控制y轴上位置）
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:10, itemStyle : labelBottom},
                {name:'Product1', value:90,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['40%', '50%'],
            radius : radius,
            x:'20%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:66, itemStyle : labelBottom},
                {name:'Product2', value:34,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['60%', '50%'],
            radius : radius,
            x:'40%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:86, itemStyle : labelBottom},
                {name:'Product3', value:14,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['80%', '50%'],
            radius : radius,
            x:'60%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:89, itemStyle : labelBottom},
                {name:'Product4', value:11,itemStyle : labelTop}
            ]
        },
    ]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
