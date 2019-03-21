import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

type PageOwnProps = {
  title: any,
  subtitle: string,
  seeMore?: string,
}

type PageState = {}

interface BlockTitle {
  props: PageOwnProps;
}

class BlockTitle extends Component {
  render() {
    const { title, subtitle, seeMore } = this.props;
    return (
      <View className="block-title">
        <View className="block-title-title">
          <Text className="block-title-title-text">{title} </Text>
        </View>
        <View className="block-title-subtitle">
          <Text className="block-title-subtitle-text"> · {subtitle}</Text>
        </View>
        {
          seeMore && <View className="block-title-see-more">
            <Text className="block-title-see-more-text">{seeMore}</Text>
          </View>
        }
      </View>
    )
  }
}

export default BlockTitle as ComponentClass<PageOwnProps, PageState>