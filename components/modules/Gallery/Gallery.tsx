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
              <img src={`http://84.201.170.233:1337${item.url}`} />
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
        >
          {gallery&&gallery.map(item=>(
            <SwiperSlide >
              <img src={`http://84.201.170.233:1337${item.url}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
}

export default Gallery;