import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useWindowDimensions } from 'react-native'

import CustomImage from './CustomImage'

function ImageCarousel({ itemArray }) {
  const width = useWindowDimensions().width

  return (
    <Carousel
      data={itemArray}
      renderItem={({ item }) => <CustomImage item={item} />}
      sliderWidth={width}
      itemWidth={width}
    />
  );
}

export default ImageCarousel