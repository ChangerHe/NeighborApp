import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import fetch from '../../utils/request'

import './index.scss'

/**
 * problem collection:
 * 1. cannot support svg image in native platform
 * 2. cannot support box-sizing style
 * 3. text-align in View is usefull in h5/weapp bus useless in rn, line-height so too, cannot support single line ellipsis
 * 4. expo send package must over the wall
 * 5. weapp is limits 2m memory, so images must be uploaded
 */

/**
 * things todo
 * 1. auto upload images and transform image url
 * 2. add global sass variables and mixins
 */

// import ICON_SEARCH from '@/assets/images/search.svg'
// import ICON_CARD from '@/assets/images/tools_card.svg'
// import ICON_SCAN from '@/assets/images/tools_scan.svg'
// import AD_BBQ from '@/assets/images/ad-bbq.png'
// import AD_WASHCARD from '@/assets/images/ad-washcard.jpg'
// import AD_BLUEBERRY from '@/assets/images/ad-blueberry.jpg'
// import CAT_FRUITS from '@/assets/images/cat_fruits.png'
// import CAT_MILK from '@/assets/images/cat_milk.png'
// import DELE_PHOTO from '@/assets/images/delegation_photo.png'

const ICON_SEARCH = 'https://img.4009515151.com/search.png'
const ICON_CARD = 'https://img.4009515151.com/tools_card.png'
const ICON_SCAN = 'https://img.4009515151.com/tools_scan.png'
const ICON_CORNER = 'https://img.4009515151.com/icon_corner_4.png'
const AD_BBQ = 'https://img.4009515151.com/ad-bbq.png'
const AD_WASHCARD = 'https://img.4009515151.com/ad-washcard.jpg'
const AD_BLUEBERRY = 'https://img.4009515151.com/ad-blueberry.jpg'
const CAT_FRUITS = 'https://img.4009515151.com/cat_fruits.png'
const CAT_MILK = 'https://img.4009515151.com/cat_milk.png'
const DELE_PHOTO = 'https://img.4009515151.com/delegation_photo.png'
const AD_BOTTOM = 'https://img.4009515151.com/ad_bottom.png'

import CategoryCard from './CategoryCard'
import IntroCard from './IntroCard'
import DelegationCard from './DelegationCard'
import BlockTitle from './BlockTitle'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  },
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  category: any,
  introGoodsList: any,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    categoryList: [],
    introGoodsList: [],
    delegationList: []
  }

  componentWillReceiveProps (nextProps: any) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getIntroList()
    this.getDelegationList()
    this.getCategoryList()
  }

  componentDidHide () { }

  getIntroList() {
    fetch({
      url: '/intro'
    }).then((data) => {
      this.setState({
        introGoodsList: data
      })
    })
  }

  getDelegationList() {
    fetch({
      url: '/delegation'
    }).then((data) => {
      this.setState({
        delegationList: data
      })
    })
  }

  getCategoryList() {
    fetch({
      url: '/category'
    }).then((data) => {
      this.setState({
        categoryList: data
      })
    })
  }

  render () {
    const { categoryList, introGoodsList, delegationList } = this.state
    return (
      <View className='index'>
        <View className='index-search'>
          <View className='index-searcher'>
            <View className='index-scaner'>
              <Image className='index-scaner-icon' src={ICON_SEARCH} />
            </View>
            <View className='index-desc'><Text className='index-desc-text'>搜索商品</Text></View>
          </View>
          <View className='index-pig'>
            <Image className='index-icon' src={ICON_CARD} />
          </View>
          <View className='index-cart'>
            <Image className='index-icon' src={ICON_SCAN} />
          </View>
        </View>
        <Swiper
          className='index-ad-swiper'
          indicatorColor='rgba(0,0,0,.4)'
          indicatorActiveColor='#fff'
          // vertical
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='index-swiper-item'>
              <Image className='index-swiper-img' src={AD_BBQ} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='index-swiper-item'>
              <Image className='index-swiper-img' src={AD_WASHCARD} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='index-swiper-item'>
              <Image className='index-swiper-img' src={AD_BLUEBERRY} />
            </View>
          </SwiperItem>
        </Swiper>
        <View className='index-category'>
          {
            categoryList.map((v, i) => <CategoryCard key={i} icon={v.img} desc={v.desc} />)
          }
        </View>
        <View className="index-intro-goods">
          <BlockTitle title="推荐商品" subtitle="甄选好物 品质生活" />
          <ScrollView scrollX>
            <View className="index-goods-wrapper">
              {
                introGoodsList.map((v, i) => <IntroCard key={i} icon={v.img} desc={v.desc} />)
              }
            </View>
          </ScrollView>
        </View>
        <View className="index-delegation">
          <BlockTitle title="邻居一起来" subtitle="家乡味，唤醒每一个味蕾" />
          <ScrollView scrollX>
            <View className="index-goods-wrapper">
              {
                delegationList.map((v, i) => <DelegationCard key={i} img={v.img} desc={v.desc} time={v.time} hadGroupedNum={v.hadGroupedNum} groupingNum={v.groupingNum} price={v.price} />)
                // can't support 
                // delegationList.map((v, i) => <DelegationCard key={i} {...v} />)
              }
            </View>
          </ScrollView>
        </View>
        <View className="index-ad">
          <Image className="index-ad-img" src={AD_BOTTOM} />
        </View>
        <View className="index-youling-badge">
          <View className="index-rank">
            <Image className="index-rank-img" src={ICON_CORNER} />
            <View className="index-rank-detail">
              <View className="index-rank-detail-num">
                <Text className="index-rank-detail-num-text">12</Text>
              </View>
              <View className="index-rank-detail-desc">
                <Text className="index-rank-detail-desc-text">全国排名</Text>
              </View>
            </View>
          </View>
          <View className="index-total-num">
            <View className="index-line"></View>
            <View className="index-total-num-num">
              <Text className="index-total-num-num-text">6421.92</Text>
            </View>
            <View className="index-total-num-desc">
              <Text className="index-total-num-desc-text">本社区友邻计划募集额(元)</Text>
            </View>
          </View>
          <View className="index-youling-desc">
            <Text className="index-youling-desc-text">“友邻计划”是指物业公司将在社区内开展邻里团购等有偿服务所产生的利润，以捐赠、赞助等方式投入到社区硬件常新及邻里文化建设两大领域。它并非某种基金，而是旨在汇聚友邻的共同行动，让社区变得更好</Text>
          </View>
          <View className="index-youling-detail">
            <Text className="index-youling-detail-text">查看更多详情</Text>
          </View>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
