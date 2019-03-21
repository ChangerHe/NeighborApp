import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

type PageOwnProps = {
  icon: any,
  desc: string,
}

type PageState = {}

interface CategoryCard {
  props: PageOwnProps;
}

class CategoryCard extends Component {
  render() {
    const { icon, desc } = this.props;
    return (
      <View className="category-card">
        <Image className="category-card-img" src={icon} />
        <View className="category-card-desc">
          <Text className="category-card-desc-text">{desc}</Text>
        </View>
      </View>
    )
  }
}

export default CategoryCard as ComponentClass<PageOwnProps, PageState>