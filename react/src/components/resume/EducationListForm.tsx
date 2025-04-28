import ResumeData from '@/models/ResumeData';
import * as React from "react";

interface EducationListFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
}

export default function EducationListForm({ resumeData, setResumeData }: EducationListFormProps) {
    const updateEducationField = (index: number, field: keyof ResumeData['education'][0], value: string) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updated = [...prev.education];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, education: updated };
        });
    };

    const addEducation = () => {
        setResumeData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                education: [...prev.education, { institution: '', degree: '' }],
            };
        });
    };

    const deleteEducation = (index: number) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updated = prev.education.filter((_, idx) => idx !== index);
            return { ...prev, education: updated };
        });
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-6 border-t pt-4 border-border">
                    <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducationField(idx, 'institution', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />
                    <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducationField(idx, 'degree', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />

                    {/* Delete Education */}
                    <button
                        type="button"
                        onClick={() => deleteEducation(idx)}
                        className="mt-2 block text-xs text-red-500 underline hover:text-red-700"
                    >
                        🗑️ Delete Education
                    </button>
                </div>
            ))}

            {/* Add New Education */}
            <button
                type="button"
                onClick={addEducation}
                className="mt-4 px-3 py-1 text-sm bg-accent text-black rounded hover:opacity-90"
            >
                ➕ Add Education
            </button>
        </div>
    );
}
