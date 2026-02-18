import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header.jsx';

const Designing = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: 'url(/Background.jpg)',
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
                    <button
                        onClick={() => navigate('/Workspace/Writing')}
                        className="px-6 py-3 rounded-full font-semibold transition-all duration-300 glass-card text-grey-crimson/70 hover:text-grey-crimson"
                    >
                        Writing
                    </button>
                    <button
                        className="px-6 py-3 rounded-full font-semibold transition-all duration-300 glass-card-strong text-grey-crimson shadow-lg"
                    >
                        Designing
                    </button>
                </motion.div>

                {/* Content Area */}
                <p className="text-lg text-red-500 flex justify-center items-center min-h-[200px]">
                    This page will be updated soon to include my designs.
                </p>

            </div>
        </div>
    );
};

export default Designing;
