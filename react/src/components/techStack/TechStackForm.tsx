import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { TechStackAdminPanel } from './TechStackAdminPanel';
import { Tool, techStackSchema } from '@/schemas/techStackSchema';
import {API_URL} from "@/API_URL.ts";

interface TechStackFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TechStackForm({ isOpen, onClose }: TechStackFormProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tools, setTools] = useState<Tool[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTools();
        }
    }, [isAuthenticated]);

    const fetchTools = async () => {
        try {
            const response = await fetch(`${API_URL}/tech-stack`);
            const data = await response.json();
            const toolsArray: Tool[] = Array.isArray(data.tools) ? data.tools : [data.tools];
            setTools(toolsArray);
        } catch (err) {
            console.error('Error fetching tech stack:', err);
        }
    };

    const handleSave = async () => {
        try {
            techStackSchema.parse({ tools }); // Validate before sending

            const response = await fetch(`${API_URL}/tech-stack`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tools }),
            });

            if (!response.ok) throw new Error('Failed to update tech stack');

            alert('Tech Stack updated successfully!');
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
        setTools([]);
    };

    const addTool = () => {
        setTools([...tools, { name: '', link: '', icon: '', categories: [] }]);
    };

    const deleteTool = (index: number) => {
        const updated = [...tools];
        updated.splice(index, 1);
        setTools(updated);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            {!isAuthenticated ? (
                <TechStackAdminPanel
                    onAuthenticated={() => setIsAuthenticated(true)}
                    onError={(err) => console.error(err)}
                />
            ) : (
                <div className="overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit Tech Stack</h2>

                    {/* Tools Form */}
                    {tools.map((tool, idx) => (
                        <div key={idx} className="mb-6 p-4 rounded-lg bg-background shadow text-black">
                            <input
                                type="text"
                                value={tool.name}
                                onChange={(e) => {
                                    const updated = [...tools];
                                    updated[idx].name = e.target.value;
                                    setTools(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Tool Name"
                            />
                            <input
                                type="text"
                                value={tool.link}
                                onChange={(e) => {
                                    const updated = [...tools];
                                    updated[idx].link = e.target.value;
                                    setTools(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Tool Link"
                            />
                            <input
                                type="text"
                                value={tool.icon}
                                onChange={(e) => {
                                    const updated = [...tools];
                                    updated[idx].icon = e.target.value;
                                    setTools(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Tool Icon URL"
                            />
                            <input
                                type="text"
                                value={tool.categories.join(', ')}
                                onChange={(e) => {
                                    const updated = [...tools];
                                    updated[idx].categories = e.target.value.split(',').map(c => c.trim());
                                    setTools(updated);
                                }}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Categories (comma separated)"
                            />

                            {/* 🗑️ Delete Tool Button */}
                            <button
                                type="button"
                                onClick={() => deleteTool(idx)}
                                className="mt-2 block text-xs text-red-500 underline hover:text-red-700"
                            >
                                🗑️ Delete Tool
                            </button>
                        </div>
                    ))}

                    {/* ➕ Add Tool Button */}
                    <button
                        type="button"
                        onClick={addTool}
                        className="mt-4 px-3 py-1 text-sm bg-accent text-black rounded hover:opacity-90"
                    >
                        ➕ Add Tool
                    </button>

                    {/* Footer Buttons */}
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
                            Save Tech Stack
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}
