<template>

  <!-- <div class='main-container' style="background:#091826;width:96%;height:100%;"> -->
  <div
    style="background:#091721;width:100%;"
    class="example"
  >
    <div
      :style="{backgroundImage: 'url(' + bg2 + ')' }"
      style="width:1920px;height: 1080px;transform-origin: left top;"
      class="pageWrap"
    >
      <div style="height:134px;overflow:hidden;">
        <div
          style="width:540px;
height:50px;
font-size:52px;
font-weight:normal;
color:rgba(255,255,255,1);
text-shadow:0px 40px 20px rgba(0,85,180,0.2);margin-top:41px;margin-left:66px;float:left;"
          :style="{backgroundImage: 'url(' + bg3 + ')' }"
        >

        </div>
        <div style="float:right;">
          <svg
            t="1508738709248"
            class="screenfull-svg"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2069"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="26"
            height="26"
            fill='#fff'
            @click="toggle"
            style="float:right;margin-top:63px;margin-right:39px;color:#fff;"
            id="qp"
          >
            <path
              d="M333.493443 428.647617 428.322206 333.832158 262.572184 168.045297 366.707916 64.444754 64.09683 64.444754 63.853283 366.570793 167.283957 262.460644Z"
              p-id="2070"
              fill='#fff'
            />
            <path
              d="M854.845439 760.133334 688.61037 593.95864 593.805144 688.764889 759.554142 854.56096 655.44604 958.161503 958.055079 958.161503 958.274066 656.035464Z"
              p-id="2071"
              fill='#fff'
            />
            <path
              d="M688.535669 428.550403 854.31025 262.801405 957.935352 366.921787 957.935352 64.34754 655.809313 64.081481 759.919463 167.535691 593.70793 333.731874Z"
              p-id="2072"
              fill='#fff'
            />
            <path
              d="M333.590658 594.033341 167.8171 759.804852 64.218604 655.67219 64.218604 958.270996 366.342596 958.502263 262.234493 855.071589 428.421466 688.86108Z"
              p-id="2073"
              fill='#fff'
            />
          </svg>
          <p style="width:178px;
height:23px;
font-size:22px;
font-weight:300;
color:rgba(179,179,179,1);margin-top:60px;margin-right:35px;float:right;">{{time}}</p>
          <p
            style="width:305px;
height:36px;
font-size:32px;
font-weight:500;
color:rgba(46,161,255,1);margin-right:35px;float:right;margin-top:58px;display:inline-block;"
            :style="{backgroundImage: 'url(' + bg6 + ')' }"
          ></p>
        </div>
      </div>
      <div style="margin:0px 26px 26px;width:1870px;
height:920px;
border:3px solid rgba(0,195,255,0.2);
box-sizing:border-box;">

        <div style="margin:29px 30px 0px 31px;width:494px;float:left;height:100%;box-sizing:border-box;">
          <div style="width:494px;
height:280px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;">
            <div style="height:40px;margin:0px 20px;margin-bottom:30px;">
              <div style="width:222px;
height:18px;margin-top:21px;float:left;">
                <img
                  style="width:100%;"
                  src="../../assets/img/echarts/sl.png"
                />
              </div>
              <div style="width:222px;
height:21px;margin-top:19px;float:right;font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);text-align:right;">
                参保人年龄分布
              </div>

            </div>
            <div
              id="main1"
              style="height:220px;"
              ref="Echart1"
            ></div>
            <!-- <div
              id    = "main1"

            ></div> -->
          </div>
          <div style="width:494px;
height:280px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;">
            <div style="height:40px;margin:0px 20px;margin-bottom:20px;">
              <div style="width:222px;
height:18px;margin-top:21px;float:left;">
                <img
                  style="width:100%;"
                  src="../../assets/img/echarts/sl.png"
                />
              </div>
              <div style="width:222px;
height:21px;margin-top:19px;float:right;font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);text-align:right;">
                男女占比/残疾占比
              </div>

            </div>
            <div style="width:494px;height:220px;margin-top:15px;">
              <div style="height:220px;width:50%;float:left;position:relative;">
                <div
                  id="main2"
                  style="width:100%;height:100%;"
                  ref="Echart2"
                >
                </div>

                <div style="position:absolute;top:23.5%;left:30.3%;width:41%;border-radius:100%;margin:0 auto;">
                  <div style="width:49.3%;float:left;padding:8% 0;">

                    <img
                      style="width:60%;"
                      src="../../assets/img/echarts/man.png"
                    /><br />
                    <!-- <div style="display:inline-block;width:80%;margin:0 auto;">
        <p style="width:100%;">72%</p>
    </div> -->
                    <span style="width:42px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(31,134,253,1);">{{manData}}</span>
                  </div>
                  <div style="width:1.4%;float:left;
background:rgba(204,204,204,0.3);height:96px;margin-top:7%;"></div>
                  <div style="width:49.3%;float:left;padding:8% 0;">

                    <img
                      style="width:70%;"
                      src="../../assets/img/echarts/woman.png"
                    /><br />
                    <!-- <div style="display:inline-block;width:80%;margin:0 auto;">
        <p style="width:100%;">72%</p>
    </div> -->
                    <span style="width:41px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(164,91,255,1);">{{womanData}}</span>
                  </div>
                </div>
              </div>

              <div style="height:100%;width:50%;float:left;position:relative;">
                <div
                  id="main3"
                  style="width:100%;height:100%;"
                  ref="Echart3"
                >
                </div>

                <div style="position:absolute;top:23%;left:30.3%;width:41%;border-radius:100%;margin:0 auto;height:55%;
background:rgba(19,42,64,1);box-sizing:border-box;box-sizing:border-box;">
                  <div style="width:49.5%;float:left;padding:14% 0;">

                    <div style="display:inline-block;width:80%;margin:0 auto;width:21px;
height:45px;
font-size:22px;
font-weight:500;
color:rgba(4,196,255,1);
line-height:24px;margin-bottom:10px;">
                      残疾
                    </div>
                    <br />
                    <span style="width:29px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(4,196,255,1);">{{cjzb}}</span>
                  </div>
                  <div style="width:1%;float:left;
background:rgba(204,204,204,0.3);height:96px;margin-top:7%;"></div>
                  <div style="width:49.5%;float:left;padding:14% 0;">

                    <div style="display:inline-block;width:80%;margin:0 auto;width:21px;
height:45px;
font-size:22px;
font-weight:500;
color:rgba(111,223,28,1);
line-height:24px;margin-bottom:10px;">
                      非残
                    </div>

                    <span style="width:41px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(111,223,28,1);">{{fczb}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div
              id    = "main3"
              style = "height:100%;width:50%;float:left;"
              ref   = "Echart3"
            ></div> -->
          </div>
          <div style="width:494px;
height:280px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;">
            <div style="height:40px;margin:0px 20px;margin-bottom:20px;">
              <div style="width:222px;
height:18px;margin-top:21px;float:left;">
                <img
                  style="width:100%;"
                  src="../../assets/img/echarts/sl.png"
                />
              </div>
              <div style="width:222px;
height:21px;margin-top:19px;float:right;font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);text-align:right;">
                参保类型/低保占比
              </div>

            </div>
            <div style="width:494px;height:220px;margin-top:15px;">
              <div style="height:220px;width:50%;float:left;position:relative;">
                <div
                  id="main4"
                  style="width:100%;height:100%;"
                  ref="Echart4"
                >
                </div>

                <div style="position:absolute;top:23%;left:30.3%;width:41%;border-radius:100%;margin:0 auto;height:55%;
background:rgba(19,42,64,1);box-sizing:border-box;box-sizing:border-box;">
                  <div style="width:49.5%;float:left;padding:14% 0;">

                    <div style="display:inline-block;width:80%;margin:0 auto;width:21px;
height:45px;
font-size:22px;
font-weight:500;
color:rgba(31,134,253,1);
line-height:24px;margin-bottom:10px;">
                      城乡
                    </div>
                    <br />
                    <span style="width:41px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(31,134,253,1);">{{cbzb}}</span>
                  </div>
                  <div style="width:1%;float:left;
background:rgba(204,204,204,0.3);height:96px;margin-top:7%;"></div>
                  <div style="width:49.5%;float:left;padding:14% 0;">

                    <div style="display:inline-block;width:80%;margin:0 auto;width:22px;
height:43px;
font-size:22px;
font-weight:500;
color:rgba(149,64,255,1);
line-height:24px;margin-bottom:10px;">
                      职工
                    </div>

                    <span style="width:38px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(164,91,255,1);">{{jbzb}}</span>
                  </div>
                </div>
              </div>

              <div style="height:100%;width:50%;float:left;position:relative;">
                <div
                  id="main5"
                  style="width:100%;height:100%;"
                  ref="Echart5"
                >
                </div>

                <div style="position:absolute;top:23%;left:30.3%;width:41%;border-radius:100%;margin:0 auto;height:55%;
background:rgba(19,42,64,1);box-sizing:border-box;box-sizing:border-box;">
                  <div style="width:49.5%;float:left;padding:14% 0;">

                    <div style="display:inline-block;width:80%;margin:0 auto;width:21px;
height:45px;
font-size:22px;
font-weight:500;
color:rgba(4,196,255,1);
line-height:24px;margin-bottom:10px;">
                      低保
                    </div>
                    <br />
                    <span style="width:29px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(4,196,255,1);">{{dbzb}}</span>
                  </div>
                  <div style="width:1%;float:left;
background:rgba(204,204,204,0.3);height:96px;margin-top:7%;"></div>
                  <div style="width:49.5%;float:left;padding:14% 0;">

                    <div style="display:inline-block;width:80%;margin:0 auto;width:21px;
height:45px;
font-size:22px;
font-weight:500;
color:rgba(111,223,28,1);
line-height:24px;margin-bottom:10px;">
                      非低
                    </div>

                    <span style="width:41px;
height:16px;
font-size:18px;
font-family:FZLT;
font-weight:600;
color:rgba(111,223,28,1);">{{fdzb}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div
              id    = "main3"
              style = "height:100%;width:50%;float:left;"
              ref   = "Echart3"
            ></div> -->
          </div>

        </div>
        <div style="margin-top:29px;margin-right:36px;float:left;box-sizing:border-box;">
          <div style="width:360px;
height:152px;
background:rgba(19,42,64,1);
border-radius:20px;float:left;margin-right:30px;">
            <!-- <p style="text-align:left;padding:0px 10px;color:#57C4FD;heigth:40px;line-height:40px;font-size:30px;margin:0px;">享受待遇人数</p>
            <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:60px;line-height:60px;font-size:60px;margin:0px;blod:600;">{{number1}}</p> -->
            <div style="margin-left:34px;margin-top:20px;
height:25px;
font-size:26px;
font-weight:400;
color:rgba(87,196,253,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;">享受待遇人数</div>
            <div style="margin-left:34px;margin-top:16px;
height:51px;
font-size:54px;
font-family:FZLT;
font-weight:800;
color:rgba(111,223,28,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;">{{number2}}</div>
          </div>
          <div style="width:360px;
height:152px;
background:rgba(19,42,64,1);
border-radius:20px;float:right;">
            <!-- <p style="text-align:left;padding:0px 10px;color:#57C4FD;heigth:40px;line-height:40px;font-size:30px;margin:0px;">护理总费用</p>
            <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:60px;line-height:60px;font-size:60px;margin:0px;blod:600;">{{hlzfy}}</p> -->
            <div style="margin-left:34px;margin-top:20px;
height:25px;
font-size:26px;
font-weight:400;
color:rgba(87,196,253,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;">护理总费用<span
                id="fydw"
                style="color:rgba(87,196,253,1);"
              >(元)</span></div>
            <div style="margin-left:34px;margin-top:16px;
width:272px;
height:46px;
font-size:49px;
font-family:FZLT;
font-weight:800;
color:rgba(0,195,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;">{{hlzfy1}}</div>
            <!-- <p style="text-align:left;padding:0px 10px;color:#57C4FD;heigth:35%;font-size:3vh;margin:0;display:black;margin-top:2%;">护理总费用</p> -->
            <!-- <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:65%;font-size:5vh;margin:0px;blod:600;display:black;">{{hlzfy}}</p> -->
          </div>
          <div style="clear:both;"></div>
          <div
            style="height:710px;width:570px;margin-top:32px;margin-left:120px;position:relative;"
            :style="{backgroundImage: 'url(' + bg4 + ')' }"
          >
            <!-- 义亭镇相关 -->
            <div style="position:absolute;left:143px;top:413px;">
              <div
                id='icon1'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="yt"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='yt1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  170
                </div>

              </div>
            </div>
            <div
              id="yt2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">义亭镇</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">170</p>
            </div>
            <!-- 上溪镇 -->
            <div style="position:absolute;left:72px;top:280px;">
              <div
                id='icon2'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="sx"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='sx1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  175
                </div>

              </div>
            </div>
            <div
              id="sx2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">上溪镇</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">175</p>
            </div>
            <!-- 城西镇 -->
            <div style="position:absolute;left:161px;top:252px;">
              <div
                id='icon3'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="cx"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='cx1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  120
                </div>

              </div>
            </div>
            <div
              id="cx2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">城西街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">120</p>
            </div>
            <!-- 稠江街道 -->
            <div style="position:absolute;left:213px;top:325px;">
              <div
                id='cjIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="cj"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='cj1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  113
                </div>

              </div>
            </div>
            <div
              id="cj2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">稠江街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">113</p>
            </div>
            <!-- 稠城街道 -->
            <div style="position:absolute;left:305px;top:230px;">
              <div
                id='ccIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="cc"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='cc1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  71
                </div>

              </div>
            </div>
            <div
              id="cc2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">稠城街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">71</p>
            </div>
            <!-- 后宅街道 -->
            <div style="position:absolute;left:260px;top:170px;">
              <div
                id='hzIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="hz"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='hz1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  135
                </div>

              </div>
            </div>
            <div
              id="hz2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">后宅街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">135</p>
            </div>
            <!-- 北苑街道 -->
            <div style="position:absolute;left:243px;top:250px;">
              <div
                id='byIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="by"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='by1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  140
                </div>

              </div>
            </div>
            <div
              id="by2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">北苑街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">140</p>
            </div>
            <!-- 福田街道 -->
            <div style="position:absolute;left:356px;top:197px;">
              <div
                id='ftIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="ft"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='ft1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  88
                </div>

              </div>
            </div>
            <div
              id="ft2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">福田街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">88</p>
            </div>
            <!-- 大陈镇 -->
            <div style="position:absolute;left:356px;top:73px;">
              <div
                id='dcIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              >
              </div>
              <div
                id="dc"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='dc1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  80
                </div>

              </div>
            </div>
            <div
              id="dc2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">大陈镇</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">80</p>
            </div>
            <!-- 苏溪镇 -->
            <div style="position:absolute;left:411px;top:130px;">
              <div
                id='sxzIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              ></div>
              <div
                id="sxz"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='sxz1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  165
                </div>

              </div>
            </div>
            <div
              id="sxz2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">苏溪镇</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">165</p>
            </div>
            <!-- 廿三里街道相关 -->
            <div style="position:absolute;left:423px;top:216px;">
              <div
                id='eslIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              ></div>
              <div
                id="esl"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='esl1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  103
                </div>

              </div>
            </div>
            <div
              id="esl2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">廿三里</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">103</p>
            </div>
            <!-- 江东街道 -->
            <div style="position:absolute;left:333px;top:318px;">
              <div
                id='jdIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              ></div>
              <div
                id="jd"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='jd1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  197
                </div>

              </div>
            </div>
            <div
              id="jd2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">江东街道</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">197</p>
            </div>
            <!-- 佛堂镇 -->
            <div style="position:absolute;left:229px;top:420px;">
              <div
                id='ftzIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              ></div>
              <div
                id="ftz"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='ftz1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  195
                </div>

              </div>
            </div>
            <div
              id="ftz2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">佛堂镇</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">195</p>
            </div>
            <!-- 赤岸镇 -->
            <div style="position:absolute;left:226px;top:530px;">
              <div
                id='caIcon'
                style="width:14px;
height:14px;
background:rgba(0,195,255,1);
border-radius:50%;position:absolute;"
              ></div>
              <div
                id="ca"
                style="position:absolute;background-size:cover;"
                :style="{backgroundImage: 'url(' + bg5 + ')' }"
              >
                <div
                  id='ca1'
                  style="position:absolute;padding:6px 8px;
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);vertical-align:middle;"
                >
                  2
                </div>

              </div>
            </div>
            <div
              id="ca2"
              style="position:absolute;background:rgba(33,93,79,1);right:10px;bottom:200px;width:100px;height:80px;text-align:left;padding:10px;box-sizing:border-box;"
              hidden
            >
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);">赤岸镇</p>
              <p style="
font-size:19px;
font-family:FZLT;
font-weight:600;
color:rgba(249,250,251,1);height:20px;">203</p>
            </div>

          </div>
        </div>
        <div style="width:494px;float:left;margin-right:25px;margin-top:29px;">
          <div style="width:494px;
height:135px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;padding:27px 0 28px;box-sizing:border-box;">
            <div style="width:49%;float:left;text-align:left;padding-left:46px;box-sizing:border-box;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:400;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:18px;">申请评估人数</div>
              <div style="
height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(0,195,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{sqpgrs1}}</div>

            </div>
            <div style="width:2px;height:80px;
background:rgba(204,204,204,0.3);float:left;"></div>

            <div style="width:49%;float:right;text-align:left;padding-left:46px;box-sizing:border-box;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:400;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:18px;">已评估人数</div>
              <div style="
height:25px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(111,223,28,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{ypgrs1}}</div>
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:30%;font-size:2vh;margin:0;display:black;margin-top:2%;">申请评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:60%;font-size:4vh;margin:0px;blod:600;display:black;">{{sqpgrs}}</p> -->
            </div>

            <div style="clear:both;"></div>
          </div>
          <div style="height:280px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;">
            <div style="height:40px;margin:0px 20px;margin-bottom:13px;">
              <div style="width:222px;
height:18px;margin-top:21px;float:left;">
                <img
                  style="width:100%;"
                  src="../../assets/img/echarts/sl.png"
                />
              </div>
              <div style="width:222px;
height:21px;margin-top:19px;float:right;font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);text-align:right;">
                评估等级分布
              </div>

            </div>
            <div
              id="main6"
              style="height:220px;"
              ref="Echart7"
            ></div>
          </div>
          <div style="width:494px;
height:135px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;padding:27px 0 28px;box-sizing:border-box;">
            <div style="width:49%;float:left;text-align:left;padding-left:46px;box-sizing:border-box;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:400;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:18px;">评估师A</div>
              <div style="
height:24px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(31,134,253,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{pgsA}}</div>

            </div>
            <div style="width:2px;height:80px;
background:rgba(204,204,204,0.3);float:left;"></div>

            <div style="width:49%;float:right;text-align:left;padding-left:46px;box-sizing:border-box;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:400;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:18px;">评估师B</div>
              <div style="
height:24px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(164,91,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{pgsB}}</div>
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:30%;font-size:2vh;margin:0;display:black;margin-top:2%;">申请评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:60%;font-size:4vh;margin:0px;blod:600;display:black;">{{sqpgrs}}</p> -->
            </div>

            <div style="clear:both;"></div>
          </div>
          <div style="height:280px;
background:rgba(19,42,64,1);
border-radius:20px;">
            <div style="height:40px;margin:0px 20px;margin-bottom:30px;">
              <div style="width:222px;
height:18px;margin-top:21px;float:left;">
                <img
                  style="width:100%;"
                  src="../../assets/img/echarts/sl.png"
                />
              </div>
              <div style="width:222px;
height:21px;margin-top:19px;float:right;font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);text-align:right;">
                工单月趋势变化
              </div>

            </div>
            <div
              id="main7"
              style="height:220px;"
              ref="Echart8"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bg2 from "@/assets/img/echarts/background.png";
import Bg3 from "@/assets/img/echarts/pinggu.png";
import Bg4 from "@/assets/img/echarts/map.png";
import Bg5 from "@/assets/img/echarts/icon.png";
import Bg6 from "@/assets/img/echarts/font.png";
import echarts from "echarts"; //引入echarts
import fullscreen from "vue-fullscreen";
import Vue from "vue";
import "../../../node_modules/echarts/map/js/province/zhejiang";
import zhejiangJson from "../../../node_modules/echarts/map/json/province/zhejiang";
import jihuaJson from "../../assets/金华市.json";
Vue.use(fullscreen);
export default {
  data() {
    return {
      bg2: Bg2,
      bg3: Bg3,
      bg4: Bg4,
      bg5: Bg5,
      bg6: Bg6,
      fullscreen: false,
      time: "2019年02月26日",
      timer: null,
      timer2: null,

      // 享受待遇人数
      number1: 2789,
      number2: 2789,
      hlzfy: 3854990,
      hlzfy1: 3854990,
      ypgrs: 1660,
      ypgrs1: 1660,
      sqpgrs: 1666,
      sqpgrs1: 1666,
      pgsA: 6,
      pgsB: 16,
      // 评估等级数据
      pgdjData: [
        { value: 10, name: "0级" },
        { value: 5, name: "1级" },
        { value: 15, name: "2级" },
        { value: 25, name: "3级" },
        { value: 20, name: "4级" },
        { value: 35, name: "5级" },
        { value: 30, name: "6级" }
      ],
      nlfb1: ["90岁以上", "80-90", "70-80", "60-70", "60以下"],
      nlfb2: [10, 20, 10, 30, 30],
      gdybh1: ["8月", "9月", "10月", "11月", "12月", "1月", "2月"],
      gdybh2: [
        { value: 120, symbol: "circle" },
        { value: 120, symbol: "circle" },
        { value: 132, symbol: "circle" },
        { value: 101, symbol: "circle" },
        { value: 134, symbol: "circle" },
        { value: 90, symbol: "circle" },
        { value: 230, symbol: "circle" },
        { value: 210, symbol: "circle" }
      ],
      nnData: [{ value: 48.5, name: "女" }, { value: 51.5, name: "男" }],
      womanData: "48%",
      manData: "52%",
      cjData: [{ value: 8, name: "残疾" }, { value: 92, name: "非残" }],
      cjzb: "8%",
      fczb: "92%",
      dbData: [{ value: 8, name: "低保" }, { value: 92, name: "非低" }],
      dbzb: "8%",
      fdzb: "92%",
      cxData: [{ value: 79, name: "城乡" }, { value: 21, name: "职工" }],
      cbzb: "79%",
      jbzb: "21%"
    };
  },
  destroyed() {
    // console.log('定时器',this.timer2)
    clearInterval(this.timer);
    clearInterval(this.timer2);
    this.timer = null;
    this.timer2 = null;
    window.removeEventListener("resize", this.$refs.Echart1);
    window.removeEventListener("resize", this.$refs.Echart2);
    window.removeEventListener("resize", this.$refs.Echart3);
    window.removeEventListener("resize", this.$refs.Echart4);
    window.removeEventListener("resize", this.$refs.Echart5);
    // window.removeEventListener("resize", this.$refs.Echart6);
    window.removeEventListener("resize", this.$refs.Echart7);
    window.removeEventListener("resize", this.$refs.Echart8);
  },
  mounted() {
    // 获取地图里面的宽高

    // this.getMapData();
       if (this.timer2) {
        clearInterval(this.timer2);
    } else {

    this.timer2=setInterval(()=>{
      this.initChart();
       // 享受待遇人数
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/queryTreatmentCount`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          // this.number1 = res.data.data;
          this.number2 = this.parseFormatNum(res.data.data, 0);
        } else {
          // this.number1 = "1666";
        }
      });
      // 护理总费用
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/queryNursingCost`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.hlzfy = res.data.data;
          this.hlzfy1 = this.parseFormatNum1(res.data.data, 0);
        } else {
          this.hlzfy = "3854990";
          // this.hlzfy1 = "3854990";
        }
      });


    },300000)
    }



    this.time = this.$moment().format("YYYY年MM月DD日");
    this.getTime();
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();
    this.initChart5();
    this.initChart6();
    this.initChart7();
    this.initChart();

    // 享受待遇人数
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/dataVisualizationAssess/queryTreatmentCount`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "000000") {
        // this.number1 = res.data.data;
        this.number2 = this.parseFormatNum(res.data.data, 0);
      } else {
        // this.number1 = "1666";
      }
    });
    // 护理总费用
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/dataVisualizationAssess/queryNursingCost`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "000000") {
        this.hlzfy = res.data.data;
        this.hlzfy1 = this.parseFormatNum1(res.data.data, 0);
      } else {
        this.hlzfy = "3854990";
        // this.hlzfy1 = "3854990";
      }
    });

    // 已评估人数
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/dataVisualizationAssess/queryAlreadyAssessUserCount`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "000000") {
        this.ypgrs = res.data.data;
        this.ypgrs1 = this.parseFormatNum(this.ypgrs, 0);
      } else {
        // this.number1 = '1666'
      }
    });
    // 申请评估人数
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/dataVisualizationAssess/queryAssessUserCount`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "000000") {
        this.sqpgrs = res.data.data;
        this.sqpgrs1 = this.parseFormatNum(this.sqpgrs, 0);
      } else {
        // this.number1 = '1666'
      }
    });
    // 评估师A和B
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/dataVisualizationAssess/queryAppraiserQuantity?user_class=1`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "000000") {
        this.pgsA = res.data.data;
      } else {
        // this.number1 = '1666'
      }
    });
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/dataVisualizationAssess/queryAppraiserQuantity?user_class=2`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "000000") {
        this.pgsB = res.data.data;
      } else {
        // this.number1 = '1666'
      }
    });

    // echarts图表自适应
    this.selfAdaption();
    this.$refs.Echart1.setAttribute("style", "height:220px;");
    this.$refs.Echart2.setAttribute(
      "style",
      "float:left;width:100%;height:100%;"
    );
    this.$refs.Echart3.setAttribute(
      "style",
      "float:left;width:100%;height:100%;"
    );
    this.$refs.Echart4.setAttribute(
      "style",
      "float:left;width:100%;height:100%;"
    );
    this.$refs.Echart5.setAttribute(
      "style",
      "float:left;width:100%;height:100%;"
    );
    this.$refs.Echart7.setAttribute("style", "height:220px;");
    this.$refs.Echart8.setAttribute("style", "height:220px");
    this.scale();
    var that = this;
    window.addEventListener("resize", function() {
      that.scale();
    });
  },
  methods: {
    getMapData() {
      // 义亭镇相关
      this.mapData("yt1", "yt2", "yt", "icon1", $("#yt1").html());
      // 上溪镇相关
      this.mapData("sx1", "sx2", "sx", "icon2", $("#sx1").html());
      // 城西镇相关
      this.mapData("cx1", "cx2", "cx", "icon3", $("#cx1").html());
      // 稠江街道相关
      this.mapData("cj1", "cj2", "cj", "cjIcon", $("#cj1").html());
      // 稠城街道相关
      this.mapData("cc1", "cc2", "cc", "ccIcon", $("#cc1").html());
      // 后宅街道相关
      this.mapData("hz1", "hz2", "hz", "hzIcon", $("#hz1").html());
      // //北苑街道相关
      this.mapData("by1", "by2", "by", "byIcon", $("#by1").html());
      // 福田街道相关
      this.mapData("ft1", "ft2", "ft", "ftIcon", $("#ft1").html());
      // 大陈镇相关
      this.mapData("dc1", "dc2", "dc", "dcIcon", $("#dc1").html());
      // 苏溪镇相关
      this.mapData("sxz1", "sxz2", "sxz", "sxzIcon", $("#sxz1").html());
      // 廿三里街道相关
      this.mapData("esl1", "esl2", "esl", "eslIcon", $("#esl1").html());
      // 江东街道相关
      this.mapData("jd1", "jd2", "jd", "jdIcon", $("#jd1").html());
      // 佛堂镇相关
      this.mapData("ftz1", "ftz2", "ftz", "ftzIcon", $("#ftz1").html());
      // 赤岸镇相关
      this.mapData("ca1", "ca2", "ca", "caIcon", $("#ca1").html());
    },
    mapData(ca1, ca2, ca, caIcon, data) {
      if (data && Number(data).toString().length <= 2) {
        // alert('11')
        var cssCa = {
          width: "60",
          height: "48",
          position: "relative",
          padding: "0px 4px"
        };
        $("#" + ca).css(cssCa);
        $("#" + caIcon).css({
          position: "absolute",
          left: ($("#" + ca).outerWidth() - 14) / 2 + "px",
          top: $("#" + ca).outerHeight() + "px"
        });
        $("#" + ca1).css({
          position: "absolute",
          padding: "6px 8px",
          fontSize: "19px",
          fontFamily: "FZLT",
          fontWeight: 600,
          color: "rgb(249, 250, 251)",
          verticalAlign: "middle",
          left: "0",
          right: "0"
        });
        // 地图滑过出现
        // $('#'+ca).hover(function () { $('#'+ca2).stop(false,true).slideToggle(500).show(); });
      } else {
        // 应该像义乌一样，给几位数的框的大小，这样随着变停一会可能会变大？？
        var cssCa = {
          width: $("#"+ca1).outerWidth() + 8,
          height: (($("#" + ca1).outerWidth() + 8) * 50) / 62,
          position: "relative",
          padding:
            (((($("#" + ca1).outerWidth() + 8) * 50) / 62 / 62) * 50 -
              $("#" + ca1).outerHeight())/2 +"px" +" " +"4px"
        };
        $("#" + ca).css(cssCa);
        $("#" + caIcon).css({
          position: "absolute",
          left: ($("#" + ca).outerWidth() - 14) / 2 + "px",
          top: $("#" + ca).outerHeight() + "px"
        });
        // 地图滑过出现
        // $('#'+ca).hover(function () { $('#'+ca2).stop(false,true).slideToggle(500).show(); });
      }
    },

    scale() {
      var WW = $(window).width();
      //    var WW=$(window).width();
      var scaleNum = WW / 1920;
      var PH = 1080 * scaleNum;
      $(".example").height(PH);
      $(".example").width(WW);

      $(".pageWrap").css({
        "-webkit-transform": "scale(" + scaleNum + ")",
        transform: "scale(" + scaleNum + ")"
      });
    },
    selfAdaption() {
      const self = this; //因为箭头函数会改变this指向，指向windows。所以先把this保存

      setTimeout(() => {
        window.addEventListener("resize", function() {
          if (self.$refs.Echart1) {
            self.chart1 = self.$echarts.init(self.$refs.Echart1);
            self.chart1.resize();
          }
          if (self.$refs.Echart2) {
            self.chart2 = self.$echarts.init(self.$refs.Echart2);
            self.chart2.resize();
          }
          if (self.$refs.Echart3) {
            self.chart3 = self.$echarts.init(self.$refs.Echart3);
            self.chart3.resize();
          }
          if (self.$refs.Echart4) {
            self.chart4 = self.$echarts.init(self.$refs.Echart4);
            self.chart4.resize();
          }
          if (self.$refs.Echart5) {
            self.chart5 = self.$echarts.init(self.$refs.Echart5);
            self.chart5.resize();
          }
          if (self.$refs.Echart7) {
            self.chart7 = self.$echarts.init(self.$refs.Echart7);
            self.chart7.resize();
          }
          if (self.$refs.Echart8) {
            self.chart8 = self.$echarts.init(self.$refs.Echart8);
            self.chart8.resize();
          }
        });
      }, 10);
    },
    getTime() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.time = this.$moment().format("YYYY年MM月DD日");
        }, 1000);
      };



    },
    initChart() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/getTreatmentCount`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          if (data && data.length > 0) {
            for (var item of data) {
              if (item.address == "上溪镇") {
                $("#sx1").html(item.count);
                break;
              } else {
                $("#sx1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "义亭镇") {
                $("#yt1").html(item.count);
                break;
              } else {
                $("#yt1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "佛堂镇") {
                $("#ftz1").html(item.count);
                break;
              } else {
                $("#ftz1").html(0);
              }
            }

            for (var item of data) {
              if (item.address == "北苑街道") {
                $("#by1").html(item.count);
                break;
              } else {
                $("#by1").html(0);
              }
            }

            for (var item of data) {
              if (item.address == "后宅街道") {
                $("#hz1").html(item.count);
                break;
              } else {
                $("#hz1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "城西街道") {
                $("#cx1").html(item.count);
                break;
              } else {
                $("#cx1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "大陈镇") {
                $("#dc1").html(item.count);
                break;
              } else {
                $("#dc1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "廿三里街道") {
                $("#esl1").html(item.count);
                break;
              } else {
                $("#esl1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "江东街道") {
                $("#jd1").html(item.count);
                break;
              } else {
                $("#jd1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "福田街道") {
                $("#ft1").html(item.count);
                break;
              } else {
                $("#ft1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "稠城街道") {
                $("#cc1").html(item.count);
                break;
              } else {
                $("#cc1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "稠江街道") {
                $("#cj1").html(item.count);
                break;
              } else {
                $("#cj1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "苏溪镇") {
                $("#sxz1").html(item.count);
                break;
              } else {
                $("#sxz1").html(0);
              }
            }
            for (var item of data) {
              if (item.address == "赤岸镇") {
                $("#ca1").html(item.count);
                break;
              } else {
                $("#ca1").html(0);
              }
            }
          } else {
            $("#sx1").html(0);
            $("#yt1").html(0);
            $("#ft1").html(0);
            $("#by1").html(0);
            $("#hz1").html(0);
            $("#cx1").html(0);
            $("#dc1").html(0);
            $("#esl1").html(0);
            $("#jd1").html(0);
            $("#ftz1").html(0);
            $("#cc1").html(0);
            $("#cj1").html(0);
            $("#sxz1").html(0);
            $("#ca1").html(0);
          }

          // ie9下字体加载慢，可能会影响样式
          //
          setTimeout(()=>{
            this.$options.methods.getMapData();
          },500)
        } else {
          // this.number1 = '1666'
        }
      });
    },

    toggle() {
      this.$fullscreen.toggle(this.$el.querySelector(".pageWrap"), {
        wrap: false,
        callback: this.fullscreenChange
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
      if (this.fullscreen == true) {
        $("#qp").hide();
      } else {
        $("#qp").show();
      }
    },

    // 新结构
    parseFormatNum(s, type) {
      if (/[^0-9\.]/.test(s)) return "0";
      if (s == null || s == "") return "0";
      s = s.toString().replace(/^(\d*)$/, "$1.");
      s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
      s = s.replace(".", ",");
      var re = /(\d)(\d{3},)/;
      while (re.test(s)) s = s.replace(re, "$1,$2");
      s = s.replace(/,(\d\d)$/, ".$1");
      if (type == 0) {
        // 不带小数位(默认是有小数位)
        var a = s.split(".");
        if (a[1] == "00") {
          s = a[0];
        }
      }
      return s;
    },
    parseFormatNum1(s, type) {
      if (s && s.toString().length >= 10) {
        // s=Number(s.toString().substring(0,9));
        //  hlzfy1: 38549909988,
        s = Math.ceil(s / 10000);
        $("#fydw").html("(万元)");
      }
      // else {
      //   $("#fydw").html("(元)");
      // }

      if (/[^0-9\.]/.test(s)) return "0";
      if (s == null || s == "") return "0";
      s = s.toString().replace(/^(\d*)$/, "$1.");
      s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
      s = s.replace(".", ",");
      var re = /(\d)(\d{3},)/;
      while (re.test(s)) s = s.replace(re, "$1,$2");
      s = s.replace(/,(\d\d)$/, ".$1");
      if (type == 0) {
        // 不带小数位(默认是有小数位)
        var a = s.split(".");
        if (a[1] == "00") {
          s = a[0];
        }
      }
      return s;
    },
    // 参保人年龄分布
    initChart1() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/insuredAgeDistribution`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var nlfb1 = ["60以下", "60-70", "70-80", "80-90", "90以上"];
          var nlfb3 = [0, 0, 0, 0, 0];
          var data = res.data.data[0];
          for (var i in data) {
            if (i == "70-80") {
              nlfb3[2] = {
                name: "70-80",
                value: Number(data[i].split("%")[0])
              };
              // nlfb3.push({name: '70-80', value: Number(data[i].split('%')[0])})
            }
            if (i == "90以上") {
              nlfb3[4] = {
                name: "90以上",
                value: Number(data[i].split("%")[0])
              };
              // nlfb3.push({name: '90岁以上', value: Number(data[i].split('%')[0])})
            }
            if (i == "80-90") {
              nlfb3[3] = {
                name: "80-90",
                value: Number(data[i].split("%")[0])
              };
              // nlfb3.push({name: '80-90', value: Number(data[i].split('%')[0])})
            }
            if (i == "60-70") {
              nlfb3[1] = {
                name: "60-70",
                value: Number(data[i].split("%")[0])
              };
              // nlfb3.push({name: '60-70', value: Number(data[i].split('%')[0])})
            }
            if (i == "60以下") {
              nlfb3[0] = {
                name: "60以下",
                value: Number(data[i].split("%")[0])
              };
              // nlfb3.push({name: '60以下', value: Number(data[i].split('%')[0])})
            }
          }
          this.nlfb1 = nlfb1;
          this.nlfb2 = nlfb3;
          // 指定图表的配置项和数据
          var option = {
            // 使充满整个div
            grid: {
              left: "4%",
              right: "4%",
              top: "top",
              bottom: "20px",
              containLabel: true
            },
            xAxis: {
              type: "value",
              boundaryGap: [0, 0.01],
              show: false,
              min: 0,
              max: 100
            },
            yAxis: {
              type: "category",
              data: this.nlfb1,
              splitLine: {
                show: false,
                //  改变轴线颜色
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ["red"]
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#fff",
                  width: 3 //这里是坐标轴的宽度,可以去掉
                }
              },
              axisLabel: {
                textStyle: {
                  color: "#fff",
                  align: "left",
                  baseline: "middle"
                },
                padding: [0, 0, 0, 6],
                fontSize: "15",

                fontWeight: "normal",
                color: "rgba(102,102,102,1)"
              },
              offset: 56
            },
            series: [
              {
                name: "所占比",
                type: "bar",
                data: this.nlfb2,
                barWidth: "26px",
                barCategoryGap: "16px",
                label: {
                  normal: {
                    show: true,
                    formatter: "{c}%",
                    position: "right",
                    color: "#00C3FF",
                    fontSize:'16'
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#00428E"
                  },
                  {
                    offset: 1,
                    color: "#00C3FF"
                  }
                ]),
                z: 20
              },
              {
                name: "所占比",
                type: "bar",
                barWidth: "26px",
                barCategoryGap: "16px",
                data: [100, 100, 100, 100, 100],
                itemStyle: {
                  normal: {
                    color: "#44BEA3",
                    opacity: 0.15
                  }
                },

                barGap: "-100%"
              }
            ]
          };
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(
            document.getElementById("main1"),
            "walden"
          );
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    },
    // 男女占比
    initChart2() {
      // 男女比例
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/sexProportion`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          this.nnData = [];
          for (var i in data) {
            if (i == "女") {
              this.nnData.push({
                value: data[i].split("%")[0],
                name: "女"
              });
              this.womanData = data[i];
            } else {
              this.nnData.push({
                value: data[i].split("%")[0],
                name: "男"
              });
              this.manData = data[i];
            }
          }
          var option = {
            // 使充满整个div
            grid: {
              left: "left",
              top: "top",
              containLabel: true
            },
            series: [
              {
                name: "男女占比",
                type: "pie",
                radius: ["55%", "80%"],
                clockwise: false,
                hoverAnimation: false,
                legendHoverLink: false,
                itemStyle: {
                  normal: {
                    borderWidth: 4,
                    borderColor: "#132A40"
                  }
                },
                color: ["#1F86FD", "#9540FF"],
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.nnData
              }
            ]
          };

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main2"));
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    },
    initChart3() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/isDeformity`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          this.cjData = [];
          for (var i in data) {
            if (i == "残疾") {
              this.cjData.push({
                value: data[i].split("%")[0],
                name: "残疾"
              });
              this.cjzb = data[i];
            } else {
              this.cjData.push({
                value: data[i].split("%")[0],
                name: "非残"
              });
              this.fczb = data[i];
            }
          }

          var option = {
            // 使充满整个div
            grid: {
              left: "left",
              // right       : "4%",
              top: "top",
              containLabel: true
            },
            series: [
              {
                name: "残疾占比",
                type: "pie",
                radius: ["55%", "80%"],
                clockwise: false,
                hoverAnimation: false,
                legendHoverLink: false,
                itemStyle: {
                  normal: {
                    borderWidth: 4,
                    borderColor: "#132A40"
                  }
                },
                color: ["#04B4EC", "#5CC201"],
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.cjData
              }
            ]
          };

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main3"));
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          // 指定图表的配置项和数据
        } else {
          // this.number1 = '1666'
        }
      });
    },
    initChart4() {
      // 参保类型
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/medicalInseCategory`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          this.cxData = [];
          for (var i in data) {
            if (i == "城乡") {
              this.cxData.push({
                value: data[i].split("%")[0],
                name: "城乡"
              });
              this.cbzb = data[i];
            } else {
              this.cxData.push({
                value: data[i].split("%")[0],
                name: "职工"
              });
              this.jbzb = data[i];
            }
          }

          var option = {
            // 使充满整个div
            grid: {
              left: "left",
              // right       : "4%",
              top: "top",
              containLabel: true
            },
            series: [
              {
                name: "参保类型",
                type: "pie",
                radius: ["55%", "80%"],
                clockwise: false,
                hoverAnimation: false,
                legendHoverLink: false,
                itemStyle: {
                  normal: {
                    borderWidth: 4,
                    borderColor: "#132A40"
                  }
                },
                color: ["#1F86FD", "#9540FF"],
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.cxData
              }
            ]
          };

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(
            document.getElementById("main4"),
            "walden"
          );
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    },
    initChart5() {
      // 低保占比
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/lowIncomePeople`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          this.dbData = [];
          for (var i in data) {
            if (i == "低保") {
              this.dbData.push({
                value: data[i].split("%")[0],
                name: "低保"
              });
              this.dbzb = data[i];
            } else {
              this.dbData.push({
                value: data[i].split("%")[0],
                name: "非低"
              });
              this.fdzb = data[i];
            }
          }
          var option = {
            // 使充满整个div
            grid: {
              left: "left",
              top: "top",
              containLabel: true
            },
            series: [
              {
                name: "低保占比",
                type: "pie",
                radius: ["55%", "80%"],
                clockwise: false,
                hoverAnimation: false,
                legendHoverLink: false,
                itemStyle: {
                  normal: {
                    borderWidth: 4,
                    borderColor: "#132A40"
                  }
                },
                color: ["#04B4EC", "#5CC201"],
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.dbData
              }
            ]
          };

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(
            document.getElementById("main5"),
            "walden"
          );
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    },
    initChart6() {
      // 评估等级
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/queryAssessLevel`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = [];
          for (var item of res.data.data) {
            data.push({
              value: item.count,
              name: item.assessed_level + "级"
            });
          }
          this.pgdjData = data;
          // 指定图表的配置项和数据
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              left: "5%",
              right: "4%",
              top: "top",
              bottom: "20px",
              // width:'93%',
              // height:'98%',

              containLabel: true
            },
            legend: {
              orient: "vertical",
              x: "left",
              data: ["0级", "1级", "2级", "3级", "4级", "5级", "6级"],
              width: "80",
              padding: [15, 0, 0, 30],
              align: "right",
              itemWidth: "12",
              itemHeight: "12",
              // itemGap:'10',
              textStyle: {
                color: "#fff",
                width: "12",
                height: "12",
                padding: [4, 0, 2, 0]
              }
            },
            series: [
              {
                name: "评估等级分布",
                type: "pie",
                radius: ["55", "88"],
                // radius :'95%',
                center: ["51%", "50%"],
                data: this.pgdjData.sort(function(a, b) {
                  return a.value - b.value;
                }),
                // roseType: 'angle',
                // roseType: 'radius',
                // startAngle: 225, //起始角度
                startAngle: 40, //起始角度
                color: [
                  "#72FBFD",
                  "#3C78F5",
                  "#5238F4",
                  "#9A3EF5",
                  "#E455A6",
                  "#00C3FF",
                  "#6FDF1C"
                ],
                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.percent + "%";
                    },
                    color: "#fff",
                    // align:"left",
                    fontSize: "14",

                    // fontWeight:'600',
                    padding: [4, 4, 4, 4],
                    position: "outside"
                  }
                },
                labelLine: {
                  normal: {
                    smooth: 0.2,
                    length: 10,
                    length2: 30
                  }
                }
              }
            ]
          };

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(
            document.getElementById("main6"),
            "walden"
          );
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    },
    initChart7() {
      // 工单月趋势变化
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationAssess/queryOrderChangeMonth`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.gdybh2 = [];
          this.gdybh1 = [];
          for (var item of res.data.data) {
            this.gdybh1.push(item.month.split("-")[1]);
            this.gdybh2.push({
              value: item.count,
              symbol: "circle"
            });
          }
          // 指定图表的配置项和数据
          var data1 = this.gdybh1;
          var option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985"
                }
              }
            },
            grid: {
              left: "3%",
              right: "4%",
              top: "9%",
              bottom: "12%",
              // width:'93%',
              // height:'98%',

              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: this.gdybh1,
                splitLine: {
                  show: false,
                  //  改变轴线颜色
                  lineStyle: {
                    symbol: "circle",
                    // 使用深浅的间隔色
                    color: ["red"],
                    type: "dashed"
                  }
                }
              }
            ],
            // 新加的
            dataZoom: [
              {
                xAxisIndex: 0,
                show: false,
                type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                startValue: 0, // 从头开始。
                endValue: 3 // 一次性展示五个。
              }
            ],
            yAxis: [
              {
                type: "value",
                splitLine: {
                  show: true,
                  //  改变轴线颜色
                  lineStyle: {
                    // 使用深浅的间隔色
                    color: ["#ccc"],
                    type: "solid",
                    opacity: 0.3,
                    width: 1
                  }
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#fff",
                    width: 3 //这里是坐标轴的宽度,可以去掉
                  }
                },
                axisLabel: {
                  show: false
                }
              }
              //   show: false
            ],
            series: [
              {
                name: "工单数量",
                type: "line",
                stack: "总量",

                data: this.gdybh2,

                // smooth: true,
                symbol: "circle",
                symbolSize: [8, 8],
                itemStyle: {
                  normal: {
                    color: "#132A40",
                    borderColor: "#44BEA3",
                    borderWidth: 3
                  }
                },
                // 动画运动速度
                animationDuration: 3000,
                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    },

                    position: "top",
                    // offset:[0,-20],
                    // offset:'-10',
                    textStyle: {
                      width: "39px",
                      height: "14px",
                      fontSize: "18px",

                      fontWeight: 400,
                      color: "rgba(0,195,255,1)"
                    }
                  },
                  emphasis: { show: true }
                },
                lineStyle: {
                  normal: {
                    color: "#00E4FF",
                    width: 2
                  }
                },
                areaStyle: {
                  normal: {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          // color: "#00C3FF" // 0% 处的颜色
                          color: "#174C83"
                        },
                        {
                          offset: 1,
                          // color: "#1F86FD",// 100% 处的颜色
                          color: "#0896CE"
                        }
                      ],

                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              }
            ]
          };
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(
            document.getElementById("main7"),
            "walden"
          );
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    }
  }
};
</script>
<style scoped>
* {
  font-size: 100%;
}
.example {
  font-family: "SourceHanSans";
}
</style>

