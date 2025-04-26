import ResumeData from '../../models/ResumeData';
import * as React from "react";

interface TechnicalSkillsFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
}

export default function TechnicalSkillsForm({ resumeData, setResumeData }: TechnicalSkillsFormProps) {
    const handleSkillChange = (category: string, value: string) => {
        setResumeData((prev) =>
            prev ? {
                ...prev,
                technicalSkills: {
                    ...prev.technicalSkills,
                    [category]: value,
                },
            } : prev
        );
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
            {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
                <div key={category} className="mb-2">
                    <label className="block font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => handleSkillChange(category, e.target.value)}
                        className="w-full p-2 rounded bg-background border border-border"
                    />
                </div>
            ))}
        </div>
    );
}
