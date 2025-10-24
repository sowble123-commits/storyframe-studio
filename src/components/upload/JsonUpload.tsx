import React from 'react';
import { useProjectContext } from '../../context/useProjectContext';
import { validateProject } from '../../utils/validateProject';

const JsonUpload: React.FC = () => {
    const { setProject } = useProjectContext();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                const errors = validateProject(json);

                if (errors.length > 0) {
                    alert("❌ Invalid project:\n" + errors.slice(0, 5).join('\n'));
                    return;
                }

                setProject(json);
            } catch (err) {
                alert("❌ Failed to parse JSON");
            }
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
    );
};

export default JsonUpload;
