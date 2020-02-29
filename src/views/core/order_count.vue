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
height:80px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;padding:0px 30px">
            <div style="width:222px;
height:18px;padding-top:31px;float:left;">
              <img
                style="width:100%;"
                src="../../assets/img/echarts/sl.png"
              />
            </div>
            <div style="
font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);
float:right;text-align:'right';margin-top:29px;">
              居家护理
            </div>

          </div>
          <div style="width:494px;
height:135px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;padding:27px 30px 28px;box-sizing:border-box;">
            <div style="width:49%;float:left;text-align:left;box-sizing:border-box;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:18px;">居家护理机构</div>
              <div style="
height:23px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(0,195,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{jjhljg}}</div>

            </div>
            <div style="width:2px;height:80px;
background:rgba(204,204,204,0.3);float:left;"></div>

            <div style="width:49%;float:right;text-align:left;padding-left:29px;box-sizing:border-box;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:18px;">居家护理失能人员</div>
              <div style="
height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(111,223,28,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{jjhlsn}}</div>
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:30%;font-size:2vh;margin:0;display:black;margin-top:2%;">申请评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:60%;font-size:4vh;margin:0px;blod:600;display:black;">{{sqpgrs}}</p> -->
            </div>

            <div style="clear:both;"></div>
          </div>
          <div style="width:493px;
height:182px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:7px;padding:22px 30px 22px;box-sizing:border-box;">
            <div style="width:49%;float:left;text-align:left;box-sizing:border-box;margin-top:28px;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:19px;">居家护理人员总数</div>
              <div style="height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(164,91,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{jjhlry}}</div>

            </div>
            <div style="width:2px;height:110px;
background:rgba(204,204,204,0.3);float:left;margin-bottom:36px;margin-top:15px;"></div>

            <div style="width:49%;float:right;text-align:left;padding-left:29px;box-sizing:border-box;margin-top:-4px;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:10px;">家庭护理员</div>
              <div style="height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(0,195,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);margin-bottom:24px;">{{jjhlry1}}</div>
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:10px;">医护人员</div>
              <div style="height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(111,223,28,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{jjhlry2}}</div>
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:30%;font-size:2vh;margin:0;display:black;margin-top:2%;">申请评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:60%;font-size:4vh;margin:0px;blod:600;display:black;">{{sqpgrs}}</p> -->
            </div>

            <div style="clear:both;"></div>
          </div>
          <div style="width:493px;
height:182px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:8px;padding:22px 30px 22px;box-sizing:border-box;">
            <div style="width:49%;float:left;text-align:left;box-sizing:border-box;margin-top:28px;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:19px;">护理总费用<span
                  id="hlfydw"
                  style="color:#fff;"
                >(元)</span></div>
              <div style="height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(164,91,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{hlfy}}</div>

            </div>
            <div style="width:2px;height:110px;
background:rgba(204,204,204,0.3);float:left;margin-bottom:36px;margin-top:15px;"></div>

            <div style="width:49%;float:right;text-align:left;padding-left:29px;box-sizing:border-box;margin-top:-4px;">
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:40px;line-height:40px;font-size:20px;margin:0px;">已评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#6FDF1C;heigth:45px;line-height:45px;font-size:45px;margin:0px;blod:600;">{{ypgrs}}</p> -->
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:10px;">生活护理<span
                  id="shhldw"
                  style="color:#fff;"
                >(元)</span></div>
              <div style="height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(0,195,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);margin-bottom:24px;">{{hlfy1}}</div>
              <div style="height:21px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;margin-bottom:10px;">医疗护理<span
                  id="ylhldw"
                  style="color:#fff;"
                >(元)</span></div>
              <div style="height:26px;
font-size:26px;
font-family:FZLT;
font-weight:800;
color:rgba(111,223,28,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);">{{hlfy2}}</div>
              <!-- <p style="text-align:left;padding:0px 10px;color:#fff;heigth:30%;font-size:2vh;margin:0;display:black;margin-top:2%;">申请评估人数</p>
              <p style="text-align:left;padding:0px 10px;color:#00C3FF;heigth:60%;font-size:4vh;margin:0px;blod:600;display:black;">{{sqpgrs}}</p> -->
            </div>

            <div style="clear:both;"></div>
          </div>
          <div style="width:494px;
height:250px;
background:rgba(19,42,64,1);
border-radius:20px;">

            <div style="padding-top:16px;height:46px;padding-left:19px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);text-align:left;">
              费用月趋势变化
            </div>

            <div
              id="main4"
              style="height:204px;"
              ref="Echart2"
            ></div>

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
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;">实时护理人数</div>
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
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);display:block;text-align:left;">实时护理费用<span
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
            </div>
            <!-- 稠城街道 -->
            <div style="position:absolute;left:306px;top:235px;">
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
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
                  0
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
color:rgba(249,250,251,1);height:20px;">0</p>
            </div>

          </div>
        </div>
        <div style="width:494px;float:left;margin-right:25px;margin-top:29px;">
          <!-- <div style="background:#132A40;height:8%;margin-bottom:3%;border-radius:10px;text-align:center;color:#4EB0E5;height:50px;line-height:50px;font-size:20px;">机构护理</div> -->
          <div style="width:494px;
height:80px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;padding:0px 30px">
            <div style="width:222px;
height:18px;padding-top:31px;float:left;">
              <img
                style="width:100%;"
                src="../../assets/img/echarts/sl.png"
              />
            </div>
            <div style="
font-size:22px;
font-weight:500;
color:rgba(78,176,229,1);
float:right;text-align:'right';margin-top:29px;">
              机构护理
            </div>

          </div>
          <div style="width:494px;
height:250px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;">

            <div style="padding-top:16px;height:46px;padding-left:19px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);text-align:left;">
              总床位数/长护入住数量
            </div>

            <div style="height:204px;padding:10px;box-sizing:border-box;">
              <div style="height:100%;width:33%;float:left;position:relative;">
                <div
                  id="main2"
                  style="width:100%;height:100%;top:-20px!important;position:absolute;"
                  ref="Echart3"
                >
                </div>

                <div style="position:absolute;top:20%;left:25%;width:50%;border-radius:100%;margin:0 auto;height:40%;
background:rgba(19,42,64,1);box-sizing:border-box;box-sizing:border-box;verticalAlign:middle;padding:10px 0;">

                  <p style="padding:0;margin:0;
height:14px;
font-size:16px;
font-family:FZLT;
color:rgba(255,255,255,1);display:block;margin-bottom:9px;">{{ylxcCw}}</p>
                  <p style="width:60%;height:0;border-bottom:1px solid rgba(153, 153, 153, 0.3);padding:0;margin:0 auto;margin-bottom:3px;display:block;"></p>
                  <p style="padding:0;margin:0;
height:15px;
font-size:18px;
font-family:FZLT;
color:rgba(0,195,255,1);display:block;">{{ylxcSy}}</p>

                </div>
                <div style="position:absolute;bottom:20px;left:25%;width:80px;
height:20px;
font-size:16px;
font-weight:600;
color:rgba(255,255,255,1);">怡乐新村</div>
              </div>
              <div style="height:100%;width:33%;float:left;position:relative;">
                <div
                  id="main5"
                  style="width:100%;height:100%;top:-20px!important;position:absolute;"
                  ref="Echart4"
                >
                </div>

                <div style="position:absolute;top:20%;left:25%;width:50%;border-radius:100%;margin:0 auto;height:40%;
background:rgba(19,42,64,1);box-sizing:border-box;box-sizing:border-box;verticalAlign:middle;padding:10px 0;">

                  <p style="padding:0;margin:0;
height:14px;
font-size:16px;
font-family:FZLT;
color:rgba(255,255,255,1);display:block;margin-bottom:9px;">{{hbzCw}}</p>
                  <p style="width:60%;height:0;border-bottom:1px solid rgba(153, 153, 153, 0.3);padding:0;margin:0 auto;margin-bottom:3px;display:block;"></p>
                  <p style="padding:0;margin:0;
height:15px;
font-size:18px;
font-family:FZLT;
color:#9540FF;display:block;">{{hbzSy}}</p>

                </div>
                <div style="position:absolute;bottom:20px;left:25%;width:80px;
height:20px;
font-size:16px;
font-weight:600;
color:rgba(255,255,255,1);">鸿佰洲</div>
              </div>
              <div style="height:100%;width:33%;float:left;position:relative;">
                <div
                  id="main6"
                  style="width:100%;height:100%;top:-20px!important;position:absolute;"
                  ref="Echart5"
                >
                </div>
                <div style="position:absolute;top:20%;left:25%;width:50%;border-radius:100%;margin:0 auto;height:40%;
background:rgba(19,42,64,1);box-sizing:border-box;box-sizing:border-box;verticalAlign:middle;padding:10px 0;">

                  <p style="padding:0;margin:0;
height:14px;
font-size:16px;
font-family:FZLT;
color:rgba(255,255,255,1);display:block;margin-bottom:9px;">{{zxCw}}</p>
                  <p style="width:60%;height:0;border-bottom:1px solid rgba(153, 153, 153, 0.3);padding:0;margin:0 auto;margin-bottom:3px;display:block;"></p>
                  <p style="padding:0;margin:0;
height:15px;
font-size:18px;
font-family:FZLT;
color:rgba(0,195,255,1);display:block;">{{zxSy}}</p>

                </div>
                <div style="position:absolute;bottom:20px;left:25%;width:80px;
height:20px;
font-size:16px;
font-weight:600;
color:rgba(255,255,255,1);">朝霞</div>
              </div>
            </div>

          </div>
          <div style="width:494px;
height:250px;
background:rgba(19,42,64,1);
border-radius:20px;margin-bottom:10px;">

            <div style="padding-top:16px;height:46px;padding-left:19px;
font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);text-align:left;">
              护工数量
            </div>

            <div
              id="main3"
              style="height:204px;"
              ref="Echart12"
            ></div>

          </div>
          <div style="width:494px;
height:250px;
background:rgba(19,42,64,1);
border-radius:20px;">

            <div style="padding-top:16px;height:46px;padding-left:19px;padding-right:19px;">
              <div style="font-size:22px;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);text-align:left;float:left;">
                费用月趋势变化
              </div>
              <div style="text-align:right;float:right;margin-top: 4.5px;">
                <div style='width:13px;
height:13px;
background:rgba(19,42,64,1);
border:3px solid rgba(4,196,255,1);
border-radius:50%;display:inline-block;'></div>
                <span style="height:17px;
font-size:16px;
font-weight:500;
color:rgba(255,255,255,1);margin-right:5px;">怡乐新村</span>
                <div style='width:13px;
height:13px;
background:rgba(19,42,64,1);
border:3px solid rgba(149,64,255,1);
border-radius:50%;display:inline-block;'></div>
                <span style="height:17px;
font-size:16px;
font-weight:500;
color:rgba(255,255,255,1);margin-right:5px;">鸿佰洲</span>
                <div style='width:13px;
height:13px;
background:rgba(19,42,64,1);
border:3px solid rgba(111,223,28,1);
border-radius:50%;display:inline-block;'></div>
                <span style="height:17px;
font-size:16px;
font-weight:500;
color:rgba(255,255,255,1);">朝霞</span>
              </div>

            </div>
            <!-- <div style="padding-top:16px;height:46px;padding-left:19px;
font-size:22px;
font-family:PingFangSC-Semibold;
font-weight:600;
color:rgba(255,255,255,1);
text-shadow:0px 20px 20px rgba(0, 0, 0, 0.2);text-align:left;">
                费用月趋势变化
              </div> -->

            <div
              id="main1"
              style="height:204px;"
              ref="Echart13"
            ></div>

          </div>
        </div>

      </div>
    </div>
    <!-- <button type="button" @click="toggle" style="position:absolute;right:10px;top:10px;">Fullscreen</button> -->
  </div>
</template>
<script>
import Bg2 from "@/assets/img/echarts/background.png";
import Bg3 from "@/assets/img/echarts/huli.png";
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
      // 护工数量
      jjhlry: 2487,
      jjhlry1: 1140,
      jjhlry2: 1347,
      hlfy: 2848810,
      hlfy1: 2437718,
      hlfy2: 411092,
      jjhljg: 14,
      jjhlsn: 1663,

      hgsl1: ["怡乐新村", "鸿佰洲", "朝霞"],
      hgsl2: [10, 30, 20],
      hgsl4: [50, 50, 50],
      hlzfy: 0,
      hlzfy1: 0,
      yfybh1: ["07", "08", "09", "10", "11", "12", "01"],
      yfybh2: [
        { value: 120, symbol: "circle" },
        { value: 132, symbol: "circle" },
        { value: 101, symbol: "circle" },
        { value: 134, symbol: "circle" },
        { value: 90, symbol: "circle" },
        { value: 230, symbol: "circle" },
        { value: 210, symbol: "circle" }
      ],
      yfybh3: [],
      number1: 0,
      number2: 0,

      countYlxc: 1000,
      dataYlxc: [
        {
          value: 900,
          name: "怡乐新村",
          label: {
            normal: {
              show: true
            }
          }
        },
        { value: 100, name: "剩余" }
      ],
      countHbz: 1000,
      dataHbz: [
        {
          value: 900,
          name: "鸿佰洲",
          label: {
            normal: {
              show: true
            }
          }
        },
        { value: 100, name: "剩余" }
      ],
      countZx: 1000,
      dataZx: [
        {
          value: 900,
          name: "朝霞",
          label: {
            normal: {
              show: true
            }
          }
        },
        { value: 100, name: "剩余" }
      ],
      countKly: 1000,
      dataKly: [
        {
          value: 900,
          name: "康乐园",
          label: {
            normal: {
              show: true
            }
          }
        },
        { value: 100, name: "剩余" }
      ],
      countYlxccs: 1000,
      dataYlxccs: [
        {
          value: 900,
          name: "怡乐新村测试",
          label: {
            normal: {
              show: true
            }
          }
        },
        { value: 100, name: "剩余" }
      ],
      countPjgsk: 1000,
      dataPjgsk: [
        {
          value: 900,
          name: "普济骨伤科",
          label: {
            normal: {
              show: true
            }
          }
        },
        { value: 100, name: "剩余" }
      ],

      // 机构费用展示
      ylxcData: [
        { value: 120, symbol: "circle" },
        { value: 132, symbol: "circle" },
        { value: 101, symbol: "circle" },
        { value: 134, symbol: "circle" },
        { value: 90, symbol: "circle" },
        { value: 230, symbol: "circle" },
        { value: 210, symbol: "circle" }
      ],
      hbzData: [
        { value: 120, symbol: "circle" },
        { value: 132, symbol: "circle" },
        { value: 101, symbol: "circle" },
        { value: 134, symbol: "circle" },
        { value: 90, symbol: "circle" },
        { value: 230, symbol: "circle" },
        { value: 210, symbol: "circle" }
      ],
      zxData: [
        { value: 120, symbol: "circle" },
        { value: 132, symbol: "circle" },
        { value: 101, symbol: "circle" },
        { value: 134, symbol: "circle" },
        { value: 90, symbol: "circle" },
        { value: 230, symbol: "circle" },
        { value: 210, symbol: "circle" }
      ],

      yfData: [],

      ylxcCw: 0,
      ylxcSy: 0,
      hbzCw: 0,
      hbzSy: 0,
      zxCw: 0,
      zxSy: 0,

      nearFour:[]
    };
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    this.timer = null;
    this.timer2 = null;

    // 页面跳走时，删除echarts自适应的监听器
    window.removeEventListener("resize", this.$refs.Echart1);
    window.removeEventListener("resize", this.$refs.Echart2);
    window.removeEventListener("resize", this.$refs.Echart3);
    window.removeEventListener("resize", this.$refs.Echart4);
    window.removeEventListener("resize", this.$refs.Echart5);
  },
  mounted() {
    // this.getMapData();
    this.timer2 = setInterval(() => {
      this.initChart();
      this.getHlrs();
    }, 600000);

    this.scale();
    var that = this;
    window.addEventListener("resize", function() {
      that.scale();
    });

    this.time = this.$moment().format("YYYY年MM月DD日");
    this.getTime();
    // this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();
    this.initChart();
    this.initChart5();
    this.initChart6();

    // this.$nextTick(()=>{
    //   this.initChart1();
    // })

    this.getHlrs();
    this.getJjhlry();

    // echarts图表自适应
    this.selfAdaption();
    this.$refs.Echart3.setAttribute(
      "style",
      "width:100%;height:100%;top:-20px!important;position:absolute;"
    );
    this.$refs.Echart4.setAttribute(
      "style",
      "width:100%;height:100%;top:-20px!important;position:absolute;"
    );
    this.$refs.Echart5.setAttribute(
      "style",
      "width:100%;height:100%;top:-20px!important;position:absolute;"
    );
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
    // 新结构
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
        var cssCa = {
          width: $("#" + ca1).outerWidth() + 8,
          height: (($("#" + ca1).outerWidth() + 8) * 50) / 62,
          position: "relative",
          padding:
            (((($("#" + ca1).outerWidth() + 8) * 50) / 62 / 62) * 50 -
              $("#" + ca1).outerHeight()) /
              2 +
            "px" +
            " " +
            "4px"
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
    parseFormatNum1(s, type, type2) {
      if (type2 == "护理") {
        if (s && s.toString().length >= 10) {
          // s=Number(s.toString().substring(0,9));
          //  hlzfy1: 38549909988,
          s = Math.ceil(s / 10000);
          $("#hlfydw").html("(万元)");
        }
        // else {
        //   $("#hlfydw").html("(元)");
        // }
      } else if (type2 == "护理1") {
        if (s && s.toString().length >= 10) {
          // s=Number(s.toString().substring(0,9));
          //  hlzfy1: 38549909988,
          s = Math.ceil(s / 10000);
          $("#shhldw").html("(万元)");
        }
        // else {
        //   $("#shhldw").html("(元)");
        // }
      } else if (type2 == "护理2") {
        if (s && s.toString().length >= 10) {
          // s=Number(s.toString().substring(0,9));
          //  hlzfy1: 38549909988,
          s = Math.ceil(s / 10000);
          $("#ylhldw").html("(万元)");
        }
        // else {
        //   $("#ylhldw").html("(元)");
        // }
      } else if (type2 == "实时费用") {
        if (s && s.toString().length >= 10) {
          // s=Number(s.toString().substring(0,9));
          //  hlzfy1: 38549909988,
          s = Math.ceil(s / 10000);
          $("#fydw").html("(万元)");
        }
        // else {
        //   $("#fydw").html("(元)");
        // }
      }

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
        });
      }, 10);
    },

    getJjhlry() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryHomeCare`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.jjhljg = res.data.data;
        } else {
          this.jjhljg = "14";
        }
      });
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryTotalNumberOfHomeCareStaff`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.jjhlry = this.parseFormatNum(res.data.data, 0);
        } else {
          //   this.jjhlry = "2487";
        }
      });
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryNurse`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.jjhlry2 = this.parseFormatNum(res.data.data, 0);
        } else {
          //   this.jjhlry2 = "1347";
        }
      });
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryHomeHelper`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.jjhlry1 = this.parseFormatNum(res.data.data, 0);
        } else {
          //   this.jjhlry1 = "1140";
        }
      });

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryHomeNursingDisability`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.jjhlsn = this.parseFormatNum(res.data.data, 0);
        } else {
          //   this.jjhlsn = "1663";
        }
      });

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryLifeCost`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.hlfy1 = this.parseFormatNum1(res.data.data, 0, "护理1");
          //   this.hlfy1 = this.parseFormatNum1(123456789809,0,'护理1');
        } else {
          //   this.hlfy1 = "2437718";
        }
      });
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryMedicalCost`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.hlfy2 = this.parseFormatNum1(res.data.data, 0, "护理2");
          //   this.hlfy2 = this.parseFormatNum1(123456789789,0,'护理2');
        } else {
          //   this.hlfy2 = "411092";
        }
      });
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/homeCareNursingCostTotal`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.hlfy = this.parseFormatNum1(res.data.data, 0, "护理");
          //   this.hlfy = this.parseFormatNum1(123456789889,0,'护理');
        } else {
          //   this.hlfy = "2848810";
        }
      });
    },

    getHlrs() {
      // 实时护理人数
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryRealTimeNursingCare`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.number1 = res.data.data;
          this.number2 = this.parseFormatNum(res.data.data, 0);
        } else {
          this.number1 = "0";
        }
      });
      // 实时护理费用
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryActualFee`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.hlzfy = res.data.data;
          this.hlzfy1 = this.parseFormatNum1(res.data.data, 0);
        } else {
          this.hlzfy = "0";
          // this.hlzfy1 = "3854990";
        }
      });
    },
    getTime() {
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.time = this.$moment().format("YYYY年MM月DD日");
        }, 1000);
      }
    },
    initChart() {
      var that = this;
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/getActualNursingCountForMap`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;

          if (data && data.length > 0) {
            for (var item of data) {
              if (item.streetName == "上溪镇") {
                $("#sx1").html(item.nursingCount);
                break;
              } else {
                $("#sx1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "义亭镇") {
                $("#yt1").html(item.nursingCount);
                break;
              } else {
                $("#yt1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "佛堂镇") {
                $("#ftz1").html(item.nursingCount);
                break;
              } else {
                $("#ftz1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "北苑街道") {
                $("#by1").html(item.nursingCount);
                break;
              } else {
                $("#by1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "后宅街道") {
                $("#hz1").html(item.nursingCount);
                break;
              } else {
                $("#hz1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "城西街道") {
                $("#cx1").html(item.nursingCount);
                break;
              } else {
                $("#cx1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "大陈镇") {
                $("#dc1").html(item.nursingCount);
                break;
              } else {
                $("#dc1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "廿三里街道") {
                $("#esl1").html(item.nursingCount);
                break;
              } else {
                $("#esl1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "江东街道") {
                $("#jd1").html(item.nursingCount);
                break;
              } else {
                $("#jd1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "福田街道") {
                $("#ft1").html(item.nursingCount);
                break;
              } else {
                $("#ft1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "稠城街道") {
                $("#cc1").html(item.nursingCount);
                break;
              } else {
                $("#cc1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "稠江街道") {
                $("#cj1").html(item.nursingCount);
                break;
              } else {
                $("#cj1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "苏溪镇") {
                $("#sxz1").html(item.nursingCount);
                break;
              } else {
                $("#sxz1").html(0);
              }
            }
            for (var item of data) {
              if (item.streetName == "赤岸镇") {
                $("#ca1").html(item.nursingCount);
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
          setTimeout(() => {
            that.$options.methods.getMapData();
          }, 500);
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
    initChart1() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryMonthFee2`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var ylxcData = [];
          var ylxcData1 = [];
          var hbzData = [];
          var hbzData1 = [];
          var zxData = [];
          var zxData1 = [];
          var yfData11 = [];
          var yfData22 = [];



          if(res.data.data){
           for (var item1 of res.data.data[0].list) {
             yfData11.push(item1.balanceMonth.split("-")[1]);
            }
          }else{
            yfData11=this.nearFour;
          }

          if(res.data.data){
            for (var item of res.data.data) {
            if (item.orgName == "义乌市怡乐新村养老服务中心") {
              for (var item1 of item.list) {
                ylxcData.push({ value: item1.nursingCost, symbol: "circle" });
              }
            }
            if (item.orgName == "义乌市鸿佰洲养老服务中心") {
              for (var item1 of item.list) {
                hbzData.push({ value: item1.nursingCost, symbol: "circle" });
              }
            }
            if (item.orgName == "义乌市朝霞养老服务中心") {
              for (var item1 of item.list) {
                zxData.push({ value: item1.nursingCost, symbol: "circle" });
              }
            }
          }

          }

          if(ylxcData.length<1){
            ylxcData=[0,0,0,0]
          }
          if(hbzData.length<1){
            hbzData=[0,0,0,0]
          }
          if(zxData.length<1){
            zxData=[0,0,0,0]
          }

          for (var item of yfData11) {
            if (item == "01") {
              yfData22.push("1月");
            } else if (item == "02") {
              yfData22.push("2月");
            } else if (item == "03") {
              yfData22.push("3月");
            } else if (item == "04") {
              yfData22.push("4月");
            } else if (item == "05") {
              yfData22.push("5月");
            } else if (item == "06") {
              yfData22.push("6月");
            } else if (item == "07") {
              yfData22.push("7月");
            } else if (item == "08") {
              yfData22.push("8月");
            } else if (item == "09") {
              yfData22.push("9月");
            } else if (item == "10") {
              yfData22.push("10月");
            } else if (item == "11") {
              yfData22.push("11月");
            } else if (item == "12") {
              yfData22.push("12月");
            }
          }
          // 指定图表的配置项和数据
          var data1 = yfData11;

          // console.log(this.nearFour,yfData22,hbzData,ylxcData,zxData)

          var option = {
            title: {
              //text     : "费用月趋势变化",
              x: "left",
              textStyle: {
                color: "#FFFFFF"
              }
            },
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
              left: "left",
              right: "4%",
              bottom: "8%",
              top: "12%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                // data: yfData22,
                data: this.nearFour,
                splitLine: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#ccc"
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
                show: false, //隐藏y轴
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: "怡乐新村",
                type: "line",
                // stack    : "总量",
                label: {
                  normal: {
                    show: true,
                    color: "rgba(4,196,255,1)",
                    position: "top"
                  }
                },
                symbol: "circle",
                symbolSize: 10,
                areaStyle: {
                  normal: {
                    //color: '#00C3FF' //改变区域颜色
                    // opacity:"0.5",
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(4,196,255,1)"
                      },
                      {
                        offset: 0.05,
                        color: "rgba(4,196,255,0.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(4,196,255,0)"
                      }
                    ])
                  }
                },
                itemStyle: {
                  color: "rgba(4,196,255,1)",
                  normal: {
                    color: "rgb(19, 42, 64)",
                    borderColor: "rgba(4,196,255,1)",
                    borderWidth: 2,
                    lineStyle: {
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: "rgba(4,196,255,1)"
                    }
                  }
                },
                data: ylxcData
              },
              {
                name: "鸿佰洲",
                type: "line",
                // stack    : "总量",
                label: {
                  normal: {
                    show: true,
                    color: "rgba(149,64,255,1)",
                    position: "top"
                  }
                },
                areaStyle: {
                  normal: {
                    //color: '#9540FF' //改变区域颜色
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(149,64,255,1)"
                      },
                      {
                        offset: 0.05,
                        color: "rgba(149,64,255,0.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(149,64,255,0)"
                      }
                    ])
                  }
                },
                itemStyle: {
                  color: "rgba(149,64,255,1)",
                  normal: {
                    color: "rgba(19, 42, 64)",
                    borderColor: "rgba(149,64,255,1)",
                    borderWidth: 2,
                    lineStyle: {
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: "rgba(149,64,255,1)"
                    }
                  }
                },
                data: hbzData
              },
              {
                name: "朝霞",
                type: "line",
                // stack    : "总量",
                label: {
                  normal: {
                    show: true,
                    color: "rgba(111,223,28,1)",
                    position: "top"
                  }
                },
                areaStyle: {
                  normal: {
                    //color: '#6FDF1C',
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(111,223,28,1)"
                      },
                      {
                        offset: 0.05,
                        color: "rgba(111,223,28,0.5)"
                      },
                      {
                        offset: 1,
                        color: "rgba(111,223,28,0)"
                      }
                    ])
                  }
                },
                itemStyle: {
                  color: "rgba(111,223,28,1)",
                  normal: {
                    color: "rgba(19, 42, 64)",
                    borderColor: "rgba(111,223,28,1)",
                    borderWidth: 2,
                    lineStyle: {
                      // 系列级个性化折线样式
                      width: 2,
                      type: "solid",
                      color: "rgba(111,223,28,1)"
                    }
                  }
                },
                data: zxData
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
        }
      });
    },
    initChart2() {
      var zl = this.countYlxc;
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            // if(params.data.name!='剩余'){
            return params.data.name + params.data.value;
            // }
          }
        },
        grid: {
          left: "left",
          right: "4%",
          bottom: "10%",
          top: "top",
          containLabel: false
        },
        color: ["#04C4FF", "#00428E"],
        series: [
          {
            name: "男女占比",
            type: "pie",
            radius: ["56%", "80%"],
            avoidLabelOverlap: false,

            itemStyle: {
              normal: {
                borderWidth: 4,
                borderColor: "#132A40",
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            label: {
              normal: {
                position: "inner",
                show: false,
                color: "rgba(255,255,255,0)"
              }
            },

            data: this.dataYlxc
          }
        ]
      };

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main2"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initChart3() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryNumberOfNursingWorkers`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          var hgsl1 = [];
          var hgsl2 = [];
          var hgsl3 = [];
          var hgsl4 = [];

          for (var item of data) {
            if (item.count != 0) {
              hgsl3.push(item.count);
            }
          }

          var data3 = hgsl3.sort(function(a, b) {
            return b - a;
          });

          data3 = Number(data3[0]) + 60;

          for (var item of data) {
            if (item.count != 0) {
              hgsl1.push(item.org_name);
              hgsl2.push(item.count);
              hgsl4.push(data3);
            }
          }

          var data1 = hgsl1;
          var option = {
            tooltip: {
              formatter: function(data) {
                var result = "";
                for (var i = 0; i < data.length; i++) {
                  if (data[i].name == "value") {
                    result += data[i].name + ":" + data[i].value + "<br>";
                  } else {
                    result += data[i].name + ":" + data[i].value + "<br>";
                  }
                }
                return result;
              }
            },
            grid: {
              left: "5%",
              right: "2%",
              bottom: "3%",
              top: "10%",
              containLabel: true
            },
            xAxis: {
              type: "value",
              // boundaryGap: [0, 0.01],
              show: false
            },
            // 新加的
            dataZoom: [
              {
                yAxisIndex: 0,
                show: false,
                type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                startValue: 0, // 从头开始。
                endValue: 2 // 一次性展示五个。
              }
            ],
            yAxis: {
              type: "category",
              data: hgsl1,
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                formatter: function(value, index) {
                  if (value) {
                    var data = value.toString();
                    if (data.length >= 5) {
                      return data.slice(0, 5) + "..";
                    } else {
                      return value;
                    }
                  }
                },
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                  align: "left"
                  //baseline:'middle'
                }

                //   rotate: 40
              },
              offset: 92,
              splitLine: {
                show: false
              }
            },
            series: [
              {
                name: "所占比",
                type: "bar",
                data: hgsl2,
                // 动画运动速度
                animationDuration: 3000,
                label: {
                  normal: {
                    show: true,
                    formatter: "{c}",
                    position: "right"
                  }
                },
                barWidth: "50%",
                itemStyle: {
                  normal: {
                    label: {
                      show: true, //开启显示
                      position: "right", //在上方显示
                      textStyle: {
                        //数值样式
                        color: "#fff",
                        fontSize: 17
                      }
                    },
                    formatter: "{c}",
                    // 定制显示（按顺序）
                    color: function(params) {
                      var colorList = [
                        "#04C4FF",
                        "#9540FF",
                        "#6FDF1C",
                        "#04C4FF",
                        "#9540FF",
                        "#6FDF1C",
                        "#04C4FF",
                        "#9540FF",
                        "#6FDF1C"
                      ];
                      return colorList[params.dataIndex];
                    }
                  }
                }
              },
              {
                name: "所占比",
                type: "bar",
                barWidth: "50%",
                // barCategoryGap: "16px",
                data: hgsl4,
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
            document.getElementById("main3"),
            "walden"
          );
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
        }
      });
    },
    initChart4() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryMonthFeeChange`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var yfybh1 = [];
          var yfybh2 = [];
          var yfybh3 = [];

          for (var item of res.data.data) {
            yfybh1.push(item.balanceMonth.split("-")[1]);
            yfybh2.push(item.nursingCost);
          }

          for (var item of yfybh1) {
            if (item == "01") {
              yfybh3.push("1月");
            } else if (item == "02") {
              yfybh3.push("2月");
            } else if (item == "03") {
              yfybh3.push("3月");
            } else if (item == "04") {
              yfybh3.push("4月");
            } else if (item == "05") {
              yfybh3.push("5月");
            } else if (item == "06") {
              yfybh3.push("6月");
            } else if (item == "07") {
              yfybh3.push("7月");
            } else if (item == "08") {
              yfybh3.push("8月");
            } else if (item == "09") {
              yfybh3.push("9月");
            } else if (item == "10") {
              yfybh3.push("10月");
            } else if (item == "11") {
              yfybh3.push("11月");
            } else if (item == "12") {
              yfybh3.push("12月");
            }
          }

          this.nearFour=yfybh3;
          var data1 = yfybh1;
          var option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "none"
              },
              formatter: function(params) {
                return params[0].name + ": " + params[0].value;
              }
            },
            xAxis: {
              splitLine: { show: false },
              data: yfybh3,
              //max:10,
              axisTick: { show: false },
              axisLine: { show: false },
              axisLabel: {
                textStyle: {
                  color: "#ccc"
                }
              }
            },
            yAxis: {
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: { show: false },
              axisLabel: { show: false }
            },
            grid: {
              containLabel: true,
              top: "10%",
              bottom: "8%",
              left: "2%",
              right: "2%"
            },
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
            // color: ['#e54035'],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#00c3ff"
              },
              {
                offset: 0.5,
                color: "#00c3ff"
              },
              {
                offset: 1,
                color: "#5c4aba"
              }
            ]),
            series: [
              {
                name: "hill",
                type: "pictorialBar",
                barWidth: 80,
                label: {
                  normal: {
                    show: true,
                    color: "#04C4FF",
                    position: "top"
                  }
                },
                //barCategoryGap: '10%',
                // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
                symbol:
                  "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                itemStyle: {
                  normal: {
                    opacity: 1
                  },
                  emphasis: {
                    opacity: 1
                  }
                },
                data: yfybh2,
                z: 10
              },
              {
                name: "line",
                type: "line",
                smooth: true,
                itemStyle: {
                  color: "#04C4FF",
                  normal: {
                    color: "rgba(19, 42, 64, 1)",
                    borderColor: "#04C4FF",
                    borderWidth: 2,
                    lineStyle: {
                      type: "solid",
                      color: "#04C4FF"
                    }
                  }
                },
                data: yfybh2
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
          this.initChart1();

        } else {
          // this.number1 = '1666'
        }
      });
    },
    initChart5() {
      var zl = this.countHbz;
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            // if(params.data.name!='剩余'){
            return params.data.name + params.data.value;
            // }
          }
        },
        color: ["#9540FF", "#00428E"],
        series: [
          {
            name: "男女占比",
            type: "pie",
            radius: ["56%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              normal: {
                borderWidth: 4,
                borderColor: "#132A40",
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            label: {
              normal: {
                position: "inner",
                show: false,
                color: "rgba(255,255,255,0)"
              }
            },
            data: this.dataHbz
          }
        ]
      };

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main5"), "walden");
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    initChart6() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/dataVisualizationNursing/queryCheckInBed`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;

          this.dataYlxc = [];
          this.dataHbz = [];
          this.dataZx = [];
          this.dataKly = [];
          this.dataYlxccs = [];
          this.dataPjgsk = [];
          for (var item of data) {
            if (item.orgName == "义乌市怡乐新村养老服务中心") {
              this.countYlxc = item.count;
              this.dataYlxc.push(
                {
                  value: item.checkIn,
                  name: "怡乐新村",
                  label: {
                    normal: {
                      show: true
                    }
                  }
                },
                {
                  value: item.count - item.checkIn,
                  name: "剩余"
                }
              );
              this.ylxcCw = item.count;
              this.ylxcSy = item.checkIn;
              this.initChart2();
            } else if (item.orgName == "义乌市鸿佰洲养老服务中心") {
              this.countHbz = item.count;
              this.dataHbz.push(
                {
                  value: item.checkIn,
                  name: "鸿佰洲",
                  label: {
                    normal: {
                      show: true
                    }
                  }
                },
                {
                  value: item.count - item.checkIn,
                  name: "剩余"
                }
              );
              this.hbzCw = item.count;
              this.hbzSy = item.checkIn;
              this.initChart5();
            } else if (item.orgName == "义乌市朝霞养老服务中心") {
              this.countZx = item.count;
              this.dataZx.push(
                {
                  value: item.checkIn,
                  name: "朝霞",
                  label: {
                    normal: {
                      show: true
                    }
                  }
                },
                {
                  value: item.count - item.checkIn,
                  name: "剩余"
                }
              );
              this.zxCw = item.count;
              this.zxSy = item.checkIn;

              var zl = this.countZx;
              var option = {
                tooltip: {
                  trigger: "item",
                  formatter: function(params) {
                    // if(params.data.name!='剩余'){
                    return params.data.name + params.data.value;
                    // }
                  }
                },
                color: ["#6FDF1C", "#00428E"],
                series: [
                  {
                    name: "男女占比",
                    type: "pie",
                    radius: ["56%", "80%"],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      normal: {
                        borderWidth: 4,
                        borderColor: "#132A40",
                        label: {
                          show: false
                        },
                        labelLine: {
                          show: false
                        }
                      }
                    },
                    label: {
                      normal: {
                        position: "inner",
                        show: false,
                        color: "rgba(255,255,255,0)"
                      }
                    },
                    data: this.dataZx
                  }
                ]
              };

              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById("main6"));
              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
            }
          }
        } else {
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

