import React, { useState, useEffect, useRef } from 'react';
import
    {
        SiReact,
        SiNodedotjs,
        SiJavascript,
        SiTailwindcss,
        SiTypescript,
        SiMongodb,
        SiGit,
        SiPython
    } from 'react-icons/si';

const SkillWheel = () =>
{
    const skills = [
        { name: 'React', Icon: SiReact, color: '#61DAFB' },
        { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
        { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
        { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
        { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ];

    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startAngle, setStartAngle] = useState(0);
    const wheelRef = useRef(null);
    const itemCount = skills.length;
    const anglePerItem = 360 / itemCount;

    // Slow auto-rotate
    useEffect(() =>
    {
        if (isDragging) return;
        const interval = setInterval(() =>
        {
            setRotation(prev => prev + 0.3);
        }, 30);
        return () => clearInterval(interval);
    }, [isDragging]);

    const getAngleFromEvent = (e) =>
    {
        if (!wheelRef.current) return 0;
        const rect = wheelRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    };

    const handleDragStart = (e) =>
    {
        setIsDragging(true);
        setStartAngle(getAngleFromEvent(e) - rotation);
    };

    const handleDragMove = (e) =>
    {
        if (!isDragging) return;
        const currentAngle = getAngleFromEvent(e);
        setRotation(currentAngle - startAngle);
    };

    const handleDragEnd = () =>
    {
        setIsDragging(false);
    };

    useEffect(() =>
    {
        if (isDragging)
        {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove);
            window.addEventListener('touchend', handleDragEnd);
        }
        return () =>
        {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, startAngle]);

    return (
        <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Outer glow ring */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(30,30,35,0.4) 50%, rgba(15,15,20,0.6) 100%)',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(50,50,60,0.15)',
                    border: '1px solid rgba(50,50,60,0.25)',
                }}
            />

            {/* Rotating wheel */}
            <div
                ref={wheelRef}
                className="relative w-40 h-40 rounded-full cursor-grab active:cursor-grabbing"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.03s linear',
                }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                {skills.map((skill, index) =>
                {
                    const angle = index * anglePerItem - 90;
                    const radius = 60;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    const Icon = skill.Icon;

                    return (
                        <div
                            key={skill.name}
                            className="absolute flex items-center justify-center"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                                transition: isDragging ? 'none' : 'transform 0.03s linear',
                            }}
                        >
                            {/* Icon container */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center group transition-all duration-300 hover:scale-110"
                                style={{
                                    background: 'linear-gradient(145deg, rgba(40,40,50,0.95) 0%, rgba(25,25,35,0.98) 100%)',
                                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.5), 0 0 15px ${skill.color}15`,
                                    border: `1px solid rgba(70,70,80,0.35)`,
                                }}
                                title={skill.name}
                            >
                                <Icon
                                    size={22}
                                    color={skill.color}
                                    className="transition-all duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Center hub */}
            <div
                className="absolute w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(55,55,65,0.95), rgba(20,20,30,0.98))',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.1)',
                    border: '1px solid rgba(70,70,80,0.3)',
                }}
            >
                <span className="text-gray-300 text-xs font-semibold tracking-wide">Skills</span>
            </div>
        </div>
    );
};

export default SkillWheel;
