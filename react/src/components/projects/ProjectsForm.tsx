import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ProjectsAdminPanel } from './ProjectsAdminPanel';
import { portfolioProjectSchema, PortfolioProjectFormValues } from '@/schemas/projectSchema';

interface ProjectsFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectsForm({ isOpen, onClose }: ProjectsFormProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [projects, setProjects] = useState<PortfolioProjectFormValues[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects();
        }
    }, [isAuthenticated]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/projects');
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleSave = async () => {
        try {
            projects.forEach((project) => portfolioProjectSchema.parse(project));

            const response = await fetch('http://localhost:8080/api/v1/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects),
            });

            if (!response.ok) throw new Error('Failed to update projects');

            alert('Projects updated successfully!');
            onClose();
            setIsAuthenticated(false);
        } catch (err) {
            console.error('Save failed:', err);
            alert('Save failed');
        }
    };

    const handleCancel = () => {
        onClose();
        setIsAuthenticated(false);
        setProjects([]);
    };

    const addProject = () => {
        setProjects([...projects, { title: '', tools: [''], description: '', sourceLink: '', liveLink: '' }]);
    };

    const deleteProject = (index: number) => {
        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            {!isAuthenticated ? (
                <ProjectsAdminPanel
                    onAuthenticated={() => setIsAuthenticated(true)}
                    onError={(err) => console.error(err)}
                />
            ) : (
                <div className="overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit Projects</h2>

                    {projects.map((project, idx) => (
                        <div key={idx} className="text-black mb-6 p-4 rounded-lg bg-background shadow">
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => {
                                    const updated = [...projects];
                                    updated[idx].title = e.target.value;
                                    setProjects(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Project Title"
                            />
                            <input
                                type="text"
                                value={(project.tools || []).join(', ')}
                                onChange={(e) => {
                                    const updated = [...projects];
                                    updated[idx].tools = e.target.value.split(',').map((tool) => tool.trim());
                                    setProjects(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Tools (comma separated)"
                            />
                            <textarea
                                value={project.description}
                                onChange={(e) => {
                                    const updated = [...projects];
                                    updated[idx].description = e.target.value;
                                    setProjects(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Project Description"
                            />
                            <input
                                type="text"
                                value={project.sourceLink ?? ''}
                                onChange={(e) => {
                                    const updated = [...projects];
                                    updated[idx].sourceLink = e.target.value;
                                    setProjects(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Source Code Link"
                            />
                            <input
                                type="text"
                                value={project.liveLink ?? ''}
                                onChange={(e) => {
                                    const updated = [...projects];
                                    updated[idx].liveLink = e.target.value;
                                    setProjects(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Live Project Link"
                            />

                            <button
                                type="button"
                                onClick={() => deleteProject(idx)}
                                className="mt-2 block text-xs text-red-500 underline hover:text-red-700"
                            >
                                🗑️ Delete Project
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addProject}
                        className="mt-4 px-3 py-1 text-sm bg-accent text-black rounded hover:opacity-90"
                    >
                        ➕ Add Project
                    </button>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark font-bold"
                        >
                            Save Projects
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}
