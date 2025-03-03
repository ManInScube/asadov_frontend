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
const Gallery = ({gallery}: IGalleryProps) =>{
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    console.log(gallery)
    return (
      <>
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }as CSSProperties}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          // className="mySwiper2"
          className={styles.swiper__img}
        >
          {gallery&&gallery.map(item=>(
            <SwiperSlide >
              <img src={`https://testinscube.ru${item.url}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper__row}

          breakpoints={{
            320: { // Для экранов шириной от 320px
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: { // Для экранов шириной от 768px
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: { // Для экранов шириной от 1024px и выше
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1800: { // Для экранов шириной от 1024px и выше
              slidesPerView: 6,
              spaceBetween: 10,
              // autoHeight: true
            },
          }}
        >
          {gallery&&gallery.map(item=>(
            <SwiperSlide
              className={styles.swiper__slide}
            >
              <img src={`https://testinscube.ru${item.url}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
}

export default Gallery;