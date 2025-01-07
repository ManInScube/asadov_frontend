import { useEffect, useState } from "react";

const GallerySkeleton = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Симуляция загрузки данных
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000); // 2 секунды
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <div className={loading ? "gallery-skeleton" : "gallery"}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={loading ? "skeleton-item" : "gallery-item"}
          ></div>
        ))}
      </div>
    );
  };
  
  export default GallerySkeleton;
