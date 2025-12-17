import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Briefcase, Heart, Award } from "lucide-react";
import Header from "./Header.jsx";

const About = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#FFC5D3] font-sans relative overflow-hidden">
            <Header />

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-300/15 rounded-full blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="relative pt-36 md:pt-44 pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Main About Card */}
                    <div className="rounded-[40px] p-[2px] bg-gradient-to-br from-pink-300 via-white to-rose-100 shadow-2xl">
                        <div className="rounded-[38px] bg-white/95 backdrop-blur-sm p-8 md:p-12">
                            {/* Header Section */}
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.4em] text-pink-400 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
                                    about me
                                    <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl">
                                        <Heart size={24} className="text-pink-600" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border-2 border-pink-100">
                                    <p className="text-lg text-pink-800 leading-relaxed">
                                        Hi! I'm Sandhya Paudel, a dedicated student with a passion for biotechnology,
                                        digital marketing, and graphics designing. I believe in the power of science to transform lives and the
                                        importance of mental well-being in our journey. My interests span across various
                                        fields, always seeking to learn and grow.
                                    </p>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
