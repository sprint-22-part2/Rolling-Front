import styles from './index.module.css';
import RollingCard from '../RollingCard';

// Import Swiper React components
// import Swiper core and required modules
import { Navigation, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';

// Import Images
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function PopularRolling() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className={styles.popularRolling}>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }, 0);
        }}
        className={styles.rollingSwiper}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1079: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        <SwiperSlide>
          <RollingCard theme="pink" />
        </SwiperSlide>
        <SwiperSlide>
          <RollingCard theme="yellow" />
        </SwiperSlide>
        <SwiperSlide>
          <RollingCard theme="green" />
        </SwiperSlide>
        <SwiperSlide>
          <RollingCard theme="blue" />
        </SwiperSlide>
        <SwiperSlide>
          <RollingCard theme="purple" />
        </SwiperSlide>
        <SwiperSlide>
          <RollingCard theme="orange" />
        </SwiperSlide>
        <SwiperSlide>
          <RollingCard theme="image" />
        </SwiperSlide>
      </Swiper>
      <div className={styles.swiperArrowButtons}>
        <button ref={prevRef} className={styles.swiperButtonPrev}>
          <ArrowLeftIcon />
        </button>
        <button ref={nextRef} className={styles.swiperButtonNext}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export default PopularRolling;
