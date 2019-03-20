import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

type PageOwnProps = {
  img: any,
  time: number,
  hadGroupedNum: number,
  groupingNum: number,
  desc: string,
  price: number,
}

type PageState = {}

interface DelegationCard {
  props: PageOwnProps;
}

class DelegationCard extends Component {
  render() {
    const { img, desc, time, hadGroupedNum, groupingNum, price } = this.props;
    console.log(this.props, 'this.props')
    return (
      <View className="delegation-card">
        <Image className="delegation-img" src={img} />
        <View className="price">
          <Text>¥ {price}</Text>
        </View>
        <View className="time">
          <View className="block desc">
            <Text>剩余时间</Text>
          </View>
          <View className="block interval">
            <View className="num"><Text>01</Text></View>
            <View className="unit"><Text>天</Text></View>
          </View>
          <View className="block interval">
            <View className="num"><Text>23</Text></View>
            <View className="unit"><Text>时</Text></View>
          </View>
          <View className="block interval">
            <View className="num"><Text>41</Text></View>
            <View className="unit"><Text>分</Text></View>
          </View>
        </View>
        <View className="delegation-desc">
          <View className="desc">
            <View className="title">
              <Text>{desc}</Text>
            </View>
            <View className="situation">
              <Text>20位邻居成团 · 已参团78位邻居</Text>
            </View>
          </View>
          <View className="join">
            <Text>参团</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default DelegationCard as ComponentClass<PageOwnProps, PageState>