import ResumeData from '../../models/ResumeData';
import * as React from "react";

interface ProfessionalSummaryFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
}

export default function ProfessionalSummaryForm({ resumeData, setResumeData }: ProfessionalSummaryFormProps) {
    return (
        <div className="mb-6">
            <label className="block mb-2 font-semibold">Professional Summary</label>
            <textarea
                value={resumeData.professionalSummary}
                onChange={(e) =>
                    setResumeData((prev) =>
                        prev ? { ...prev, professionalSummary: e.target.value } : prev
                    )
                }
                className="w-full p-2 rounded bg-background border border-border"
                rows={4}
            />
        </div>
    );
}
