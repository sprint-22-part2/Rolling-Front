import styles from './index.module.css';
import RollingCard from '@/components/main/RollingCard';
import { getPopularRecipients } from '@/apis/recipients';

// Import Swiper React components
// import Swiper core and required modules
import { Navigation, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import Images
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function PopularRolling() {
  const [rolling, setRolling] = useState([]);

  useEffect(() => {
    async function rec() {
      const popularRecipients = await getPopularRecipients({ limit: 8 });
      setRolling(popularRecipients.results);
    }
    rec();
  }, []);

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
            if (swiper.params && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }

            // navigation 객체가 존재할 때만 실행
            if (swiper.navigation) {
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 10);
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
        {rolling?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              className={styles.RollingCard}
              key={item.id}
              type={item.id}
              to={'/post/' + item.id}
            >
              <RollingCard item={item} />
            </Link>
          </SwiperSlide>
        ))}
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
