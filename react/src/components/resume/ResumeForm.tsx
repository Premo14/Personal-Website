import { useState } from 'react';
import { Modal } from '../ui/Modal';
import ResumeData from '../../models/ResumeData';
import { ResumeAdminPanel } from './ResumeAdminPanel';
import ProfessionalSummaryForm from './ProfessionalSummaryForm';
import TechnicalSkillsForm from './TechnicalSkillsForm';
import ExperienceListForm from './ExperienceListForm';
import ProjectListForm from './ProjectListForm';
import EducationListForm from './EducationListForm';

interface ResumeFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeForm({ isOpen, onClose }: ResumeFormProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchResume = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/resume');
            const data = await response.json();
            setResumeData(data);
        } catch (err) {
            console.error('Error fetching resume:', err);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/resume', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData),
            });
            if (!response.ok) throw new Error('Failed to update resume');
            alert('Resume updated successfully!');
            onClose(); // Close after save
            setIsAuthenticated(false);
        } catch (err) {
            console.error('Save failed:', err);
            alert('Save failed');
        }
    };

    const handleCancel = () => {
        onClose();
        setIsAuthenticated(false);
        setResumeData(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            {!isAuthenticated ? (
                <ResumeAdminPanel
                    onAuthenticated={() => {
                        setIsAuthenticated(true);
                        fetchResume();
                    }}
                    onError={(err) => setError(err)}
                />
            ) : resumeData ? (
                <div className="overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold mb-4">Edit Resume</h2>

                    <ProfessionalSummaryForm resumeData={resumeData} setResumeData={setResumeData} />
                    <TechnicalSkillsForm resumeData={resumeData} setResumeData={setResumeData} />
                    <ExperienceListForm resumeData={resumeData} setResumeData={setResumeData} />
                    <ProjectListForm resumeData={resumeData} setResumeData={setResumeData} />
                    <EducationListForm resumeData={resumeData} setResumeData={setResumeData} />

                    {/* Cancel and Save Buttons */}
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
                            Save Resume
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center text-textMuted">Loading...</div>
            )}
        </Modal>
    );
}
