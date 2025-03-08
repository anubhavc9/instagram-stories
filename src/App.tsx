import React, { useState, useEffect } from "react";
import "./App.css";
import StoriesPreviewContainer from "./components/StoriesPreviewContainer";
import StoryFullscreen from "./components/StoryFullscreen";
import { Story } from "./interfaces/story";
import StoriesPreviewLoader from "./components/StoriesPreviewLoader";
import Error from "./components/Error";

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<string>("not-started");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("started");
    setTimeout(() => {
      fetch("/data/stories.json")
        .then((res) => res.json())
        .then((data: Story[]) => {
          setStories(data);
          setLoading("done");
        })
        .catch((error) => {
          setError(error?.message);
          setLoading("done");
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
      {loading === "done" ? (
        error ? (
          <Error />
        ) : isFullscreen ? (
          <StoryFullscreen
            stories={stories}
            currentStoryIndex={currentStoryIndex}
            goToNextStory={goToNextStory}
            goToPreviousStory={goToPreviousStory}
            toggleFullscreen={toggleFullscreen}
          />
        ) : (
          <StoriesPreviewContainer
            stories={stories}
            setCurrentStoryIndex={setCurrentStoryIndex}
            toggleFullscreen={toggleFullscreen}
          />
        )
      ) : (
        <StoriesPreviewLoader />
      )}
    </div>
  );
};

export default App;
