import React from 'react';
import JsonUpload from './upload/JsonUpload';
import DownloadJson from './DownloadJson';
import { StoryboardGrid } from './storyboard/StoryboardGrid';

export const Tabs: React.FC = () => {
  return (
    <div className="space-y-4">
      <JsonUpload />
      <DownloadJson />
      <StoryboardGrid />
    </div>
  );
};
