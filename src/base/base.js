export default {
    data() {
        return {
            module   : 'corporation',
            data     : [],
            total    : 0,
            page     : 1,
            rows     : 5,
            modalForm: false,
            ids      : [],
            resData  : 123,
            page     : 1,
            row      : 10,
            //分页data
            currentPage   : 1,
            pageSize      : [10, 20, 30, 50],
            total         : 0,
            changePageSize: 10,
            // 一银行省市区
            bankProvinceL: [],
            bankCityL    : [],
            bankProvince : "",
            bankCity     : "",
        };
    },
    methods: {
        //工单管理里面的自动刷新问题
        getReloadData(that){
            // alert(that.module)
            if(that.module=='order_mng'||that.module=='assess_service_conf_mng' ||that.module=='assess_questionnaire_mng'){
                that.$axios({
                    url   : `${that.$store.state.globalRouter}/auth/assess/${that.module}/pagination?pageNo=1&pageSize=${that.changePageSize}`,
                    method: 'get'
                }).then(res => {
                    if(res.data.resultCode=='100005'){
                        that.$router.push({ path: "/" });
                    }else{
                        that.total       = res.data.totalCount;
                        that.currentPage = res.data.curPage;
                        that.resData     = res.data.resultList;
                  //   console.log(that.resData)
                    that.dataList(that.resData);//列出列表
                    }

                })
            }else if(that.module=='serv_obj_manage' || that.module=='nursing_street_mng'){
                that.$axios({
                    url   : `${that.$store.state.globalRouter}/auth/nursing/${that.module}/pagination?pageNo=1&pageSize=${that.changePageSize}`,
                    method: 'get'
                }).then(res => {
                    if(res.data.resultCode=='100005'){
                        that.$router.push({ path: "/" });
                    }else{
                        that.total       = res.data.totalCount;
                        that.currentPage = res.data.curPage;
                        that.resData     = res.data.resultList;
                      //   console.log(that.resData)
                        that.dataList(that.resData);//列出列表
                    }
                })
            }else if(that.module=='organization_apply_mng'){
                that.$axios({
                    url   : `${that.$store.state.globalRouter}/auth/organization/${that.module}/pagination?orgType=1&pageNo=1&pageSize=${that.changePageSize}`,
                    method: 'get'
                }).then(res => {
                    if(res.data.resultCode=='100005'){
                        that.$router.push({ path: "/" });
                    }else{
                        that.total       = res.data.totalCount;
                        that.currentPage = res.data.curPage;
                        that.resData     = res.data.resultList;
                  //   console.log(that.resData)
                    that.dataList(that.resData);//列出列表
                    }

                })
            }
            else{
                that.$axios({
                    url   : `${that.$store.state.globalRouter}/auth/${that.module}/pagination?pageNo=1&pageSize=${that.changePageSize}`,
                    method: 'get'
                }).then(res => {
                    if(res.data.resultCode=='100005'){
                        that.$router.push({ path: "/" });
                    }else{
                        that.total       = res.data.totalCount;
                        that.currentPage = res.data.curPage;
                        that.resData     = res.data.resultList;
                      //   console.log(that.resData)
                        that.dataList(that.resData);//列出列表
                    }
                })
            }
          },
        getData() {
            if(this.module=='order_mng'||this.module=='assess_service_conf_mng'){
                this.$axios({
                    url   : `${this.$store.state.globalRouter}/auth/assess/${this.module}/pagination?pageNo=${this.currentPage}&pageSize=${this.pageSize[0]}`,
                    method: 'get'
                }).then(res => {
                    if(res.data.resultCode=='100005'){
                        this.$router.push({ path: "/" });
                    }else{
                       this.total       = res.data.totalCount;
                       this.currentPage = res.data.curPage;
                       this.resData     = res.data.resultList;
                    this.dataList(this.resData);//列出列表
                    }
                })
            }else{
                this.$axios({
                    url   : `${this.$store.state.globalRouter}/auth/${this.module}/pagination?pageNo=${this.currentPage}&pageSize=${this.pageSize[0]}`,
                    method: 'get'
                }).then(res => {
                    if(res.data.resultCode=='100005'){
                        this.$router.push({ path: "/" });
                    }else{
                        this.total       = res.data.totalCount;
                        this.currentPage = res.data.curPage;
                        this.resData     = res.data.resultList;
                        this.dataList(this.resData);//列出列表
                    }

                })
            }

        },
        // 时间戳转换
        transform(old, insert, time) {
            old.forEach((el, index) => {
                el.time = insert[index];
            });
        },
        addData() {
            // alert('add');
            this.dialogVisible = true
            // alert('add');
            // this.dialogVisible = true
        },
        searchData() {
            alert('searchData');
        },
        updateData1() {
            alert('updateData')
        },
        updateData() {
            alert('updateData')
        },
        deleteData() {
            alert('deleteData')
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
        //分页methods
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`,this.pageSize);
            this.changePageSize = val;
            this.$options.methods.getReloadData(this);
          },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);

            if(this.module=='order_mng'){
                // console.log(this.$store.state)
                this.$axios({
                    url   : `${this.$store.state.globalRouter}/auth/assess/${this.module}/pagination?pageNo=${encodeURI(val)}&pageSize=${encodeURI(this.changePageSize)}&orderNo=${encodeURI(this.$store.state.orderNoInfo)}&orderStatus=${encodeURI(this.$store.state.selectStatus)}&appleyUserName=${encodeURI(this.$store.state.appleyUserName)}&appleyUserIdNo=${encodeURI(this.$store.state.idcard)}&contactName=${encodeURI(this.$store.state.contactName)}&assessNameLike=${encodeURI(this.$store.state.assessNameLike)}&addressLike=${encodeURI(this.$store.state.addressLike)}&createdTimeBegin=${encodeURI(this.$store.state.createdTimeBegin)}&createdTimeEnd=${encodeURI(this.$store.state.createdTimeEnd)}`,
                    method: 'get'
                }).then(res => {
                    console.log(res.data.resultList)
                    this.total       = res.data.totalCount;
                    this.currentPage = res.data.curPage;
                    this.dataList(res.data.resultList)
                })
            }else if(this.module=='assess_service_conf_mng'){
                this.$axios({
                    url   : `${this.$store.state.globalRouter}/auth/assess/${this.module}/pagination?pageNo=${encodeURI(val)}&pageSize=${encodeURI(this.changePageSize)}`,
                    method: 'get'
                }).then(res => {
                    console.log(res)
                    this.total       = res.data.totalCount;
                    this.currentPage = res.data.curPage;
                    this.dataList(res.data.resultList)
                })
            }else{
                this.$axios({
                    url   : `${this.$store.state.globalRouter}/auth/${this.module}/pagination?pageNo=${val}&pageSize=${this.changePageSize}`,
                    method: 'get'
                }).then(res => {
                    this.total       = res.data.totalCount;
                    this.currentPage = res.data.curPage;
                    this.dataList(res.data.resultList)
                })
            }

        },
        getBankAreaData(){
            let bankArea = this.$store.state.bankAccountArea;
            // console.log(bankArea);
            let newArray = [];
            bankArea.forEach((item,index)=>{
              newArray.push({
                regionId  : parseInt(item.prova),
                regionName: item.province
              });
            });
            this.bankProvinceL = newArray;
        },
        getBankAreaChinese(val){
            if(val){
            let _this = this;
                //   console.log(val);
                  let data          = this.$store.state.bankAccountArea;
                  let province      = "";
                  let city          = "";
                  let provinceValue = "";
                  let cityValue     = "";
                  data.forEach((item,index)=>{
                    item.bankAccountArea.forEach((item2,index2)=>{
                      if(item2.value==val){
                        city          = item2.city;
                        province      = item.province;
                        cityValue     = item2.value;
                        provinceValue = parseInt(item.prova);
                      }
                    });
                  });
                  this.bankProvince = provinceValue;
                  setTimeout(()=>{
                    _this.bankCity = cityValue;
                  },100);
                //   console.log(province,city);
                  let bankAreaCodeChinese = province+city;
                  return bankAreaCodeChinese;
            }else{
              this.bankProvince = "";
              this.bankCity     = "";
            }
          }

    }
};
