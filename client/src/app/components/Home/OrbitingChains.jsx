"use client";

import React from 'react';
import Image from 'next/image';
import { SiEthereum, SiSolana, SiPolygon, SiBinance } from 'react-icons/si';

const OrbitingIcon = ({ radiusClass, duration, reverse, icon, positionClass }) => {
    // radiusClass controls the size of the invisible ring
    // positionClass places the item on the ring (e.g. top-0 left-1/2)
    return (
        <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${radiusClass} rounded-full z-30`}
            style={{ 
                animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}` 
            }}
        >
            <div className={`absolute ${positionClass} -translate-x-1/2 -translate-y-1/2`}>
                <div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-md"
                    style={{ 
                        animation: `spin ${duration}s linear infinite ${reverse ? '' : 'reverse'}` 
                    }}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default function OrbitingChains() {
    return (
        <div className="relative flex items-center justify-center w-full h-[400px] md:h-[500px] max-w-[500px]">
            
            {/* Center Logo / Sun - Smaller and perfectly centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#050505] border border-cyan-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <Image 
                    src="/Images/logo.png" 
                    width={40} 
                    height={40} 
                    alt="TxShield Center" 
                    className="w-[50%] h-[50%] object-contain opacity-90"
                />
            </div>

            {/* Inner Orbit (Duration 12s, Clockwise) - Fixed size 180px */}
            <OrbitingIcon 
                radiusClass="w-[180px] h-[180px] md:w-[200px] md:h-[200px]" 
                duration={12} 
                reverse={false} 
                positionClass="top-0 left-1/2" 
                icon={<SiEthereum className="text-cyan-400 w-4 h-4 md:w-5 md:h-5" />} 
            />
            <OrbitingIcon 
                radiusClass="w-[180px] h-[180px] md:w-[200px] md:h-[200px]" 
                duration={12} 
                reverse={false} 
                positionClass="bottom-0 left-1/2" 
                icon={<SiSolana className="text-purple-400 w-4 h-4 md:w-5 md:h-5" />} 
            />

            {/* Middle Orbit (Duration 18s, Counter-Clockwise) - Fixed size 280px */}
            <OrbitingIcon 
                radiusClass="w-[280px] h-[280px] md:w-[320px] md:h-[320px]" 
                duration={18} 
                reverse={true} 
                positionClass="top-1/2 left-0" 
                icon={<Image src="/Images/logos/base.svg" width={16} height={16} alt="Base" className="md:w-5 md:h-5" />} 
            />
            <OrbitingIcon 
                radiusClass="w-[280px] h-[280px] md:w-[320px] md:h-[320px]" 
                duration={18} 
                reverse={true} 
                positionClass="top-1/2 right-0" 
                icon={<SiBinance className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />} 
            />

            {/* Outer Orbit (Duration 24s, Clockwise) - Fixed size 380px */}
            <OrbitingIcon 
                radiusClass="w-[380px] h-[380px] md:w-[440px] md:h-[440px]" 
                duration={24} 
                reverse={false} 
                positionClass="top-[14.6%] left-[14.6%]" 
                icon={<SiPolygon className="text-purple-500 w-4 h-4 md:w-5 md:h-5" />} 
            />
            <OrbitingIcon 
                radiusClass="w-[380px] h-[380px] md:w-[440px] md:h-[440px]" 
                duration={24} 
                reverse={false} 
                positionClass="bottom-[14.6%] right-[14.6%]" 
                icon={<Image src="/Images/logos/scroll.svg" width={16} height={16} alt="Scroll" className="invert opacity-80 md:w-5 md:h-5" />} 
            />
            <OrbitingIcon 
                radiusClass="w-[380px] h-[380px] md:w-[440px] md:h-[440px]" 
                duration={24} 
                reverse={false} 
                positionClass="bottom-[14.6%] left-[14.6%]" 
                icon={<Image src="/Images/logos/mantle.svg" width={16} height={16} alt="Mantle" className="md:w-5 md:h-5" />} 
            />
            <OrbitingIcon 
                radiusClass="w-[380px] h-[380px] md:w-[440px] md:h-[440px]" 
                duration={24} 
                reverse={false} 
                positionClass="top-[14.6%] right-[14.6%]" 
                icon={<Image src="/Images/logos/linea.svg" width={16} height={16} alt="Linea" className="md:w-5 md:h-5" />} 
            />
        </div>
    );
}
