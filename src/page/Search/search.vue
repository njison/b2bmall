<!--<script src="../../../../../../project/dianduidian/vue_vue/src/main.js"></script>-->
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
      <!--根据品牌搜索-->
      <div class="nav-subs-brand">
        <div class="nav-sub-bgs"></div>
        <div class="nav-sub-wrappers">
          <div class="w"  >
            <div class="searchType">  品牌：</div>
            <div style="float: left;width: 100%;">
              <ul class="nav-lists">
                <div :class='{showAll:isshowBrand==true}' class="searchNav">
                  <li :class="{ selectedBrand: selectAllBrand == true }" class="searchTitle" @click="searchALlBrand">全部</li>
                  <li v-for="(key,value) in brandList" class="searchTitle"
                      :class="{ selectedBrand: key.value == selectedBrandId }"
                      @click="selectByBrand(key.value)">{{ key.valueDesc }}
                </li>
                </div>
              </ul>
            </div>
            <div style="width: 100px">
              <div v-if="brandList.length>4">
                <div  v-if="isshowBrand==false" class="searchMOre showMore" @click="showAll(1)">更多></div>
                <div  v-if="isshowBrand==true" class="searchMOre showMore" @click="closeShow(1)">收起></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--根据供货商搜索-->
      <div class="nav-subs-brand">
        <div class="nav-sub-bgs"></div>
        <div class="nav-sub-wrappers">
          <div class="w"  >
            <div class="searchType">  供货商：</div>
            <div style="float: left;width: 100%;">
              <ul class="nav-lists">
                <div :class='{showAll:isshowVendor==true}' class="searchNav">
                  <li :class="{ selectedBrand: selectAllVendor == true }" class="searchTitle" @click="searchALlVendor">全部</li>
                  <li v-for="(key,value) in vendorList" class="searchTitle"
                      :class="{ selected: key.venderId == selectedVendorId }"
                      @click="selectByVendor(key.venderId)">{{ key.venderName }}</li>
                </div>
              </ul>
            </div>
            <div style="width: 100px">
              <div v-if="vendorList.length>4">
                <div  v-if="isshowVendor==false" class="searchMOre showMore" @click="showAll(2)">更多></div>
                <div  v-if="isshowVendor==true" class="searchMOre showMore" @click="closeShow(2)">收起></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--&lt;!&ndash;屏幕尺寸&ndash;&gt;-->
      <!--<div class="nav-subs-brand">-->
        <!--<div class="nav-sub-bgs"></div>-->
        <!--<div class="nav-sub-wrappers">-->
          <!--<div class="w"  >-->
            <!--<div class="searchType">  屏幕尺寸：</div>-->
            <!--<div style="float: left;width: 100%;">-->
              <!--<ul class="nav-lists">-->
                <!--<div :class='{showAll:isshowVendor==true}' class="searchNav">-->
                  <!--<li :class="{ selectedBrand: selectAllVendor == true }" class="searchTitle" @click="searchALlVendor">全部</li>-->
                  <!--&lt;!&ndash;<li v-for="(key,value) in vendorList" class="searchTitle"&ndash;&gt;-->
                      <!--&lt;!&ndash;:class="{ selected: key.venderId == selectedVendorId }"&ndash;&gt;-->
                      <!--&lt;!&ndash;@click="selectByVendor(key.venderId)">{{ key.venderName }}</li>&ndash;&gt;-->
                <!--</div>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div style="width: 100px">-->
              <!--<div v-if="vendorList.length>4">-->
                <!--<div  v-if="isshowVendor==false" class="searchMOre showMore" @click="showAll(2)">更多></div>-->
                <!--<div  v-if="isshowVendor==true" class="searchMOre showMore" @click="closeShow(2)">收起></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;运行内存&ndash;&gt;-->
      <!--<div class="nav-subs-brand">-->
        <!--<div class="nav-sub-bgs"></div>-->
        <!--<div class="nav-sub-wrappers">-->
          <!--<div class="w"  >-->
            <!--<div class="searchType">  运行内存：</div>-->
            <!--<div style="float: left;width: 100%;">-->
              <!--<ul class="nav-lists">-->
                <!--<div :class='{showAll:isshowVendor==true}' class="searchNav">-->
                  <!--<li :class="{ selectedBrand: selectAllVendor == true }" class="searchTitle" @click="searchALlVendor">全部</li>-->
                  <!--&lt;!&ndash;<li v-for="(key,value) in vendorList" class="searchTitle"&ndash;&gt;-->
                      <!--&lt;!&ndash;:class="{ selected: key.venderId == selectedVendorId }"&ndash;&gt;-->
                      <!--&lt;!&ndash;@click="selectByVendor(key.venderId)">{{ key.venderName }}</li>&ndash;&gt;-->
                <!--</div>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div style="width: 100px">-->
              <!--<div v-if="vendorList.length>4">-->
                <!--<div  v-if="isshowVendor==false" class="searchMOre showMore" @click="showAll(2)">更多></div>-->
                <!--<div  v-if="isshowVendor==true" class="searchMOre showMore" @click="closeShow(2)">收起></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;机身内存&ndash;&gt;-->
      <!--<div class="nav-subs-brand">-->
        <!--<div class="nav-sub-bgs"></div>-->
        <!--<div class="nav-sub-wrappers">-->
          <!--<div class="w"  >-->
            <!--<div class="searchType">  机身内存：</div>-->
            <!--<div style="float: left;width: 100%;">-->
              <!--<ul class="nav-lists">-->
                <!--<div :class='{showAll:isshowVendor==true}' class="searchNav">-->
                  <!--<li :class="{ selectedBrand: selectAllVendor == true }" class="searchTitle" @click="searchALlVendor">全部</li>-->
                  <!--&lt;!&ndash;<li v-for="(key,value) in vendorList" class="searchTitle"&ndash;&gt;-->
                      <!--&lt;!&ndash;:class="{ selected: key.venderId == selectedVendorId }"&ndash;&gt;-->
                      <!--&lt;!&ndash;@click="selectByVendor(key.venderId)">{{ key.venderName }}</li>&ndash;&gt;-->
                <!--</div>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div style="width: 100px">-->
              <!--<div v-if="vendorList.length>4">-->
                <!--<div  v-if="isshowVendor==false" class="searchMOre showMore" @click="showAll(2)">更多></div>-->
                <!--<div  v-if="isshowVendor==true" class="searchMOre showMore" @click="closeShow(2)">收起></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;CPU核数&ndash;&gt;-->
      <!--<div class="nav-subs-brand">-->
        <!--<div class="nav-sub-bgs"></div>-->
        <!--<div class="nav-sub-wrappers">-->
          <!--<div class="w"  >-->
            <!--<div class="searchType">  CPU核数：</div>-->
            <!--<div style="float: left;width: 100%;">-->
              <!--<ul class="nav-lists">-->
                <!--<div :class='{showAll:isshowVendor==true}' class="searchNav">-->
                  <!--<li :class="{ selectedBrand: selectAllVendor == true }" class="searchTitle" @click="searchALlVendor">全部</li>-->
                  <!--&lt;!&ndash;<li v-for="(key,value) in vendorList" class="searchTitle"&ndash;&gt;-->
                      <!--&lt;!&ndash;:class="{ selected: key.venderId == selectedVendorId }"&ndash;&gt;-->
                      <!--&lt;!&ndash;@click="selectByVendor(key.venderId)">{{ key.venderName }}</li>&ndash;&gt;-->
                <!--</div>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div style="width: 100px">-->
              <!--<div v-if="vendorList.length>4">-->
                <!--<div  v-if="isshowVendor==false" class="searchMOre showMore" @click="showAll(2)">更多></div>-->
                <!--<div  v-if="isshowVendor==true" class="searchMOre showMore" @click="closeShow(2)">收起></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="nav">
      <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sortByPrice(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>
        <a href="javascript:;" @click="sortBysale" :class="{active:sortType===4}">销量排行</a>
      </div>
    </div>

    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <div  class="img-item" v-if="!noResult" >
        <!--商品-->
        <div class="goods-box w">
          <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>

        </div>
        <div style="clear: both"></div>
        <div style="width: 1220px;margin:0 auto;">
          <div style="float:right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>

      </div>
      <div class="no-info" v-if="noResult" >
        <div class="no-data">
          <img src="../../../static/images/no-search.png">
          <br> 抱歉！没有为您找到相关的商品
        </div>
      </div>
    </div>

  </div>
    <div style="width: 100%;clear: both"></div>

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
        pageSize: 16,
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
        isshowVendor: false,
        selectAllBrand: true,
        selectAllVendor: true,
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this._getSearch()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._getSearch()
      },
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
          searchValue: this.key,
          size: this.pageSize,
          from: this.currentPage

        }
        getSearch(params).then(res => {
          if(res){
            if ( res.code == 'success') {
              this.goods = res.list
              this.total = res.total
              this.noResult = false
              if (this.total === 0) {
                this.noResult = true
              }
              this.error = false
            } else {
              this.noResult = true
              this.error = true
            }
            this.loading = false
            this.searching = false
          }
        })
      },
      // 默认排序
      reset () {
        this.sortType=1
        this.selectAllBrand = true
        this.selectAllVendor = true
        this.selectedVendorId = ''
        this.selectedBrandId = ''
        this._getSearch()
      },
      // 价格排序
      sortByPrice (v) {
        if (v == 1) {
          this.sortType = 2
          function compare (property) {
            return function (a, b) {
              var value1 = a[property]
              var value2 = b[property]
              return value1 - value2//价由高到低
            }
          }
          return this.goods.sort(compare('goodsSettlePrice'));
        } else if (v == -1) {
          this.sortType = 3
          function compare (property) {
            return function (a, b) {
              var value1 = a[property]
              var value2 = b[property]
              return value2 - value1 // 价由低到高
            }
          }
          return this.goods.sort(compare('goodsSettlePrice'))
        }
      },
      // 销量排序
      sortBysale () {
        this.sortType = 4
        function compare (property) {
          return function (a, b) {
            var value1 = a[property]
            var value2 = b[property]
            return value1 - value2
          }
        }
        return this.goods.sort(compare('goodsSales'))
      },
      // 查询所有品牌商
      searchALlBrand () {
        this.selectedBrandId = ''
        this.selectAllBrand = true
        this.loading = true
        this.brandId = ''
        let isNull = ''
//       / console.log('查询所有品牌商,vendorId=' + this.vendorId)
        if (this.vendorId) {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
//              brandId: '',
              venderId: this.vendorId
            }
          }
          isNull = params
        } else {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
//              brandId: ''
            }
          }
          isNull = params
        }
        getSearch(isNull).then(res => {
          if(res){
            if ( res.code == 'success') {
              this.goods = res.list
              this.total = res.list.length
              this.noResult = false
              if (this.total === 0) {
                this.noResult = true
              }
              this.error = false
            } else {
              this.noResult = true
              this.error = true
            }
            this.loading = false
            this.searching = false
          }
        })
      },
      // 按品牌查询
      selectByBrand (value) {
        this.selectAllBrand = false
        this.selectedBrandId = value
        this.brandId = value
        this.loading = true
        let isNull = ''
//        console.log('按品牌查询,vendorId='+this.vendorId)
        if (this.vendorId) {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
              venderId: this.vendorId,
              brandId: this.brandId
            }
          }
          isNull = params
        } else {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
              brandId: this.brandId
            }
          }
          isNull = params
        }
        getSearch(isNull).then(res => {
          if(res){
            if ( res.code == 'success') {
              this.goods = res.list
              this.total = res.list.length
              this.noResult = false
              if (this.total === 0) {
                this.noResult = true
              }
              this.error = false
            } else {
              this.noResult = true
              this.error = true
            }
            this.loading = false
            this.searching = false
          }
        })
      },
      // 按所有供货商查询
      searchALlVendor () {
        this.selectAllVendor = true
        this.selectedVendorId = ''
        this.loading = true
        this.vendorId = ''
        let isNull = ''
//        console.log('按所有供货商查询,brandId='+this.brandId)
        if (this.brandId) {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
              brandId: this.brandId
//              venderId: ''
            }
          }
          isNull = params
        } else {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
//              venderId: ''
            }
          }
          isNull = params
        }
        getSearch(isNull).then(res => {
          if(res){
            if (res.code == 'success') {
              this.goods = res.list
              this.total = res.list.length
              this.noResult = false
              if (this.total === 0) {
                this.noResult = true
              }
              this.error = false
            } else {
              this.noResult = true
              this.error = true
            }
            this.loading = false
            this.searching = false
          }
        })
      },
      // 按供货商查询
      selectByVendor (venderId) {
        this.selectAllVendor = false
        this.selectedVendorId = venderId
        this.vendorId = venderId
        this.loading = true
        let isNull = ''
//        console.log('按供货商查询,brandId='+this.brandId)
        if (this.brandId) {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
              venderId: this.vendorId,
              brandId: this.brandId
            }
          }
          isNull = params
        } else {
          let params = {
            searchType: 'ES_SQL_MULTI_SEARCH',
            searchValue: '',
            esGoodsDto: {
              venderId: this.vendorId
            }
          }
          isNull = params
        }
        getSearch(isNull).then(res => {
          if(res){
            if ( res.code == 'success') {
              this.goods = res.list
              this.total = res.list.length
              this.noResult = false
              if (this.total === 0) {
                this.noResult = true
              }
              this.error = false
            } else {
              this.noResult = true
              this.error = true
            }
            this.loading = false
            this.searching = false
          }
        })
      },
      // 品牌列表
      _getBrand () {
        let params = {
          dcName:"DIC_BRAND"
        }
        getBrand(params).then(res => {
          if(res){
            if (res.code === 'success') {
              this.brandList = res.dcDataMap.DIC_BRAND
            }
          }
        })
      },
      // 供货商列表
      _getVendor () {
        let params = {
          vender: {
            vendorType: 1
          }

        }
        getVendor(params).then(res => {
          if(res){
            if (res.code === 'success') {
              this.vendorList = res.venders
            }
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
      this.brandId = this.$route.query.vendorId
      if (this.brandId) {
        this.selectByBrand(this.brandId)
      } else {
        this._getSearch()
      }

      this._getBrand()
      this._getVendor()
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
    /*padding: 5px;*/
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
    padding: 0 15px;
  }
  /*.searchTitle:first-child{*/
    /*background-color: #5683EA;*/
    /*padding: 0px 15px;*/
    /*color:white;*/
  /*}*/
  .selected
  {
    background-color: #5683EA;
    color:white;
    padding: 0px 15px;
  }
  .selectedBrand
  {
    background-color: #5683EA;
    color:white;
    padding: 0px 15px;
  }
  .el-pagination{
    margin: 3vw 0vw 2vw;
  }
</style>
