import React from 'react';
import JsonUpload from './upload/JsonUpload';
import DownloadJson from './DownloadJson';

export const Tabs: React.FC = () => {
  return (
    <div className="space-y-4">
      <JsonUpload />
      <DownloadJson />
    </div>
  );
};
