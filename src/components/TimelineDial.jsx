import React, { useState, useEffect, useRef } from 'react';

const TimelineDial = ({ items = [], activeIndex = 0, onSelect }) =>
{
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef(null);

    const handleDragStart = (e) =>
    {
        e.preventDefault();
        setIsDragging(true);
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setStartY(clientY);
        setDragOffset(0);
    };

    const handleDragMove = (e) =>
    {
        if (!isDragging) return;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setDragOffset(clientY - startY);
    };

    const handleDragEnd = () =>
    {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 30;
        if (dragOffset > threshold && onSelect)
        {
            // Dragged down - go to previous
            onSelect(Math.max(activeIndex - 1, 0));
        } else if (dragOffset < -threshold && onSelect)
        {
            // Dragged up - go to next
            onSelect(Math.min(activeIndex + 1, items.length - 1));
        }

        setDragOffset(0);
        setStartY(0);
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
    }, [isDragging, dragOffset, startY, activeIndex]);

    const getItemStyle = (index) =>
    {
        const distance = index - activeIndex;
        const dragInfluence = isDragging ? dragOffset * 0.3 : 0;
        const yOffset = distance * 45 + dragInfluence;
        const scale = index === activeIndex ? 1 : Math.max(0.7 - Math.abs(distance) * 0.1, 0.5);
        const opacity = index === activeIndex ? 1 : Math.max(0.5 - Math.abs(distance) * 0.15, 0.2);

        return {
            transform: `translateY(${yOffset}px) scale(${scale})`,
            opacity,
            zIndex: items.length - Math.abs(distance),
            transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        };
    };

    return (
        <div
            ref={containerRef}
            className="relative h-40 flex items-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
        >
            {/* Left track line */}
            <div
                className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-24 rounded-full"
                style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(80,80,80,0.5) 50%, transparent 100%)',
                }}
            />

            {/* Items */}
            <div className="relative w-full flex flex-col items-start pl-10">
                {items.map((item, index) =>
                {
                    const isActive = index === activeIndex;
                    const style = getItemStyle(index);

                    return (
                        <div
                            key={index}
                            className="absolute left-8 flex items-center gap-3"
                            style={style}
                            onClick={() => onSelect && onSelect(index)}
                        >
                            {/* Dial notch */}
                            <div
                                className={`
                                    rounded-full transition-all duration-300
                                    ${isActive ? 'w-4 h-4' : 'w-2 h-2'}
                                `}
                                style={{
                                    background: isActive
                                        ? 'linear-gradient(135deg, rgba(180,180,180,1) 0%, rgba(120,120,120,1) 100%)'
                                        : 'rgba(80,80,80,0.6)',
                                    boxShadow: isActive
                                        ? '0 0 8px rgba(150,150,150,0.5), inset 0 1px 1px rgba(255,255,255,0.3)'
                                        : 'inset 0 1px 2px rgba(0,0,0,0.3)',
                                }}
                            />

                            {/* Label */}
                            <span
                                className={`
                                    text-sm font-medium whitespace-nowrap transition-all duration-300
                                    ${isActive ? 'text-white' : 'text-gray-500'}
                                `}
                            >
                                {item.label || item}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Drag indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-30">
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <div className="w-1 h-1 rounded-full bg-gray-400" />
            </div>
        </div>
    );
};

export default TimelineDial;
