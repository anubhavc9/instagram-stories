import "../App.css";

const StoriesPreviewLoader = () => {
  return (
    <div className="skeleton-container">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-circle"></div>
        </div>
      ))}
    </div>
  );
};
export default StoriesPreviewLoader;
