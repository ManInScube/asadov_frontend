import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.scss'

interface IGalleryProps{
  gallery: string[]
}
const Gallery = ({ gallery }: IGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImage, setSelectedImage] = useState<boolean>(false); // Храним ссылку на активное изображение
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeSlideImgLink, setActiveslideImageLink] = useState<string | null>(null)
  const handleSlideChange = (swiper) => {
    // Получаем активный слайд
    const activeSlide = swiper.slides[swiper.activeIndex];
    
    // Находим изображение в активном слайде
    const img = activeSlide.querySelector('img');
    if (img) {
    //   console.log('SRC активного изображения:', img.src);
        setActiveslideImageLink(img.src);
    }
  };

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      // Привязка кнопок к Swiper navigation
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);
  return (
      <div className={styles.gallery}>


          {/* Главная галерея */}
          <Swiper
              style={
                  {
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                  } as CSSProperties
              }
              onSwiper={setSwiperInstance}
              ref={swiperRef}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              onSlideChange={handleSlideChange}
              className={styles.swiper__img}
              wrapperClass={styles.swiper__wrapper}
          >
              {gallery &&
                  gallery.map((item, index) => (
                      <SwiperSlide key={index}>
                          <img
                              src={`https://testinscube.ru${item.url}`}
                              onClick={() => {setSelectedImage(true); activeSlideImgLink === null && setActiveslideImageLink(`https://testinscube.ru${item.url}`)} } // Открываем модалку
                              style={{ cursor: "pointer" }}
                          />
                      </SwiperSlide>
                  ))}
          </Swiper>

          {/* Миниатюры */}
          <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.swiper__row}
              breakpoints={{
                  320: { slidesPerView: 2, spaceBetween: 5 },
                  768: { slidesPerView: 3, spaceBetween: 10 },
                  1024: { slidesPerView: 6, spaceBetween: 10 },
                  1800: { slidesPerView: 6, spaceBetween: 10 },
              }}
          >
            <a ref={prevRef} className={`${styles.arrow} ${styles.arrow__left}`}>
                <svg width="18" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4746 1L1.99271 15.4819L16.4746 29.9638" stroke="white" stroke-width="2"/>
                </svg>
            </a>
            <a ref={nextRef} className={`${styles.arrow} ${styles.arrow__right}`}>
                <svg width="18" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.48242 1L15.9643 15.4819L1.48242 29.9638" stroke="white" stroke-width="2"/>
                </svg>
            </a>

              {gallery &&
                  gallery.map((item, index) => (
                      <SwiperSlide key={index} className={styles.swiper__slide}>
                          <img src={`https://testinscube.ru${item.url}`} />
                      </SwiperSlide>
                  ))}
          </Swiper>

          {/* Модальное окно */}
          {selectedImage && (
              <div className={styles.modal} onClick={() => setSelectedImage(false)}>
                <div className={styles.modalContainer}>
                    <a className={`${styles.arrow} ${styles.arrow__left}`}  onClick={(e) => {e.stopPropagation(); goPrev()}}>
                        <svg width="18" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4746 1L1.99271 15.4819L16.4746 29.9638" stroke="white" stroke-width="2"/>
                        </svg>
                    </a>
                    <a className={`${styles.arrow} ${styles.arrow__right}`}  onClick={(e) => {e.stopPropagation(); goNext()}}>
                        <svg width="18" height="31" viewBox="0 0 18 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.48242 1L15.9643 15.4819L1.48242 29.9638" stroke="white" stroke-width="2"/>
                        </svg>
                    </a>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <span className={styles.close} onClick={() => setSelectedImage(false)}>
                            &times;
                        </span>
                        <img src={activeSlideImgLink} alt="Full Size" />
                    </div>
                </div>
              </div>
          )}
      </div>
  );
};

export default Gallery;