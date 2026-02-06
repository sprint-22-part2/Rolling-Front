import { useCallback, useRef } from 'react';
import styles from './index.module.css';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@/assets/icons';
import 'swiper/css';
import 'swiper/css/navigation';

function ProfileSelector({ options, selectedOption, onSelect }) {
  const normalizedOptions = Array.isArray(options) ? options : [];
  const selectedItem =
    normalizedOptions.find((option) => option.id === selectedOption) ||
    normalizedOptions[0];
  const selectedImage = selectedItem?.url ?? '';
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const attachNavigation = (swiper) => {
    if (!swiper || !prevRef.current || !nextRef.current) {
      return;
    }

    swiper.params.navigation = {
      ...(swiper.params.navigation || {}),
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };

    if (swiper.navigation) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  const setPrevRef = useCallback((node) => {
    prevRef.current = node;
    if (swiperRef.current) {
      attachNavigation(swiperRef.current);
    }
  }, []);

  const setNextRef = useCallback((node) => {
    nextRef.current = node;
    if (swiperRef.current) {
      attachNavigation(swiperRef.current);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>프로필 이미지</h3>
          <p className={styles.description}>프로필 이미지를 선택해주세요!</p>
        </div>
        <div className={styles.optionsRow}>
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView={4}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              attachNavigation(swiper);
            }}
            className={styles.optionsSwiper}
            breakpoints={{
              768: {
                slidesPerView: 8,
              },
            }}
          >
            {normalizedOptions.map((option, index) => {
              const optionId = option.id;
              const isSelected = selectedOption === optionId;
              const optionLabel = option.label ?? `프로필 이미지 ${index + 1}`;

              return (
                <SwiperSlide key={optionId} className={styles.slide}>
                  <button
                    type="button"
                    className={cn(styles.optionButton, {
                      [styles.selected]: isSelected,
                    })}
                    onClick={() => onSelect?.(optionId)}
                    aria-pressed={isSelected}
                    aria-label={optionLabel}
                  >
                    <img
                      src={option.url}
                      alt={optionLabel}
                      className={styles.optionImage}
                    />
                    {isSelected && (
                      <span className={styles.check} aria-hidden="true">
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={styles.swiperArrowButtons}>
            <button
              ref={setPrevRef}
              type="button"
              className={styles.swiperButtonPrev}
              aria-label="이전 프로필"
            >
              <ArrowLeftIcon />
            </button>
            <button
              ref={setNextRef}
              type="button"
              className={styles.swiperButtonNext}
              aria-label="다음 프로필"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.previewCircle}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="선택된 프로필 이미지"
              className={styles.previewImage}
            />
          )}
        </div>
        <span className={styles.previewLabel}>미리보기</span>
      </div>
    </div>
  );
}

ProfileSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      url: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ),
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
};

export default ProfileSelector;
