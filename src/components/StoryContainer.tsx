import "../App.css";

interface Story {
  id: number;
  img: string;
  name: string;
}

interface StoryContainerProps {
  stories: Story[];
  setCurrentStoryIndex: (index: number) => void;
  toggleFullscreen: () => void;
}

const StoryContainer: React.FC<StoryContainerProps> = ({
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

export default StoryContainer;
