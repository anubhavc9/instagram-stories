import React, { useState, useEffect } from "react";
import "./App.css";
import StoryContainer from "./components/StoryContainer";
import StoryViewerFullscreen from "./components/StoryViewerFullscreen";

interface Story {
  id: number;
  title: string;
  content: string;
}

const StoryViewer: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("/data/stories.json")
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data: Story[]) => {
          setStories(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error?.message);
          setLoading(false);
        });
    }, 2000); // Mock 2-second delay
  }, []);

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div>
      {loading ? (
        <div className="skeleton-container">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="skeleton-item">
              <div className="skeleton-circle"></div>
            </div>
          ))}
        </div>
      ) : isFullscreen ? (
        <StoryViewerFullscreen
          stories={stories}
          currentStoryIndex={currentStoryIndex}
          goToNextStory={goToNextStory}
          goToPreviousStory={goToPreviousStory}
          toggleFullscreen={toggleFullscreen}
          fade={fade}
        />
      ) : (
        <StoryContainer
          stories={stories}
          setCurrentStoryIndex={setCurrentStoryIndex}
          setIsFullscreen={setIsFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      )}
    </div>
  );
};

export default StoryViewer;
