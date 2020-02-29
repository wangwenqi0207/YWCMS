import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginName: null,
    menuList : [],
    userName : null,
    getRouter: [],
    // globalRouter: 'http://192.168.1.187:4280/insurance-intact-cms',
    globalRouter:'http://ecare.tpddns.cn:8081/sh-intact-cms',
    // globalRouter: 'http://192.168.1.110:4283/insurance-intact-cms',
    // globalRouter: 'http://192.168.1.131:4283/insurance-intact-cms/',
    // globalRouter: 'http://192.168.1.16:9003/insurance-intact-cms',
    // globalIMGRouter: 'http://192.168.1.187:4280',
    globalIMGRouter:'http://ecare.tpddns.cn:8081',
    // globalIMGRouter: 'http://192.168.1.16:9003',
    // globalIMGRouter: 'http://192.168.1.131:4283',
    // globalRouter      : 'http://192.168.1.16:9003/insurance-intact-cms',
    status            : 0,
    appleyUserId      : null,
    orderNo           : null,
    medicalInsuranceId: null,
    orderLevel        : null,
    insUserIdCard     : null,
    appleyUserName    : null,

        orderNoInfo    : "",
        selectStatus   : "",
        appleyUserName : "",
        contactName    : "",
        idcard         : "",
        assessNameLike : "",
        addressLike    : "",
        createdTimeBegin:"",
        createdTimeEnd:"",
        bankAccountArea: [
      { "province": "北京市", "prova": "11", "bankAccountArea": [{ "city": "北京市", "value": 1100 }] },
      { "province": "天津市", "prova": "12", "bankAccountArea": [{ "city": "天津市", "value": 1200 }] },
      {
        "province": "河北省", "prova": "13", "bankAccountArea": [{ "city": "石家庄市", "value": 1301 }, { "city": "唐山市", "value": 1302 }, { "city": "秦皇岛市", "value": 1303 }, { "city": "邯郸市", "value": 1304 },
        { "city": "邢台市", "value": 1305 }, { "city": "保定市", "value": 1306 }, { "city": "张家口市", "value": 1307 }, { "city": "承德市", "value": 1308 }, { "city": "沧州市", "value": 1309 },
        { "city": "廊坊市", "value": 1310 }, { "city": "衡水市", "value": 1311 }]
      },
      {
        "province": "山西省", "prova": "14", "bankAccountArea": [{ "city": "太原市", "value": 1401 }, { "city": "大同市", "value": 1402 }, { "city": "阳泉市", "value": 1403 }, { "city": "长治市", "value": 1404 },
        { "city": "晋城市", "value": 1405 }, { "city": "朔州市", "value": 1406 }, { "city": "晋中市", "value": 1407 }, { "city": "运城市", "value": 1408 }, { "city": "忻州市", "value": 1409 },
        { "city": "临汾市", "value": 1410 }, { "city": "吕梁市", "value": 1411 }]
      },
      {
        "province": "内蒙古自治区", "prova": "15", "bankAccountArea": [{ "city": "呼和浩特市", "value": 1501 }, { "city": "包头市", "value": 1502 }, { "city": "乌海市", "value": 1503 },
        { "city": "赤峰市", "value": 1504 }, { "city": "通辽市", "value": 1505 }, { "city": "鄂尔多斯市", "value": 1506 }, { "city": "呼伦贝尔市", "value": 1507 },
        { "city": "巴彦淖尔市", "value": 1508 }, { "city": "乌兰察布市", "value": 1509 }, { "city": "兴安盟", "value": 1522 }, { "city": "锡林郭勒盟", "value": 1525 },
        { "city": "阿拉善盟", "value": 1529 }, { "city": "呼伦贝尔市", "value": 1530 }, { "city": "满洲里市", "value": 1530 }]
      },
      {
        "province": "辽宁省", "prova": "21", "bankAccountArea": [{ "city": "沈阳市", "value": 2101 }, { "city": "大连市", "value": 2102 }, { "city": "鞍山市", "value": 2103 },
        { "city": "抚顺市", "value": 2104 }, { "city": "本溪市", "value": 2105 }, { "city": "丹东市", "value": 2106 }, { "city": "锦州市", "value": 2107 }, { "city": "营口市", "value": 2108 },
        { "city": "阜新市", "value": 2109 }, { "city": "辽阳市", "value": 2110 }, { "city": "盘锦市", "value": 2111 }, { "city": "铁岭市", "value": 2112 }, { "city": "朝阳市", "value": 2113 },
        { "city": "葫芦岛市", "value": 2114 }]
      },
      {
        "province": "长春省", "prova": "22", "bankAccountArea": [{ "city": "长春市", "value": 2201 }, { "city": "吉林市", "value": 2202 }, { "city": "四平市", "value": 2203 }, { "city": "辽源市", "value": 2204 },
        { "city": "通化市", "value": 2205 }, { "city": "白山市", "value": 2206 }, { "city": "松原市", "value": 2207 }, { "city": "白城市", "value": 2208 }, { "city": "延边朝鲜族自治州", "value": 2224 }]
      },
      {
        "province": "黑龙江省", "prova": "23", "bankAccountArea": [{ "city": "哈尔滨市", "value": 2301 }, { "city": "齐齐哈尔市", "value": 2302 }, { "city": "鸡西市", "value": 2303 }, { "city": "鹤岗市", "value": 2304 },
        { "city": "双鸭山市", "value": 2305 }, { "city": "大庆市", "value": 2306 }, { "city": "伊春市", "value": 2307 }, { "city": "佳木斯市", "value": 2308 }, { "city": "七台河市", "value": 2309 },
        { "city": "牡丹江市", "value": 2310 }, { "city": "黑河市", "value": 2311 }, { "city": "绥化市", "value": 2312 }, { "city": "大兴安岭地区", "value": 2327 }]
      },
      { "province": "上海市", "prova": "31", "bankAccountArea": [{ "city": "上海市", "value": 3100 }] },
      {
        "province": "江苏省", "prova": "32", "bankAccountArea": [{ "city": "南京市", "value": 3201 }, { "city": "无锡市", "value": 3202 }, { "city": "徐州市", "value": 3203 }, { "city": "常州市", "value": 3204 },
        { "city": "苏州市", "value": 3205 }, { "city": "南通市", "value": 3206 }, { "city": "连云港市", "value": 3207 }, { "city": "淮安市", "value": 3208 }, { "city": "盐城市", "value": 3209 },
        { "city": "扬州市", "value": 3210 }, { "city": "镇江市", "value": 3211 }, { "city": "泰州市", "value": 3212 }, { "city": "宿迁市", "value": 3213 }, { "city": "扬州市", "value": 3214 },
        { "city": "胥浦市", "value": 3214 }]
      },
      {
        "province": "浙江省", "prova": "33", "bankAccountArea": [{ "city": "杭州市", "value": 3301 }, { "city": "宁波市", "value": 3302 }, { "city": "温州市", "value": 3303 }, { "city": "嘉兴市", "value": 3304 },
        { "city": "湖州市", "value": 3305 }, { "city": "绍兴市", "value": 3306 }, { "city": "金华市", "value": 3307 }, { "city": "衢州市", "value": 3308 }, { "city": "舟山市", "value": 3309 },
        { "city": "台州市", "value": 3310 }, { "city": "丽水市", "value": 3311 }]
      },
      {
        "province": "安徽省", "prova": "34", "bankAccountArea": [{ "city": "合肥市", "value": 3401 }, { "city": "芜湖市", "value": 3402 }, { "city": "蚌埠市", "value": 3403 }, { "city": "淮南市", "value": 3404 },
        { "city": "马鞍山市", "value": 3405 }, { "city": "淮北市", "value": 3406 }, { "city": "铜陵市", "value": 3407 }, { "city": "安庆市", "value": 3408 }, { "city": "黄山市", "value": 3410 },
        { "city": "滁州市", "value": 3411 }, { "city": "阜阳市", "value": 3412 }, { "city": "宿州市", "value": 3413 }, { "city": "巢湖市", "value": 3414 }, { "city": "六安市", "value": 3415 },
        { "city": "亳州市", "value": 3416 }, { "city": "池州市", "value": 3417 }, { "city": "宣城市", "value": 3418 }]
      },
      {
        "province": "福建省", "prova": "35", "bankAccountArea": [{ "city": "福州市", "value": 3501 }, { "city": "厦门市", "value": 3502 }, { "city": "莆田市", "value": 3503 }, { "city": "三明市", "value": 3504 },
        { "city": "泉州市", "value": 3505 }, { "city": "漳州市", "value": 3506 }, { "city": "南平市", "value": 3507 }, { "city": "龙岩市", "value": 3508 }, { "city": "宁德市", "value": 3509 }]
      },
      {
        "province": "江西省", "prova": "36", "bankAccountArea": [{ "city": "南昌市", "value": 3601 }, { "city": "景德镇市", "value": 3602 }, { "city": "萍乡市", "value": 3603 }, { "city": "九江市", "value": 3604 },
        { "city": "新余市", "value": 3605 }, { "city": "鹰潭市", "value": 3606 }, { "city": "赣州市", "value": 3607 }, { "city": "吉安市", "value": 3608 }, { "city": "宜春市", "value": 3609 },
        { "city": "抚州市", "value": 3610 }, { "city": "上饶市", "value": 3611 }]
      },
      {
        "province": "山东省", "prova": "37", "bankAccountArea": [{ "city": "济南市", "value": 3701 }, { "city": "青岛市", "value": 3702 }, { "city": "淄博市", "value": 3703 }, { "city": "枣庄市", "value": 3704 },
        { "city": "东营市", "value": 3705 }, { "city": "烟台市", "value": 3706 }, { "city": "潍坊市", "value": 3707 }, { "city": "济宁市", "value": 3708 }, { "city": "泰安市", "value": 3709 },
        { "city": "威海市", "value": 3710 }, { "city": "日照市", "value": 3711 }, { "city": "莱芜市", "value": 3712 }, { "city": "临沂市", "value": 3713 }, { "city": "德州市", "value": 3714 },
        { "city": "聊城市", "value": 3715 }, { "city": "滨州市", "value": 3716 }, { "city": "菏泽市", "value": 3717 }]
      },
      {
        "province": "河南省", "prova": "41", "bankAccountArea": [{ "city": "郑州市", "value": 4101 }, { "city": "开封市", "value": 4102 }, { "city": "洛阳市", "value": 4103 }, { "city": "平顶山市", "value": 4104 },
        { "city": "安阳市", "value": 4105 }, { "city": "鹤壁市", "value": 4106 }, { "city": "新乡市", "value": 4107 }, { "city": "焦作市", "value": 4108 }, { "city": "濮阳市", "value": 4109 },
        { "city": "许昌市", "value": 4110 }, { "city": "漯河市", "value": 4111 }, { "city": "三门峡市", "value": 4112 }, { "city": "南阳市", "value": 4113 }, { "city": "商丘市", "value": 4114 },
        { "city": "信阳口市", "value": 4115 }, { "city": "周口市", "value": 4116 }, { "city": "驻马店市", "value": 4117 }]
      },
      {
        "province": "湖北省", "prova": "42", "bankAccountArea": [{ "city": "武汉市", "value": 4201 }, { "city": "黄石市", "value": 4202 }, { "city": "十堰市", "value": 4203 }, { "city": "宜昌市", "value": 4205 },
        { "city": "襄樊市", "value": 4206 }, { "city": "鄂州市", "value": 4207 }, { "city": "荆门市", "value": 4208 }, { "city": "孝感市", "value": 4209 }, { "city": "荆州市", "value": 4210 },
        { "city": "黄冈市", "value": 4211 }, { "city": "咸宁市", "value": 4212 }, { "city": "随州市", "value": 4213 }, { "city": "恩施土家族苗族自治州", "value": 4228 }, { "city": "三峡", "value": 4229 },
        { "city": "省直辖行政单位", "value": 4290 }]
      },
      {
        "province": "湖南省", "prova": "43", "bankAccountArea": [{ "city": "长沙市", "value": 4301 }, { "city": "株洲市", "value": 4302 }, { "city": "湘潭市", "value": 4303 }, { "city": "衡阳市", "value": 4304 },
        { "city": "邵阳市", "value": 4305 }, { "city": "岳阳市", "value": 4306 }, { "city": "常德市", "value": 4307 }, { "city": "张家界市", "value": 4308 }, { "city": "益阳市", "value": 4309 },
        { "city": "郴州市", "value": 4310 }, { "city": "永州市", "value": 4311 }, { "city": "怀化市", "value": 4312 }, { "city": "娄底市", "value": 4313 }, { "city": "湘西土家族苗族自治州", "value": 4331 }]
      },
      {
        "province": "广东省", "prova": "44", "bankAccountArea": [{ "city": "广州市", "value": 4401 }, { "city": "韶关市", "value": 4402 }, { "city": "深圳市", "value": 4403 }, { "city": "珠海市", "value": 4404 },
        { "city": "汕头市", "value": 4405 }, { "city": "佛山市", "value": 4406 }, { "city": "江门市", "value": 4407 }, { "city": "湛江市", "value": 4408 }, { "city": "茂名市", "value": 4409 },
        { "city": "肇庆市", "value": 4412 }, { "city": "惠州市", "value": 4413 }, { "city": "梅州市", "value": 4414 }, { "city": "汕尾市", "value": 4415 }, { "city": "河源市", "value": 4416 },
        { "city": "阳江市", "value": 4417 }, { "city": "清远市", "value": 4418 }, { "city": "东莞市", "value": 4419 }, { "city": "中山市", "value": 4420 }, { "city": "潮州市", "value": 4451 },
        { "city": "揭阳市", "value": 4452 }, { "city": "云浮市", "value": 4453 }]
      },
      {
        "province": "广西壮族自治区", "prova": "45", "bankAccountArea": [{ "city": "南宁市", "value": 4501 }, { "city": "柳州市", "value": 4502 }, { "city": "桂林市", "value": 4503 }, { "city": "梧州市", "value": 4504 },
        { "city": "北海市", "value": 4505 }, { "city": "防城港市", "value": 4506 }, { "city": "钦州市", "value": 4507 }, { "city": "贵港市", "value": 4508 }, { "city": "玉林市", "value": 4509 },
        { "city": "百色市", "value": 4510 }, { "city": "贺州", "value": 4511 }, { "city": "河池市", "value": 4512 }, { "city": "来宾市", "value": 4513 }, { "city": "崇左市", "value": 4514 }]
      },
      { "province": "海南省", "prova": "46", "bankAccountArea": [{ "city": "海口市", "value": 4601 }, { "city": "三亚市", "value": 4602 }, { "city": "直辖县级行政单位", "value": 4690 }] },
      { "province": "重庆市", "prova": "50", "bankAccountArea": [{ "city": "重庆市", "value": 5000 }] },
      {
        "province": "四川省", "prova": "51", "bankAccountArea": [{ "city": "成都市", "value": 5101 }, { "city": "自贡市", "value": 5103 }, { "city": "攀枝花市", "value": 5104 }, { "city": "泸州市", "value": 5105 },
        { "city": "德阳市", "value": 5106 }, { "city": "绵阳市", "value": 5107 }, { "city": "广元市", "value": 5108 }, { "city": "遂宁市", "value": 5109 }, { "city": "内江市", "value": 5110 },
        { "city": "乐山市", "value": 5111 }, { "city": "南充市", "value": 5113 }, { "city": "眉山市", "value": 5114 }, { "city": "宜宾市", "value": 5115 }, { "city": "广安市", "value": 5116 },
        { "city": "达州市", "value": 5117 }, { "city": "雅安市", "value": 5118 }, { "city": "巴中市", "value": 5119 }, { "city": "资阳市", "value": 5120 }, { "city": "阿坝藏族羌族自治州", "value": 5132 },
        { "city": "甘孜藏族自治州", "value": 5133 }, { "city": "凉山彝族自治州", "value": 5134 }]
      },
      {
        "province": "贵州省", "prova": "52", "bankAccountArea": [{ "city": "贵阳市", "value": 5201 }, { "city": "六盘水市", "value": 5202 }, { "city": "遵义市", "value": 5203 }, { "city": "安顺市", "value": 5204 },
        { "city": "铜仁地区", "value": 5222 }, { "city": "黔西南布依族苗族自治州", "value": 5223 }, { "city": "毕节地区", "value": 5224 }, { "city": "黔东南苗族侗族自治州", "value": 5226 },
        { "city": "黔南布依族苗族自治州", "value": 5227 }]
      },
      {
        "province": "云南省", "prova": "53", "bankAccountArea": [{ "city": "昆明市", "value": 5301 }, { "city": "曲靖市", "value": 5303 }, { "city": "玉溪市", "value": 5304 }, { "city": "保山市", "value": 5305 },
        { "city": "昭通市", "value": 5306 }, { "city": "丽江市", "value": 5307 }, { "city": "普洱市", "value": 5308 }, { "city": "临沧市", "value": 5309 }, { "city": "楚雄彝族自治州", "value": 5323 },
        { "city": "红河哈尼族彝族自治州", "value": 5325 }, { "city": "文山壮族苗族自治州", "value": 5326 }, { "city": "西双版纳傣族自治州", "value": 5328 }, { "city": "大理白族自治州", "value": 5329 },
        { "city": "德宏傣族景颇族自治州", "value": 5331 }, { "city": "怒江傈僳族自治州", "value": 5333 }, { "city": "迪庆藏族自治州", "value": 5334 }]
      },
      {
        "province": "西藏自治区", "prova": "54", "bankAccountArea": [{ "city": "拉萨市", "value": 5401 }, { "city": "昌都地区", "value": 5421 }, { "city": "山南地区", "value": 5422 }, { "city": "日喀则地区", "value": 5423 },
        { "city": "那曲地区", "value": 5424 }, { "city": "阿里地区", "value": 5425 }, { "city": "林芝地区", "value": 5426 }]
      },
      {
        "province": "陕西省", "prova": "61", "bankAccountArea": [{ "city": "西安市", "value": 6101 }, { "city": "铜川市", "value": 6102 }, { "city": "宝鸡市", "value": 6103 }, { "city": "咸阳市", "value": 6104 },
        { "city": "渭南市", "value": 6105 }, { "city": "延安市", "value": 6106 }, { "city": "汉中市", "value": 6107 }, { "city": "榆林市", "value": 6108 }, { "city": "安康市", "value": 6109 },
        { "city": "商洛市", "value": 6110 }]
      },
      {
        "province": "甘肃省", "prova": "62", "bankAccountArea": [{ "city": "兰州市", "value": 6201 }, { "city": "嘉峪关市", "value": 6202 }, { "city": "金昌市", "value": 6203 }, { "city": "白银市", "value": 6204 },
        { "city": "天水市", "value": 6205 }, { "city": "武威市", "value": 6206 }, { "city": "张掖市", "value": 6207 }, { "city": "平凉市", "value": 6208 }, { "city": "酒泉市", "value": 6209 },
        { "city": "庆阳市", "value": 6210 }, { "city": "定西市", "value": 6211 }, { "city": "陇南市", "value": 6212 }, { "city": "临夏回族自治州", "value": 6229 }, { "city": "甘南藏族自治州", "value": 6230 },
        { "city": "合作", "value": 6231 }, { "city": "矿区", "value": 6232 }, { "city": "东方", "value": 6233 }]
      },
      {
        "province": "青海省", "prova": "63", "bankAccountArea": [{ "city": "西宁市", "value": 6301 }, { "city": "海东地区", "value": 6321 }, { "city": "海北藏族自治州", "value": 6322 }, { "city": "黄南藏族自治州", "value": 6323 },
        { "city": "海南藏族自治州", "value": 6325 }, { "city": "果洛藏族自治州", "value": 6326 }, { "city": "玉树藏族自治州", "value": 6327 }, { "city": "海西蒙古族藏族自治州", "value": 6328 }]
      },
      {
        "province": "宁夏回族自治区", "prova": "64", "bankAccountArea": [{ "city": "银川市", "value": 6401 }, { "city": "石嘴山市", "value": 6402 }, { "city": "吴忠市", "value": 6403 }, { "city": "固原市", "value": 6404 },
        { "city": "中卫市", "value": 6405 }]
      },
      {
        "province": "新疆维吾尔自治区", "prova": "65", "bankAccountArea": [{ "city": "乌鲁木齐市", "value": 6501 }, { "city": "克拉玛依市", "value": 6502 }, { "city": "吐鲁番地区", "value": 6521 }, { "city": "哈密地区", "value": 6522 },
        { "city": "昌吉回族自治州", "value": 6523 }, { "city": "博尔塔拉蒙古自治州", "value": 6527 }, { "city": "巴音郭楞蒙古自治州", "value": 6528 }, { "city": "阿克苏地区", "value": 6529 },
        { "city": "克孜勒苏柯尔克孜自治州", "value": 6530 }, { "city": "喀什地区", "value": 6531 }, { "city": "和田地区", "value": 6532 }, { "city": "伊犁哈萨克自治州", "value": 6540 }, { "city": "塔城地区", "value": 6542 },
        { "city": "阿勒泰地区", "value": 6543 }, { "city": "石河子市", "value": 6544 }, { "city": "马兰市", "value": 6545 }, { "city": "新兵团", "value": 6546 }, { "city": "省直辖行政单位", "value": 6590 }]
      },
      { "province": "台湾省", "prova": "71", "bankAccountArea": [{ "city": "台湾省", "value": 7100 }] },
      { "province": "香港特别行政区", "prova": "81", "bankAccountArea": [{ "city": "香港特别行政区", "value": 8100 }] },
      { "province": "澳门特别行政区", "prova": "82", "bankAccountArea": [{ "city": "澳门特别行政区", "value": 8200 }] },

    ],
    access_question_type_id   : "123",
    access_question_table_name: '我是表名'
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
  },
  actions:{

  },
  plugins:[createPersistedState()]

})