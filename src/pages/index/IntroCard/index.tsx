import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

type PageOwnProps = {
  icon: any,
  desc: string,
}

type PageState = {}

interface IntroCard {
  props: PageOwnProps;
}

class IntroCard extends Component {
  render() {
    const { icon, desc } = this.props;
    return (
      <View className="intro-card">
        <Image className="intro-card-img" src={icon} />
        <View className="intro-card-desc">
          <Text className="intro-card-desc-text">{desc}</Text>
        </View>
      </View>
    )
  }
}

export default IntroCard as ComponentClass<PageOwnProps, PageState>