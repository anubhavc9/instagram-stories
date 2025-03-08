import { useEffect, useState } from "react";

interface Story {
  id: number;
  img: string;
  name: string;
}

interface StoryViewerFullscreenProps {
  stories: Story[];
  currentStoryIndex: number;
  goToNextStory: () => void;
  goToPreviousStory: () => void;
  toggleFullscreen: () => void;
  fade: boolean;
}

const StoryViewerFullscreen: React.FC<StoryViewerFullscreenProps> = ({
  stories,
  currentStoryIndex,
  goToNextStory,
  goToPreviousStory,
  toggleFullscreen,
  fade,
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return prev;
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          if (currentStoryIndex === stories.length - 1) {
            toggleFullscreen();
          } else {
            goToNextStory();
          }
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setProgress(0);
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    if (clickX < screenWidth / 2) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onClick={handleScreenClick}
    >
      {/* Progress Bars */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          gap: "4px",
          padding: "10px 10px 0 10px",
          boxSizing: "border-box",
        }}
      >
        {stories.map((_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: "5px",
              background:
                index < currentStoryIndex
                  ? "#fff"
                  : index === currentStoryIndex
                  ? `linear-gradient(to right, #fff ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
                  : "rgba(255, 255, 255, 0.3)",
              borderRadius: "2px",
            }}
          ></div>
        ))}
      </div>

      {/* Close Button */}
      <div>
        <img
          src="/cross.svg"
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
            position: "absolute",
            top: "25px",
            right: "10px",
          }}
          onClick={toggleFullscreen}
        />
      </div>

      {/* Story - Full Screen View */}
      {stories.map((story, index) => (
        <div key={index}>
          {story?.id === currentStoryIndex && (
            <img
              src={story?.img}
              alt={story?.name}
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                opacity: fade ? 1 : 0.3,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StoryViewerFullscreen;
