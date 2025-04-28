import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { WelcomeAdminPanel } from './WelcomeAdminPanel';
import { welcomeMessageSchema } from '@/schemas/welcomeMessageSchema';

interface WelcomeFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WelcomeForm({ isOpen, onClose }: WelcomeFormProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMessage();
        }
    }, [isAuthenticated]);

    const fetchMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/welcome-message');
            const data = await response.json();
            setMessage(data.message);
        } catch (err) {
            console.error('Error fetching welcome message:', err);
        }
    };

    const handleSave = async () => {
        try {
            welcomeMessageSchema.parse({ message });

            const response = await fetch('http://localhost:8080/api/v1/welcome-message', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) throw new Error('Failed to update welcome message');

            alert('Welcome message updated successfully!');
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
        setMessage('');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            {!isAuthenticated ? (
                <WelcomeAdminPanel
                    onAuthenticated={() => setIsAuthenticated(true)}
                    onError={(err) => setError(err)}
                />
            ) : (
                <div className="overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold mb-4 text-center">Edit Welcome Message</h2>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full h-32 p-2 mb-4 border rounded bg-background"
                        placeholder="Enter your welcome message..."
                    />

                    <div className="flex justify-between">
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
                            Save Message
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}
