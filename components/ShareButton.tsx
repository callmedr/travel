
import React, { useState } from 'react';
import { ShareIcon } from './icons';

const ShareButton: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors"
            >
                <ShareIcon />
                <span>공유하기</span>
            </button>
            {copied && (
                <div 
                    className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-sm rounded-md px-3 py-1.5 whitespace-nowrap shadow-lg animate-fade-in-out"
                    style={{ animation: 'fadeInOut 2s' }}
                >
                    URL이 복사되었습니다!
                </div>
            )}
            <style>{`
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(10px); }
                    20% { opacity: 1; transform: translateY(0); }
                    80% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(10px); }
                }
                .animate-fade-in-out {
                    animation: fadeInOut 2s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ShareButton;
