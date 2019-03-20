import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'

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
        <Image className="category-img" src={icon} />
        <View className="category-desc">
          <Text>{desc}</Text>
        </View>
      </View>
    )
  }
}

export default CategoryCard as ComponentClass<PageOwnProps, PageState>