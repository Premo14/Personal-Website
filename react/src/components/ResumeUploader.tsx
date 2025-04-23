import { useState } from 'react';
import { parseDocxToJson } from '../utils/parseDocx';
import * as React from "react";

const UPLOAD_PASSWORD = import.meta.env.VITE_RESUME_UPLOAD_PASSCODE;

export default function ResumeUploader() {
    const [showPanel, setShowPanel] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const togglePanel = () => setShowPanel(!showPanel);

    const handlePasswordSubmit = () => {
        if (inputPassword === UPLOAD_PASSWORD) {
            setIsAuthenticated(true);
            setError(null);
        } else {
            setError('Incorrect password.');
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('Selected file:', file);
        if (!file || !file.name.endsWith('.docx')) {
            setError('Please upload a .docx file.');
            return;
        }

        try {
            const data = await parseDocxToJson(file);
            console.log('Parsed resume JSON:', data);
            // In the future, save it to backend or localStorage
        } catch (err) {
            setError('Error parsing document:' + err);
        }
    };

    return (
        <div>
            <button
                onClick={togglePanel}
                className="px-3 py-1 text-sm border border-accent text-accent rounded-md hover:bg-accent hover:text-black invert dark:invert-0 transition"
            >
                Admin
            </button>

            {showPanel && (
                <div className="mt-3 w-72 p-4 bg-surface shadow-lg rounded-lg text-sm text-textPrimary">
                    {!isAuthenticated ? (
                        <>
                            <label className="block mb-2 font-bold">Resume Admin Access</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                className="w-full p-2 mb-2 rounded bg-background border border-border"
                            />
                            <button
                                onClick={handlePasswordSubmit}
                                className="w-full py-1 rounded bg-accent text-black hover:opacity-90 font-bold"
                            >
                                Submit
                            </button>
                            {error && <p className="text-red-500 mt-1">{error}</p>}
                        </>
                    ) : (
                        <>
                            <label className="block mb-2 font-bold">Upload New Resume (.docx)</label>
                            <input
                                type="file"
                                accept=".docx"
                                onChange={handleFileUpload}
                                className="w-full text-sm"
                            />
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
