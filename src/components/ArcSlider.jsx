import React, { useState, useEffect, useRef } from 'react';

const ArcSlider = () => {
    const [activeIndex, setActiveIndex] = useState(2); // 8 is center (index 2)
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef(null);
    const items = [6, 7, 8, 9, 10];

    // Auto-rotate through items (paused while dragging)
    useEffect(() => {
        if (isDragging) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [isDragging]);

    // Handle drag start
    const handleDragStart = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setDragOffset(0);
    };

    // Handle drag move
    const handleDragMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const diff = clientX - startX;
        setDragOffset(diff);
    };

    // Handle drag end
    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        
        // Determine direction and change active index
        const threshold = 30; // Minimum drag distance to change item
        
        if (dragOffset < -threshold) {
            // Dragged left - go to next item
            setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
        } else if (dragOffset > threshold) {
            // Dragged right - go to previous item
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
        
        setDragOffset(0);
        setStartX(0);
    };

    // Add/remove global event listeners for drag
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove);
            window.addEventListener('touchend', handleDragEnd);
        }
        
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, dragOffset, startX]);

    // Arc positions - each item has x offset and y offset to create the curved effect
    const getItemStyle = (index) => {
        const isActive = index === activeIndex;
        const distance = index - 2; // Distance from center position (index 2)
        
        // Apply drag offset to horizontal position
        const dragInfluence = isDragging ? dragOffset * 0.3 : 0;
        
        // Curved arc positioning
        const xOffset = distance * 38 + dragInfluence; // Horizontal spread + drag
        const yOffset = Math.abs(distance) * Math.abs(distance) * 8; // Parabolic curve
        
        // Scale based on distance from active
        const distanceFromActive = Math.abs(index - activeIndex);
        const scale = isActive ? 1 : Math.max(0.6 - distanceFromActive * 0.08, 0.45);
        const opacity = isActive ? 1 : Math.max(0.5 - distanceFromActive * 0.12, 0.2);
        
        return {
            transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale})`,
            opacity,
            zIndex: isActive ? 10 : 5 - distanceFromActive,
            transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        };
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-28 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
        >
            {/* Glow effect behind items */}
            <div 
                className="absolute w-full h-16 rounded-full opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(120,120,120,0.4), transparent)',
                }}
            />
            
            {/* Items container - positioned at center */}
            <div className="relative flex items-end justify-center pointer-events-none" style={{ height: '80px' }}>
                {items.map((num, index) => {
                    const isActive = index === activeIndex;
                    const style = getItemStyle(index);

                    return (
                        <div
                            key={num}
                            className="absolute"
                            style={{
                                ...style,
                                left: '50%',
                                marginLeft: '-20px',
                            }}
                        >
                            {/* Pill-shaped button */}
                            <div 
                                className={`
                                    flex items-center justify-center
                                    ${isActive 
                                        ? 'w-10 h-14 rounded-full' 
                                        : 'w-9 h-9 rounded-full'
                                    }
                                `}
                                style={{
                                    background: isActive 
                                        ? 'linear-gradient(180deg, rgba(80,80,80,0.9) 0%, rgba(40,40,40,0.95) 100%)'
                                        : 'linear-gradient(180deg, rgba(60,60,60,0.6) 0%, rgba(30,30,30,0.7) 100%)',
                                    boxShadow: isActive
                                        ? 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.4)'
                                        : 'inset 0 1px 1px rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.3)',
                                    border: isActive ? '1px solid rgba(100,100,100,0.5)' : '1px solid rgba(70,70,70,0.3)',
                                    transition: isDragging ? 'width 0.3s, height 0.3s' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }}
                            >
                                <span 
                                    className={`
                                        font-medium
                                        ${isActive ? 'text-white text-base' : 'text-gray-400 text-sm'}
                                    `}
                                    style={{
                                        transition: isDragging ? 'none' : 'all 0.3s ease',
                                    }}
                                >
                                    {num}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Drag indicator hint */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 opacity-30">
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <div className="w-1 h-1 rounded-full bg-gray-400" />
            </div>

            {/* Subtle reflection on the arc */}
            <div 
                className="absolute w-48 h-8 pointer-events-none opacity-5"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)',
                    bottom: '25%',
                    borderRadius: '50%',
                }}
            />
        </div>
    );
};

export default ArcSlider;
