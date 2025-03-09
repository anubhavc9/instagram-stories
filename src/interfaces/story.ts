export interface Story {
  id: number;
  name: string;
  img: string;
  isSeen: boolean;
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
