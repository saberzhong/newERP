//投放广告板块
let loadData = () => {
    const ad=document.getElementById('ad');
    const raw=document.getElementById('raw');
    const product=document.getElementById('product');
    const factory=document.getElementById('factory');
    const line=document.getElementById('line');
    const research=document.getElementById('research');
    const develop=document.getElementById('develop');
    const loan=document.getElementById('loan');

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/erpm/remind/remindAction!workRemind.action',
        success:function(json){
            //投放广告板块
            if(json.isAD==false){
                ad.innerHTML='<p>' + '未投放广告' + '</p>';
            }
            else{
                ad.innerHTML='<p>'+'已投递'+json.totalADMoney+'元'+'</p>';
            }
            //购买原材料板块
            for(let i in json.materialReach){
                if(json.materialReach){
                    raw.innerHTML+='<p>'+json.materialReach[i].materialName+'</p>'
                        +'<p>'+json.materialReach[i].reachNumber+'</p>';
                }
            }

            //生产产品板块
            for(let i in json.isProduct){
                if(json.isProduct){
                    product.innerHTML+='<p>'+json.isProduct[i].productNumber+'</p>'
                        +'<p>'+json.isProduct[i].productType+'</p>';
                }
            }
            //厂房建造板块
            if(json.developedFactoryNumber!=0){
                factory.innerHTML='<p>'+'厂房正在建造，请等待'+'</p>';
            }
            else{
                factory.innerHTML='<p>'+'没有厂房正在建造'+'</p>';
            }

            //生产线建造板块
            if(json.developedProductLineNumber){
                line.innerHTML='<p>'+'生产线正在建造，请等待'+'</p>';
            }
            else{
                line.innerHTML='<p>'+'没有生产线正在建造'+'</p>';
            }
            //产品研发板块
            for (let i in json.researchProducts){
                if(json.researchProducts){
                    research.innerHTML+='<p>'+'产品'+json.researchProducts[i]+'已研发成功'+'</p>';
                }
                else{
                    research.innerHTML+='<p>'+'产品'+json.researchProducts[i]+'还在研发中'+'</p>';
                }
            }
            //产品认证板块
            for (let i in json.reasearchCertification){
                if(json.reasearchCertification){
                    develop.innerHTML+='<p>'+'产品'+json.reasearchCertification[i]+'已认证成功'+'</p>';
                }
                else{
                    develop.innerHTML+='<p>'+'产品'+json.reasearchCertification[i]+'还在认证中'+'</p>';
                    alert(111);
                }
            }

            //贷款管理板块
            for (let i in json.nextLoanDeadline){
                if(json.nextLoanDeadline){
                    loan.innerHTML+='<p>'+'下次贷款还款日期为'+json.nextLoanDeadline[i]+'</p>';
                }
                else {
                    loan.innerHTML='<p>'+'没有贷款'+'</p>';
                }
            }

        },
        error: function (json) {
            alert(JSON.stringify(json));
        },
    });
};
loadData();
