import React, { useState, useEffect, useRef } from 'react';

const ProjectDots = ({ count = 2, activeIndex = 0, onSelect }) =>
{
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef(null);

    const handleDragStart = (e) =>
    {
        e.preventDefault();
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setDragOffset(0);
    };

    const handleDragMove = (e) =>
    {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDragOffset(clientX - startX);
    };

    const handleDragEnd = () =>
    {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 40;
        if (dragOffset < -threshold && onSelect)
        {
            onSelect(Math.min(activeIndex + 1, count - 1));
        } else if (dragOffset > threshold && onSelect)
        {
            onSelect(Math.max(activeIndex - 1, 0));
        }

        setDragOffset(0);
        setStartX(0);
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
    }, [isDragging, dragOffset, startX, activeIndex]);

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center gap-3 py-4 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
        >
            {/* Track */}
            <div
                className="relative flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                    background: 'linear-gradient(180deg, rgba(30,30,30,0.8) 0%, rgba(20,20,20,0.9) 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.05)',
                    border: '1px solid rgba(60,60,60,0.3)',
                }}
            >
                {Array.from({ length: count }).map((_, index) =>
                {
                    const isActive = index === activeIndex;
                    const dragInfluence = isDragging ? (dragOffset * 0.02) : 0;

                    return (
                        <button
                            key={index}
                            onClick={() => onSelect && onSelect(index)}
                            className="relative transition-all duration-300"
                            style={{
                                transform: `translateX(${isActive ? dragInfluence : 0}px)`,
                            }}
                        >
                            {/* Dot */}
                            <div
                                className={`
                                    rounded-full transition-all duration-300
                                    ${isActive ? 'w-8 h-3' : 'w-3 h-3'}
                                `}
                                style={{
                                    background: isActive
                                        ? 'linear-gradient(90deg, rgba(150,150,150,0.9) 0%, rgba(100,100,100,0.8) 100%)'
                                        : 'rgba(60,60,60,0.6)',
                                    boxShadow: isActive
                                        ? 'inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)'
                                        : 'inset 0 1px 2px rgba(0,0,0,0.3)',
                                }}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Drag hint */}
            <div className="flex gap-0.5 opacity-30 ml-2">
                <div className="w-0.5 h-3 rounded-full bg-gray-500" />
                <div className="w-0.5 h-3 rounded-full bg-gray-500" />
                <div className="w-0.5 h-3 rounded-full bg-gray-500" />
            </div>
        </div>
    );
};

export default ProjectDots;
