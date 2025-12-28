import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WorkspaceBox = ({ open, toggle }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/Workspace");
    };

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <div
                className="group glass-card hover-lift rounded-[34px] cursor-pointer h-auto"
                style={{ backgroundColor: '#f5e4dc' }}
                onClick={handleClick}
            >
                <div className="relative h-full rounded-[32px] overflow-hidden p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-grey-crimson/70">
                            <span className="w-2 h-2 rounded-full bg-grey-crimson inline-block"></span>
                            workspace
                        </div>
                        <div className="text-xl">🗃️</div>
                    </div>
                    <h2 className="text-3xl font-bold text-grey-crimson tracking-tight">
                        Blogs & Artworks
                    </h2>
                    <p className="text-sm text-grey-crimson/70 uppercase tracking-[0.4em] mt-1">
                        click to explore
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkspaceBox;
