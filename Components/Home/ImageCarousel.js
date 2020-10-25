import React, { Fragment, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useWindowDimensions } from 'react-native'

import CustomImage from './CustomImage'

function ImageCarousel({ itemArray }) {
  const [activeSlide, setAcitveSlide] = useState(0)
  const width = useWindowDimensions().width

  return (
    <Fragment>
      <Carousel
        data={itemArray}
        renderItem={({ item, index }) => <CustomImage item={item} index={index} activeItem={activeSlide} />}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setAcitveSlide(index)}
      />
      <Pagination
        dotsLength={itemArray.length}
        activeDotIndex={activeSlide}
        containerStyle={{ margin: -20 }}
      />
    </Fragment>
  );
}

export default ImageCarousel