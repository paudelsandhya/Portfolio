// import React, { useState, useEffect, useRef } from 'react';

// const CatchMeGame = () => {
//   const [emojiPosition, setEmojiPosition] = useState({ x: 200, y: 200 });
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isMobile, setIsMobile] = useState(false);
//   const [gameActive, setGameActive] = useState(false);
//   const gameAreaRef = useRef(null);
//   const animationRef = useRef(null);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
//       setIsMobile(isMobileDevice);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Handle mouse movement
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!gameAreaRef.current || isMobile || !gameActive) return;
      
//       const rect = gameAreaRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       setMousePosition({ x, y });
//     };

//     const gameArea = gameAreaRef.current;
//     if (gameArea && gameActive) {
//       gameArea.addEventListener('mousemove', handleMouseMove);
//       return () => gameArea.removeEventListener('mousemove', handleMouseMove);
//     }
//   }, [isMobile, gameActive]);

//   // Emoji escape logic
//   useEffect(() => {
//     if (isMobile || !gameActive) return;

//     const moveEmoji = () => {
//       const distance = Math.sqrt(
//         Math.pow(mousePosition.x - emojiPosition.x, 2) + 
//         Math.pow(mousePosition.y - emojiPosition.y, 2)
//       );

//       // If cursor is too close (within 100px), move the emoji away FAST
//       if (distance < 100) {
//         const gameArea = gameAreaRef.current;
//         if (!gameArea) return;

//         const rect = gameArea.getBoundingClientRect();
//         const maxX = rect.width - 60;
//         const maxY = rect.height - 60;

//         // Calculate escape direction with stronger force
//         const escapeX = emojiPosition.x + (emojiPosition.x - mousePosition.x) * 0.8;
//         const escapeY = emojiPosition.y + (emojiPosition.y - mousePosition.y) * 0.8;

//         // Keep within bounds with more randomness for unpredictable movement
//         const newX = Math.max(30, Math.min(maxX, escapeX + (Math.random() - 0.5) * 150));
//         const newY = Math.max(30, Math.min(maxY, escapeY + (Math.random() - 0.5) * 150));

//         setEmojiPosition({ x: newX, y: newY });
//       }
//     };

//     // Run at higher frequency for faster response
//     animationRef.current = setInterval(moveEmoji, 30);
//     return () => {
//       if (animationRef.current) {
//         clearInterval(animationRef.current);
//       }
//     };
//   }, [mousePosition, emojiPosition, isMobile, gameActive]);

//   const stopGame = () => {
//     setGameActive(false);
//     if (animationRef.current) {
//       clearInterval(animationRef.current);
//     }
//   };

//   const startGame = () => {
//     setGameActive(true);
//     // Reset emoji position
//     setEmojiPosition({ x: 200, y: 200 });
//     setMousePosition({ x: 0, y: 0 });
//   };

//   if (isMobile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 max-w-md mx-auto rounded-lg shadow-lg">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <span className="text-2xl">⚠️</span>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-lg font-medium text-yellow-800">
//                 Desktop Only Game
//               </h3>
//               <div className="mt-2 text-sm text-yellow-700">
//                 <p>
//                   This "Catch Me If You Can" game is only available on laptops and desktop computers. 
//                   The game requires precise cursor movement which is not available on mobile devices.
//                 </p>
//                 <p className="mt-2">
//                   Please visit this page on a desktop or laptop to enjoy the game! 🖥️
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (gameActive) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
//         {/* Game Title */}
//         <div className="text-center pt-8 pb-4">
//           <h1 className="text-4xl font-bold text-purple-800 mb-2">
//             🏃‍♂️ Catch Me If You Can! 
//           </h1>
//           <p className="text-lg text-purple-600">
//             Try to catch the emoji with your cursor... if you can! 😏
//           </p>
//         </div>

//         {/* Stop Game Button */}
//         <div className="text-center mb-4">
//           <button
//             onClick={stopGame}
//             className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             ⏹️ Stop Game
//           </button>
//         </div>

//         {/* Game Area */}
//         <div 
//           ref={gameAreaRef}
//           className="mx-8 my-4 bg-white/30 backdrop-blur-sm rounded-3xl shadow-2xl relative cursor-none"
//           style={{ height: 'calc(100vh - 250px)', minHeight: '400px' }}
//         >
//           {/* Runaway Emoji */}
//           <div
//             className="absolute text-6xl select-none pointer-events-none transition-all duration-100 ease-out"
//             style={{
//               left: `${emojiPosition.x}px`,
//               top: `${emojiPosition.y}px`,
//               transform: 'translate(-50%, -50%)',
//               zIndex: 10
//             }}
//           >
//             🏃‍♂️
//           </div>

//           {/* Custom Cursor */}
//           <div
//             className="absolute w-8 h-8 bg-red-500 rounded-full pointer-events-none opacity-70 transition-all duration-50"
//             style={{
//               left: `${mousePosition.x - 16}px`,
//               top: `${mousePosition.y - 16}px`,
//               transform: 'translate(0, 0)',
//               zIndex: 5
//             }}
//           >
//             <div className="absolute inset-0 bg-red-400 rounded-full animate-ping"></div>
//           </div>

//           {/* Game Instructions */}
//           <div className="absolute top-4 left-4 bg-white/80 rounded-lg p-4 max-w-xs">
//             <h3 className="font-bold text-gray-800 mb-2">How to Play:</h3>
//             <ul className="text-sm text-gray-700 space-y-1">
//               <li>• Move your cursor to chase the emoji</li>
//               <li>• The emoji will run away when you get close</li>
//               <li>• Try to corner it... good luck! 😈</li>
//               <li>• Use the stop button to pause the game</li>
//             </ul>
//           </div>

//           {/* Fun Message */}
//           <div className="absolute bottom-4 right-4 bg-purple-500/80 text-white rounded-lg p-3">
//             <p className="text-sm font-medium">
//               🎯 Distance: {Math.round(Math.sqrt(
//                 Math.pow(mousePosition.x - emojiPosition.x, 2) + 
//                 Math.pow(mousePosition.y - emojiPosition.y, 2)
//               ))}px
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-8">
//       {/* Game Title */}
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold text-purple-800 mb-2">
//           🏃‍♂️ Catch Me If You Can! 
//         </h2>
//         <p className="text-lg text-purple-600">
//           Try to catch the emoji with your cursor... if you can! 😏
//         </p>
//       </div>

//       {/* Start Game Button */}
//       <div className="text-center">
//         <button
//           onClick={startGame}
//           className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
//         >
//           ▶️ Start Game
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CatchMeGame;