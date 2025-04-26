import ResumeData from '../../models/ResumeData';
import * as React from "react";

interface ExperienceListFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
}

export default function ExperienceListForm({ resumeData, setResumeData }: ExperienceListFormProps) {
    const updateExperienceField = (index: number, field: keyof ResumeData['professionalExperience'][0], value: string) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updated = [...prev.professionalExperience];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, professionalExperience: updated };
        });
    };

    const addExperience = () => {
        setResumeData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                professionalExperience: [
                    ...prev.professionalExperience,
                    { title: '', company: '', location: '', dateRange: '', bullets: [''] }
                ],
            };
        });
    };

    const deleteExperience = (index: number) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updated = prev.professionalExperience.filter((_, idx) => idx !== index);
            return { ...prev, professionalExperience: updated };
        });
    };

    const updateBullet = (expIdx: number, bulletIdx: number, value: string) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updatedExp = [...prev.professionalExperience];
            const updatedBullets = [...updatedExp[expIdx].bullets];
            updatedBullets[bulletIdx] = value;
            updatedExp[expIdx] = { ...updatedExp[expIdx], bullets: updatedBullets };
            return { ...prev, professionalExperience: updatedExp };
        });
    };

    const addBullet = (expIdx: number) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updatedExp = [...prev.professionalExperience];
            updatedExp[expIdx] = {
                ...updatedExp[expIdx],
                bullets: [...updatedExp[expIdx].bullets, ''],
            };
            return { ...prev, professionalExperience: updatedExp };
        });
    };

    const deleteBullet = (expIdx: number, bulletIdx: number) => {
        setResumeData((prev) => {
            if (!prev) return prev;
            const updatedExp = [...prev.professionalExperience];
            updatedExp[expIdx] = {
                ...updatedExp[expIdx],
                bullets: updatedExp[expIdx].bullets.filter((_, idx) => idx !== bulletIdx),
            };
            return { ...prev, professionalExperience: updatedExp };
        });
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Professional Experience</h3>
            {resumeData.professionalExperience.map((exp, idx) => (
                <div key={idx} className="mb-6 border-t pt-4 border-border">
                    <input
                        type="text"
                        placeholder="Title"
                        value={exp.title}
                        onChange={(e) => updateExperienceField(idx, 'title', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperienceField(idx, 'company', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateExperienceField(idx, 'location', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />
                    <input
                        type="text"
                        placeholder="Date Range"
                        value={exp.dateRange}
                        onChange={(e) => updateExperienceField(idx, 'dateRange', e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-background border border-border"
                    />

                    {/* Bullets */}
                    <h4 className="font-semibold mt-4 mb-2">Bullets</h4>
                    {exp.bullets.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex mb-2">
                            <input
                                type="text"
                                placeholder="Bullet Point"
                                value={bullet}
                                onChange={(e) => updateBullet(idx, bulletIdx, e.target.value)}
                                className="w-full p-2 rounded bg-background border border-border"
                            />
                            <button
                                type="button"
                                onClick={() => deleteBullet(idx, bulletIdx)}
                                className="ml-2 text-red-500 hover:text-red-700 text-sm"
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addBullet(idx)}
                        className="mt-2 text-xs text-accent underline hover:text-accent-dark"
                    >
                        ➕ Add Bullet
                    </button>

                    {/* Delete Experience */}
                    <button
                        type="button"
                        onClick={() => deleteExperience(idx)}
                        className="mt-4 block text-xs text-red-500 underline hover:text-red-700"
                    >
                        🗑️ Delete Experience
                    </button>
                </div>
            ))}

            {/* Add New Experience */}
            <button
                type="button"
                onClick={addExperience}
                className="mt-4 px-3 py-1 text-sm bg-accent text-black rounded hover:opacity-90"
            >
                ➕ Add Experience
            </button>
        </div>
    );
}
