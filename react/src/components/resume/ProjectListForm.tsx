import ResumeData from '../../models/ResumeData';
import * as React from "react";

interface ProjectListFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
}

export default function ProjectListForm({ resumeData, setResumeData }: ProjectListFormProps) {
    const updateProjectField = (index: number, field: keyof ResumeData['projects'][0], value: string) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updated = [...prev.projects];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, projects: updated };
        });
    };

    const addProject = () => {
        setResumeData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                projects: [...prev.projects, { name: '', description: '' }],
            };
        });
    };

    const deleteProject = (index: number) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updated = prev.projects.filter((_, idx) => idx !== index);
            return { ...prev, projects: updated };
        });
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="mb-6 border-t pt-4 border-border">
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) => updateProjectField(idx, 'name', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />
                    <input
                        type="text"
                        placeholder="Project Description"
                        value={proj.description}
                        onChange={(e) => updateProjectField(idx, 'description', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />

                    {/* Delete Project */}
                    <button
                        type="button"
                        onClick={() => deleteProject(idx)}
                        className="mt-2 block text-xs text-red-500 underline hover:text-red-700"
                    >
                        🗑️ Delete Project
                    </button>
                </div>
            ))}

            {/* Add New Project */}
            <button
                type="button"
                onClick={addProject}
                className="mt-4 px-3 py-1 text-sm bg-accent text-black rounded hover:opacity-90"
            >
                ➕ Add Project
            </button>
        </div>
    );
}
