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
    const viewedStory = stories.find((s) => s.id === story.id);
    if (viewedStory) {
      story.isSeen = true;
    }
  };

  const sortedStories = [...stories].sort((a, b) => {
    if (a.isSeen === b.isSeen) return 0;
    return a.isSeen ? 1 : -1;
  });

  return (
    <div className="story-container">
      {sortedStories.map((story) => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => handleClick(story)}
        >
          <img
            src={story.img}
            alt={story.name}
            className={`story-image ${story.isSeen ? "seen" : ""}`}
          />
          <span className="story-name">{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StoriesPreviewContainer;
