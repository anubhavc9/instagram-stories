export interface Story {
  id: number;
  name: string;
  img: string;
}

export interface StoryFullscreenProps {
  stories: Story[];
  currentStoryIndex: number;
  goToNextStory: () => void;
  goToPreviousStory: () => void;
  toggleFullscreen: () => void;
}

export interface StoriesPreviewContainerProps {
  stories: Story[];
  setCurrentStoryIndex: (index: number) => void;
  toggleFullscreen: () => void;
}
