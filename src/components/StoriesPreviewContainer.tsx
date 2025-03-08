import "../App.css";
import { StoriesPreviewContainerProps, Story } from "../interfaces/story";

const StoriesPreviewContainer: React.FC<StoriesPreviewContainerProps> = ({
  stories,
  setCurrentStoryIndex,
  toggleFullscreen,
}) => {
  const handleClick = (story: Story) => {
    toggleFullscreen();
    setCurrentStoryIndex(story.id);
  };

  return (
    <div className="story-container">
      {stories.map((story) => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => handleClick(story)}
        >
          <img src={story.img} alt={story.name} className="story-image" />
          <span className="story-name">{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StoriesPreviewContainer;
