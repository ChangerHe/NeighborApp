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
    return (
      <View className="delegation-card">
        <Image className="delegation-card-img" src={img} />
        <View className="delegation-card-price">
          <Text className="delegation-card-price-text">¥ {price}</Text>
        </View>
        <View className="delegation-card-time">
          <View className="delegation-card-time-desc">
            <View className="delegation-card-time-desc-wrapper">
              <Text className="delegation-card-time-desc-text">剩余时间</Text>
            </View>
          </View>
          <View className="delegation-card-time-interval">
            <View className="delegation-card-time-desc-interval-wrapper">
              <View className="delegation-card-interval-num">
                <Text className="delegation-card-interval-num-text">01</Text>
              </View>
              <View className="delegation-card-interval-unit">
                <Text className="delegation-card-interval-unit-text">天</Text>
              </View>
            </View>
          </View>
          <View className="delegation-card-time-interval">
            <View className="delegation-card-time-desc-interval-wrapper">
              <View className="delegation-card-interval-num">
                <Text className="delegation-card-interval-num-text">20</Text>
              </View>
              <View className="delegation-card-interval-unit">
                <Text className="delegation-card-interval-unit-text">时</Text>
              </View>
            </View>
          </View>
          <View className="delegation-card-time-interval">
            <View className="delegation-card-time-desc-interval-wrapper">
              <View className="delegation-card-interval-num">
                <Text className="delegation-card-interval-num-text">48</Text>
              </View>
              <View className="delegation-card-interval-unit">
                <Text className="delegation-card-interval-unit-text">分</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="delegation-card-desc">
          <View className="delegation-card-desc-desc">
            <View className="delegation-card-desc-title">
              <Text className="delegation-card-desc-title-text">{desc}</Text>
            </View>
            <View className="delegation-card-situation">
              <Text className="delegation-card-situation-text">20位邻居成团 · 已参团78位邻居</Text>
            </View>
          </View>
          <View className="delegation-card-join">
            <Text className="delegation-card-join-text">参团</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default DelegationCard as ComponentClass<PageOwnProps, PageState>