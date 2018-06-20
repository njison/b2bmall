<template>
  <div>
    <y-header>
      <div slot="nav"></div>
    </y-header>
  <div class="goods">
    <div class="nav-subs">
      <div class="nav-sub-bgs"></div>
      <div class="nav-sub-wrappers">
        <div class="w">
          <ul class="nav-lists">
            <li>
              <router-link to="/">
                <a>首页</a>
              </router-link>
            </li>
            <li>
              <a class="active">搜索结果</a>
            </li>
            <li>
              <a v-if="searching === true">拼命搜索中...</a>
              <a v-if="searching === false">共为您找到 {{total}} 款商品信息</a>
            </li>
          </ul>
          <div></div>
        </div>
      </div>
    </div>
    <div >
      <div class="nav-subs-brand">
        <div class="nav-sub-bgs"></div>
        <div class="nav-sub-wrappers">
          <div class="w"  >
            <div class="searchType">  品牌：</div>
            <div style="float: left;width: 100%">
              <ul class="nav-lists">
                <div :class='{showAll:isshowBrand==true}' class="searchNav">
                  <li v-for="(key,value) in brandList" class="searchTitle"
                      :class="{ selectedBrand: key.brandId == selectedBrandId }">{{ key.valueDesc }}
                </li>
                </div>
              </ul>
            </div>
            <div v-if="brandList.length>10">
              <div  v-if="isshowBrand==false" class="searchMOre showMore" @click="showAll(1)">更多></div>
              <div  v-if="isshowBrand==true" class="searchMOre showMore" @click="closeShow(1)">收起></div>
            </div>

          </div>
        </div>
      </div>
      <div class="nav-subs-brand">
        <div class="nav-sub-bgs"></div>
        <div class="nav-sub-wrappers">
          <div class="w"  >
            <div class="searchType">  供货商：</div>
            <div style="float: left;width: 90%">
              <ul class="nav-lists">
                <div :class='{showAll:isshowVendor==true}' class="searchNav">
                  <li v-for="(key,value) in vendorList" class="searchTitle"
                      :class="{ selected: key.vendorId == selectedVendorId }"
                      @click="selectByVendor(key.vendorId)">{{ key.venderName }}</li>
                </div>
              </ul>
            </div>
            <div v-if="vendorList.length>10">
              <div  v-if="isshowVendor==false" class="searchMOre showMore" @click="showAll(2)">更多></div>
              <div  v-if="isshowVendor==true" class="searchMOre showMore" @click="closeShow(2)">收起></div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="nav-subs-brand">-->
        <!--<div class="nav-sub-bgs"></div>-->
        <!--<div class="nav-sub-wrappers">-->
          <!--<div class="w">-->
            <!--<ul class="nav-lists">-->
              <!--<li> 供货商：</li>-->
              <!--<div >-->
                <!--<li v-for="(item,i) in vendorList" :key="i"  style="margin-left: 20px"  @click="selectByVendor(item.vendorId)">-->
                  <!--<a  v-bind:class="{ selected: item.vendorId == selectedVendorId }">{{ item.vendorName }} </a>-->
                <!--</li>-->
              <!--</div>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div class="nav">
      <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min">
          <span style="margin: 0 5px"> - </span>
          <input type="number" placeholder="价格" v-model="max">
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div>
      </div>
    </div>

    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <div  class="img-item" v-if="!noResult" >
        <!--商品-->
        <div class="goods-box w">
          <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
        </div>
        <el-pagination
          v-if="!noResult&&!error"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="no-info" v-if="noResult" >
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br> 抱歉！没有为您找到相关的商品
        </div>
      </div>
     <!-- <div class="no-info" v-if="error">
        <div class="no-data">
          <img src="/static/images/error.png">
          <br> 抱歉！出错了...
        </div>
        <section class="section">
          <y-shelf :title="recommendPanel.name">
            <div slot="content" class="recommend">
              <mall-goods :msg="item" v-for="(item,i) in recommendPanel.panelContents" :key="i"></mall-goods>
            </div>
          </y-shelf>
        </section>
      </div>-->
    </div>
  </div>
 <y-footer></y-footer>
  </div>
</template>
<script>
  import { getSearch, getVendor, getBrand } from '/api/goods.js'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  import YShelf from '/components/shelf'
  import YHeader from '/common/header'
  import YFooter from '/common/footer'
  export default {
    data () {
      return {
        goods: [],
        isclick: false,
        noResult: false,
        error: false,
        min: '',
        max: '',
        loading: false,
        searching: false,
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        sort: '',
        currentPage: 1,
        pageSize: 20,
        total: 0,
        key: '',
        brandList: [],
        vendorList: [],
        brandId: '',
        vendorId: '',
        skuType: '',
        orgId: '',
        selectedVendorId: '0',
        selectedBrandId: '0',
        isshowBrand: false,
        isshowVendor: false
      }
    },
    methods: {
      closeShow (i) {
        if (i==1 ) {
          this.isshowBrand = false
        } else if(i==2){
          this.isshowVendor = false
        }
      },
      showAll (i) {
          if(i==1){
            this.isshowBrand = true
          }else if(i==2){
            this.isshowVendor = true
          }

      },
      handleSizeChange (val) {
        this.pageSize = val
        this._getSearch()
        this.loading = true
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._getSearch()
        this.loading = true
      },
      _getSearch () {
        let params = {
          searchType: 'ES_SQL_SEARCH_GOODS',
          searchValue: this.key

        }
        getSearch(params).then(res => {
          if ( res.code == 'success') {
            this.goods = res.list
            this.total = res.list.length
            this.noResult = false
            if (this.total === 0) {
              this.noResult = true
            }
            this.error = false
          } else {
            this.error = true
          }
          this.loading = false
          this.searching = false
        })
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this.loading = true
        this._getSearch()
      },
      // 价格排序
      sortByPrice (v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.sort = v
        this.currentPage = 1
        this.loading = true
        this._getSearch()
      },

      // 按品牌查询
      selectByBrand (brandId) {
        this.selectedBrandId=brandId
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this.brandId = brandId
        this.loading = true
        this._getSearch()
      },
      // 按供货商查询
      selectByVendor (vendorId) {
        this.selectedVendorId=vendorId
        this.sortType = 1
        this.sort = ''
        this.currentPage = 1
        this.vendorId = vendorId
        this.loading = true
        this._getSearch()
      },
      _getBrand () {
        let params = {
          dcName:"DIC_BRAND"
        }
        getBrand(params).then(res => {
          if (res.code === 'success') {
            this.brandList = res.dcDataMap.DIC_BRAND
          }
        })
      },
      _getVendor () {
        let params = {
          vender: {
            vendorType: 1
          }

        }
        getVendor(params).then(res => {
          if (res.code === 'success') {
            this.vendorList = res.venders
          }
        })
      }
    },
    created () {

    },
    mounted () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidthcartList
      this.key = this.$route.query.key

      this.$nextTick(function () {
        this._getSearch()
        this._getBrand()
        this._getVendor()
/*        recommend().then(res => {
          let data = res.result
          this.recommendPanel = data[0]
        })*/
      })
    },
    components: {
      mallGoods,
      YButton,
      YShelf,
      YHeader,
      YFooter
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .selected
  {
    background-color: #5683EA;
    color:white;
  }
  .selectedBrand
  {
    background-color: #5683EA;
    color:white;
  }
  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }

  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }

  .nav-subs {
    /*position: relative;*/
   //margin-top: -40px;
    margin-top: 0px;
    z-index: 20;
    height: 90px;
    background: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .04);
    .nav-sub-wrappers {
      padding: 31px 0;
      height: 90px;
      /*position: relative;*/
    }
    .w {
      display: flex;
      justify-content: space-between;
    }
    .nav-lists {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      height: 100%;
      li:first-child {
        padding-left: 0;
        a {
          padding-left: 10px;
        }
      }
      li {
        /*position: relative;*/
        float: left;
        /*padding-left: 2px;*/
        a {
          display: block;
          // cursor: default;
          padding: 0 10px;
          color: #666;
          &.active {
            font-weight: bold;
          }
        }
        a:hover {
          color: #5683EA;
        }
      }
      li:before {
        content: ' ';
        /*position: absolute;*/
        left: 0;
        top: 13px;
        width: 2px;
        height: 2px;
        background: #bdbdbd;
      }
    }
  }





  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }

  .section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
  }

  @media (min-width: 1px) {
    .nav-subs .nav-sub-wrappers:after {
      display: block;
    }
  }

  .recommend {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .img-item{
    display: flex;
    flex-direction: column;
  }

  .el-pagination{
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
  }



  .nav-subs-brand {
    border-bottom: 1px dashed rgb(153, 153, 153);
    width: 90%;
    margin: auto;
    /*position: relative;*/
    //margin-top: -40px;
    margin-top: 0px;
    z-index: 20;
    /*height: 50px;*/
    overflow: hidden;
    line-height: 50px;
    /*background: #ededed;*/

    .nav-sub-wrappers {
      padding: 5px 0;
      /*height: 50px;*/
      /*position: relative;*/
    }
    .w {
      display: flex;
      justify-content: space-between;
    }
    .nav-lists {
      /*height: 28px;*/
      /*line-height: 28px;*/
      display: flex;
      align-items: center;
      height: 100%;
      li:first-child {
        /*padding-left: 0;*/
        a {
          /*padding-left: 10px;*/
        }

      }
      li {
        /*position: relative;*/
        float: left;
        /*padding-left: 2px;*/
        list-style-type:none;
        a {
          display: block;
          // cursor: default;
          padding: 0 10px;
          color: #666;
          &.active {
            font-weight: bold;
          }
          isclick-style {
            background-color: #5683EA;
            color:white;
          }
          noclick {
            color:#5683EA;
          }
        }
        a:hover {
          background-color: #5683EA;
          color:white;
        }

      }
      li:before {
        content: ' ';
        /*position: absolute;*/
        left: 0;
        top: 13px;
        width: 2px;
        height: 2px;
        background: #bdbdbd;
      }
    }
  }
  .searchNav{
    height:50px;
    overflow: hidden;
    line-height: 40px;
    width: 90%;
    padding: 10px 0;
  }
  .searchType{
    float: left;width: 100px;position: relative;top: 6px;text-align: right
  }
  .showAll{
    padding: 5px;
    height: auto;
    min-height:50px;
    /*overflow: auto;*/
  }
  .showMore{
    float: left;width: 130px;position: relative;top: 6px;
  }
  .searchMOre{
    color:#5683EA;
    margin-left:30px;
    cursor:pointer;
    padding: 0;
  }
  .searchTitle{
    color:#5683EA;
    margin-left:30px;
    cursor:pointer;
    padding: 0;
  }
  .searchTitle:first-child{
    background-color: #5683EA;
    padding: 0px 15px;
    color:white;
  }

</style>
