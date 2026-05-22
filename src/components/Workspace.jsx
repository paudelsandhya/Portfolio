import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header.jsx';

const backgroundImage = `${import.meta.env.BASE_URL}Background.jpg`;

const TABS = ['Writing', 'Designing'];

const Workspace = () => {
    const [activeTab, setActiveTab] = useState('Writing');
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        if (tab === 'Designing') {
            navigate('/Workspace/Designing');
        } else {
            setActiveTab(tab);
            navigate('/Workspace/Writing');
        }
    };

    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <Header />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(251,207,232,0.3),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(253,164,175,0.25),transparent_40%)]" />

            <div className="container mx-auto px-4 pt-36 md:pt-44 pb-20 relative max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-grey-crimson mb-2">
                        Workspace
                    </h1>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-4 mb-8"
                >
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === tab
                                    ? 'glass-card-strong text-grey-crimson shadow-lg'
                                    : 'glass-card text-grey-crimson/70 hover:text-grey-crimson'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card-strong rounded-3xl p-6 md:p-8 min-h-[220px]"
                >
                    {/* Writing sub-tabs */}
                    <WritingContent />
                </motion.div>

            </div>
        </div>
    );
};

const WRITING_CATEGORIES = [
    { label: 'Monologues', emoji: '🎭', path: '/Workspace/Writing/Monologues' },
    { label: 'Poems', emoji: '🌸', path: '/Workspace/Writing/Poems' },
    { label: 'Researches', emoji: '🔬', path: '/Workspace/Writing/Researches' },
    { label: 'Short Stories', emoji: '📖', path: '/Workspace/Writing/Short-Stories' },
];

const WritingContent = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WRITING_CATEGORIES.map(({ label, emoji, path }) => (
                <button
                    key={label}
                    onClick={() => navigate(path)}
                    className="group flex items-center gap-4 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: '#f5e4dc' }}
                >
                    <span className="text-3xl">{emoji}</span>
                    <div>
                        <p className="font-bold text-grey-crimson text-lg leading-tight">{label}</p>
                        <p className="text-xs text-grey-crimson/60 uppercase tracking-[0.3em] mt-0.5">click to explore</p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Workspace;
