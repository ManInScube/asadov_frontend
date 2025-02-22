import "./GridSkeleton.css";


const GridSkeleton = () => {
    return (
        <div className="skeleton-grid">
          <div className="skeleton-box large"></div>
          <div className="skeleton-box"></div>
          <div className="skeleton-box"></div>
          <div className="skeleton-box"></div>
          <div className="skeleton-box"></div>
          <div className="skeleton-box large"></div>
          <div className="skeleton-box"></div>
          <div className="skeleton-box loading-text"></div>
        </div>
      );
    };

export default GridSkeleton;