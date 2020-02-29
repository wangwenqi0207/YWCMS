<template>
    <div style="width:100%;background:#F5F5F5;height:100%;text-align:left;" id="consult">
        <div >
            <p style="height:1.067rem;
font-size:0.768rem;
font-family:PingFangHK-Medium;
font-weight:500;
color:rgba(51,51,51,1);
line-height:1.067rem;padding-left:0.597rem;padding-top:0.384rem;margin-bottom:0.768rem;">基本情况</p>
         <ul>
             <li style="padding-top:0.725rem;" @click="answers(1)">什么是长期护理保险制度？</li>
             <li>哪些人可以申请享受长期护理保险待遇？</li>
             <li>长期护理保险的筹资水平及缴费标准是什么？</li>
             <li>长期护理保险的服务形式有哪些？</li>
             <li style="padding-bottom:0.725rem;">居家护理和机构护理具体有哪些服务内容？</li>
         </ul>
        </div>
        <div>
            <p style="height:1.067rem;
font-size:0.768rem;
font-family:PingFangHK-Medium;
font-weight:500;
color:rgba(51,51,51,1);
line-height:1.067rem;padding-left:0.597rem;padding-top:0.384rem;margin-bottom:0.768rem;">申请受理</p>
         <ul>
             <li style="padding-top:0.725rem;">到哪里申请长期护理保险待遇？</li>
             <li style="padding-bottom:0.725rem;">原享受高龄老人医疗护理计划人员，如何享受...</li>
         </ul>
        </div>
        <el-dialog title="什么是长期护理保险制度？" :visible.sync="dialogTableVisible" width='100%' top='8vh' id="dialog1">
           <p>
               长期护理险主要是为被保险人在丧失日常生活能力、年老患病或身故时，侧重于提供护理保障和经济补偿的保险产品。
           </p>
           <p>
               定义：长期护理保险是为因年老、疾病或伤残而需要长期照顾的被保险人提供护理服务费用补偿的长期护理健康保险。
           </p>
           <p>
               长期护理保险的保险范围分为医护人员看护、中级看护、照顾式看护和家中看护四个等级，但早期的长期护理保险产品不包括家中看护。
           </p>
           <!-- <p>
               长期护理险主要是为被保险人在丧失日常生活能力、年老患病或身故时，侧重于提供护理保障和经济补偿的保险产品。
           </p>
           <p>
               定义：长期护理保险是为因年老、疾病或伤残而需要长期照顾的被保险人提供护理服务费用补偿的长期护理健康保险。
           </p>
           <p>
               长期护理保险的保险范围分为医护人员看护、中级看护、照顾式看护和家中看护四个等级，但早期的长期护理保险产品不包括家中看护。
           </p>
           <p>
               长期护理险主要是为被保险人在丧失日常生活能力、年老患病或身故时，侧重于提供护理保障和经济补偿的保险产品。
           </p>
           <p>
               定义：长期护理保险是为因年老、疾病或伤残而需要长期照顾的被保险人提供护理服务费用补偿的长期护理健康保险。
           </p>
           <p>
               长期护理保险的保险范围分为医护人员看护、中级看护、照顾式看护和家中看护四个等级，但早期的长期护理保险产品不包括家中看护。
           </p> -->
        </el-dialog>
    </div>
</template>

<script>
import rem from '../../assets/js/rem.js'
export default {
    name:"applyfor",
    data(){
        return{
            dialogTableVisible:false
        }
    },
    mounted() {
        this.getRem(22)
        this.getRem(24)
        // this.getRem(17)

    },
    methods:{
        answers(type){
            if(type==1){
                this.dialogTableVisible=true;
                $('#dialog1').find(".el-dialog__title").html("什么是长期护理保险制度？");
            }
        },
        getRem(x){
            console.log('像素',(x*16)/375)
        }
    },
}
</script>

<style scoped>
/* @import "../../assets/css/apply_for.css"; */
*{
    margin: 0px;
    padding: 0px;
}

ul{
    padding: 0 0.597rem;
    background: #FFFFFF;
    /* padding-bottom:0.725rem; */
}
li{
    padding-top:0.3625rem;
    padding-bottom:0.3625rem;
    list-style: none;
    border-bottom:1px solid #E6E6E6;
    /* height:0.939rem; */
    font-size:0.683rem;
    font-family:PingFangHK-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:0.939rem;
    display: block;
}

</style>
<style>
#consult .el-dialog{
    position: fixed;
    /* bottom:1%; */
    bottom: 0%;
    margin:0 auto;
    /* left:1%; */
    /* 防止答案过多 */
    top: 3rem;
    overflow-y: auto;
}
#consult .el-dialog__title,#consult .el-dialog__body{
    font-size: 0.683rem;
}
#consult .el-dialog__title{
    line-height: 1.024rem;
}
#consult .el-dialog__header{
    padding: 0;
    padding-top:0.725rem;
    padding-bottom:0.725rem;
    padding-left:0.768rem;
    border-bottom: 1px solid #E6E6E6;
}
#consult .el-dialog__body{
    padding-top: 0.470rem;
    padding-left:0.597rem;
    padding-right:0.597rem;
    /* margin-top:0.725rem;
    margin-bottom:0.725rem; */
}
#consult .el-dialog__body p{
    margin-bottom: 0.725rem;
    color:#666666;
    line-height:1.024rem;
}
#consult .el-icon-close:before{
    font-size: 0.939rem;
    /* color:#fff; */
    background: #2D9DF7;
    border-radius: 50%;
    color:#fff;
}
#consult .el-dialog__headerbtn{
    top:0.55rem;
    /* width:0.939rem;
    height: 0.939rem;
    background: #2D9DF7;
    border-radius: 50%; */
}
</style>








