import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CSSProperties, useState } from 'react';
import styles from './Gallery.module.scss'

interface IGalleryProps{
  gallery: string[]
}
const Gallery = ({ gallery }: IGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Храним ссылку на активное изображение

  return (
      <>
          {/* Главная галерея */}
          <Swiper
              style={
                  {
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                  } as CSSProperties
              }
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className={styles.swiper__img}
          >
              {gallery &&
                  gallery.map((item, index) => (
                      <SwiperSlide key={index}>
                          <img
                              src={`https://testinscube.ru${item.url}`}
                              onClick={() => setSelectedImage(`https://testinscube.ru${item.url}`)} // Открываем модалку
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
              {gallery &&
                  gallery.map((item, index) => (
                      <SwiperSlide key={index} className={styles.swiper__slide}>
                          <img src={`https://testinscube.ru${item.url}`} />
                      </SwiperSlide>
                  ))}
          </Swiper>

          {/* Модальное окно */}
          {selectedImage && (
              <div className={styles.modal} onClick={() => setSelectedImage(null)}>
                  <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                      <span className={styles.close} onClick={() => setSelectedImage(null)}>
                          &times;
                      </span>
                      <img src={selectedImage} alt="Full Size" />
                  </div>
              </div>
          )}
      </>
  );
};

export default Gallery;