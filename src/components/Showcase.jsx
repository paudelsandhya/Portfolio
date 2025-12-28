import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ResumeDisplay from './ResumeDisplay'
import Certificates from './Certificates'
import Header from './Header.jsx'

export default function Showcase() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Certificates')

  return (
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ backgroundImage: 'url(/Background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <Header />

      {/* Background decorations consistent with main page */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(251,207,232,0.3),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(253,164,175,0.25),transparent_40%)]"></div>

      <div className="container mx-auto px-4 pt-36 md:pt-44 pb-20 relative max-w-7xl">


        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-grey-crimson mb-2">
            Showcase
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
            onClick={() => setActiveTab('Certificates')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'Certificates'
              ? 'glass-card-strong text-grey-crimson shadow-lg'
              : 'glass-card text-grey-crimson/70 hover:text-grey-crimson'
              }`}
          >
            Certificates
          </button>
          <button
            onClick={() => setActiveTab('Resume')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'Resume'
              ? 'glass-card-strong text-grey-crimson shadow-lg'
              : 'glass-card text-grey-crimson/70 hover:text-grey-crimson'
              }`}
          >
            Resume
          </button>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card-strong rounded-3xl p-6 md:p-8 min-h-[220px]"
        >
          {activeTab === 'Resume' ? <ResumeDisplay /> : <Certificates />}
        </motion.div>
      </div>
    </div>
  )
}
