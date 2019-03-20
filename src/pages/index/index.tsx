import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

import ICON_SEARCH from '@/assets/images/search.svg';
import ICON_CARD from '@/assets/images/tools_card.svg';
import ICON_SCAN from '@/assets/images/tools_scan.svg';
import AD_BBQ from '@/assets/images/ad-bbq.png';
import AD_WASHCARD from '@/assets/images/ad-washcard.jpg';
import AD_BLUEBERRY from '@/assets/images/ad-blueberry.jpg';
import CAT_FRUITS from '@/assets/images/cat_fruits.png';
import CAT_MILK from '@/assets/images/cat_milk.png';

import CategoryCard from './CategoryCard';

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
  category: any
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
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
    category: [{
      img: CAT_FRUITS,
      desc: '好食'
    }, {
      img: CAT_MILK,
      desc: '喝水'
    }, {
      img: CAT_FRUITS,
      desc: '好食'
    }, {
      img: CAT_MILK,
      desc: '喝水'
    }, {
      img: CAT_FRUITS,
      desc: '好食'
    }, {
      img: CAT_MILK,
      desc: '喝水'
    }, {
      img: CAT_FRUITS,
      desc: '好食'
    }, {
      img: CAT_MILK,
      desc: '喝水'
    }, {
      img: CAT_FRUITS,
      desc: '好食'
    }, {
      img: CAT_MILK,
      desc: '喝水'
    }]
  }

  componentWillReceiveProps (nextProps: any) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { category } = this.state
    return (
      <View className='index'>
        <View className='search'>
          <View className='searcher'>
            <View className='scaner'>
              <Image className='icon' src={ICON_SEARCH} />
            </View>
            <View className='desc'>搜索商品</View>
          </View>
          <View className='pig'>
            <Image className='icon' src={ICON_CARD} />
          </View>
          <View className='cart'>
            <Image className='icon' src={ICON_SCAN} />
          </View>
        </View>
        <Swiper
          className='ad-swiper'
          indicatorColor='rgba(0,0,0,.4)'
          indicatorActiveColor='#fff'
          // vertical
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='swiper-item'>
              <Image className='swiper-img' src={AD_BBQ} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>
              <Image className='swiper-img' src={AD_WASHCARD} />
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>
              <Image className='swiper-img' src={AD_BLUEBERRY} />
            </View>
          </SwiperItem>
        </Swiper>
        <View className='category'>
          {
            category.map((v) => <CategoryCard icon={v.img} desc={v.desc} />)
          }
          
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
