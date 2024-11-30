// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination } from 'swiper/modules';

// Import PropTypes
import PropTypes from 'prop-types';
import React from 'react';

export default function JobCardSlider({ children }) {
  return (
    <div className="flex mt-8">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className="mb-9">
            <div className="swiper-slide-content text-dark200_light900 text-center mt-9 flex items-center justify-center h-fit rounded-lg">
              {child}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Define PropTypes for the component
JobCardSlider.propTypes = {
  children: PropTypes.node, // Accepts any valid React node
};
