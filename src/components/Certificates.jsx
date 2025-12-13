import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

// Certificate card component with eager image loading
function CertificateCard({ cert, index, onSelect }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.15 + 0.5,
                duration: 0.6,
                type: "spring",
                stiffness: 100
            }}
            className="project-card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm flex-shrink-0 relative overflow-hidden group"
            whileHover={{
                y: window.innerWidth <= 768 ? -4 : -8,
                transition: { duration: 0.3 }
            }}
            style={{
                background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.6) 0%, rgba(253, 164, 175, 0.6) 100%)',
                border: '1px solid rgba(244, 114, 182, 0.3)'
            }}
        >
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 to-rose-700"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
            />

            <div className="relative">
                {cert.image && (
                    <div className="mb-4 rounded-lg overflow-hidden bg-white/20 h-32">
                        <motion.img
                            src={cert.image}
                            alt={`${cert.title} certificate from ${cert.institution}`}
                            className="w-full h-full object-cover"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onError={(e) => {
                                e.target.onerror = null
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ECertificate%3C/text%3E%3C/svg%3E'
                            }}
                        />
                    </div>
                )}

                <div className="text-sm text-rose-700 font-semibold mb-1">{cert.institution}</div>

                <motion.h3
                    className="font-semibold text-lg sm:text-xl text-rose-900"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    {cert.title}
                </motion.h3>

                <div className="text-xs text-rose-600 mt-1">{cert.type}</div>

                <motion.p
                    className="mt-2 sm:mt-3 text-sm text-rose-900/80 leading-relaxed line-clamp-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.7 }}
                >
                    {cert.description}
                </motion.p>

                <motion.div
                    className="mt-4 flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.8 }}
                >
                    {!cert.lost && (
                        <motion.button
                            onClick={() => onSelect(cert)}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 rounded-lg transition-all text-white"
                            aria-label={`View ${cert.title} certificate from ${cert.institution}`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Certificate
                        </motion.button>
                    )}

                    {cert.verify && (
                        <motion.a
                            href={cert.verify}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify ${cert.title} certificate`}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ExternalLink size={16} />
                            Verify
                        </motion.a>
                    )}
                    {cert.lost && (
                        <div className="text-xs text-rose-600/70 italic">Certificate lost - Event verification available</div>
                    )}
                </motion.div>
            </div>
        </motion.article>
    )
}

const CERTIFICATES = [
    {
        id: 'cert-1',
        title: 'Journey to Taming our Biases',
        institution: 'UNICEF, AGORA',
        description: 'The Journey to Taming our Biases and has committed to working on being an Inclusion Champion',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-1.jpg`,
        verify: 'https://agora.unicef.org/mod/certificate/view.php?id=360248&action=get'
    },
    {
        id: 'cert-2',
        title: 'CHAT_Course Certificate',
        institution: 'UNICEF, AGORA',
        description: 'Harnessing the Power of Data to End Harmful Practices',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-2.jpg`,
        verify: 'https://agora.unicef.org/mod/certificate/view.php?id=287112&action=get'
    },
    {
        id: 'cert-3',
        title: 'Prevention of e-Waste',
        institution: 'unitar, SCYCLE',
        description: 'How to prevent e-Waste? e-course',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-3.jpg`,
        verify: 'https://unccelearn.org/mod/customcert/my_certificates.php?userid=1370005&certificateid=135&downloadcert=1'
    },
    {
        id: 'cert-4',
        title: 'Tobacco Harm Reduction',
        institution: 'THR Academy',
        description: 'Understanding Tobacco Harm Reduction.',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-4.jpg`,
        verify: null
    },
    {
        id: 'cert-5',
        title: 'CHAT _ a toolkit',
        institution: 'UNICEF, AGORA',
        description: 'CHAT - a toolkit to improve Community Engagement in emergencies.',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-5.jpg`,
        verify: 'https://agora.unicef.org/mod/certificate/view.php?id=287112&action=get'
    },
    {
        id: 'cert-6',
        title: 'International Climate Negotiations',
        institution: 'unitar, COP28',
        description: 'Mastering International Climate Negotiations: All you need to know',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-6.jpg`,
        verify: 'https://unccelearn.org/mod/customcert/my_certificates.php?userid=1370005&certificateid=172&downloadcert=1'
    },
    {
        id: 'cert-7',
        title: 'Basics of UI/UX',
        institution: 'SimpliLearn',
        description: 'Introduction to Graphics Design. Basics of UI/UX',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-7.jpg`,
        verify: 'https://simpli-web.app.link/e/a5zbkuREXYb'
    },
    {
        id: 'cert-8',
        title: 'Digital Marketing',
        institution: 'SimpliLearn',
        description: 'Introduction to Digital Marketing Fundamentals Course.',
        image: `${import.meta.env.BASE_URL}Achievements/Certificate-8.jpg`,
        verify: 'https://simpli-web.app.link/e/txg8Ig6xXYb'
    }
]

export default function Certificates() {
    const [selectedCert, setSelectedCert] = useState(null)

    const viewableCerts = CERTIFICATES.filter(cert => !cert.lost)

    const handleNext = () => {
        const currentIndex = viewableCerts.findIndex(c => c.id === selectedCert.id)
        const nextIndex = (currentIndex + 1) % viewableCerts.length
        setSelectedCert(viewableCerts[nextIndex])
    }

    const handlePrev = () => {
        const currentIndex = viewableCerts.findIndex(c => c.id === selectedCert.id)
        const prevIndex = (currentIndex - 1 + viewableCerts.length) % viewableCerts.length
        setSelectedCert(viewableCerts[prevIndex])
    }

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedCert) return
            if (e.key === 'ArrowRight') {
                handleNext()
            } else if (e.key === 'ArrowLeft') {
                handlePrev()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedCert])

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-4 mt-6">
                {viewableCerts.map((cert, index) => (
                    <CertificateCard
                        key={cert.id}
                        cert={cert}
                        index={index}
                        onSelect={setSelectedCert}
                    />
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.95) 0%, rgba(253, 164, 175, 0.95) 100%)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
                            >
                                <X size={24} className="text-white" />
                            </button>

                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
                            >
                                <ChevronLeft size={32} className="text-white" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
                            >
                                <ChevronRight size={32} className="text-white" />
                            </button>

                            <div className="p-8">
                                <div className="bg-white/20 rounded-lg overflow-hidden mb-6 h-96 flex items-center justify-center">
                                    {selectedCert.image && (
                                        <motion.img
                                            key={selectedCert.id}
                                            src={selectedCert.image}
                                            alt={`${selectedCert.title} certificate from ${selectedCert.institution}`}
                                            className="w-full h-full object-contain"
                                            loading="eager"
                                            decoding="async"
                                            fetchpriority="high"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                            }}
                                        />
                                    )}
                                    {!selectedCert.image && <div className="text-rose-900">Certificate Image</div>}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-rose-700 font-semibold">{selectedCert.institution}</div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-rose-900 mt-1">{selectedCert.title}</h2>
                                        <div className="text-sm text-rose-600 mt-1">{selectedCert.type}</div>
                                    </div>

                                    <p className="text-rose-900 leading-relaxed">{selectedCert.description}</p>

                                    {selectedCert.verify && (
                                        <a
                                            href={selectedCert.verify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all"
                                        >
                                            <ExternalLink size={18} />
                                            Verify Certificate
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
