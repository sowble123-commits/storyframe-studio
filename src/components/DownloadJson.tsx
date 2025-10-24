import React from 'react';
import { useProjectContext } from '../context/useProjectContext';

const DownloadJson: React.FC = () => {
    const { project } = useProjectContext();

    const handleDownload = () => {
        if (!project) return;

        const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name || 'project'}.json`;
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleDownload} className="bg-blue-600 text-white px-3 py-1 rounded">
            다운로드
        </button>
    );
};

export default DownloadJson;
