import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { HackerRoom } from '../components/HackerRoom';
import { CanvasLoader } from '../components/CanvasLoader';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants';
import { Target } from '../components/Target';
import { ReactLogo } from '../components/ReactLogo';
import { Cube } from '../components/Cube';
import { Rings } from '../components/Ring';
import HeroCamera from '../components/HeroCamera';
import { Button } from '../components/Button';

export const Hero = () =>
{
    // const x = useControls('HackerRoom', {
    //     rotationX: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     rotationY: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     rotationZ: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     scaleX: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     scaleY: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     scaleZ: {
    //         value: 2.5,
    //         min: -10,
    //         max: 10
    //     },
    //     positionX: {
    //         value: 2.5,
    //         min: -100,
    //         max: 100
    //     },
    //     positionY: {
    //         value: 2.5,
    //         min: -100,
    //         max: 100
    //     },
    //     positionZ: {
    //         value: 2.5,
    //         min: -100,
    //         max: 100
    //     }
    // });
    const isSmall = useMediaQuery({
        maxWidth: 440
    })
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const sizes = calculateSizes(isSmall, isMobile, isTablet)
    return (
        <section className="min-h-screen border-0 w-full flex-col relative">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className='sm:text-3xl text-2xl font-medium text-white text-center'>
                    Hi, I am Manish Kushwaha <span className='waving-hand'>👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">
                    Web Developer | Team Lead
                </p>
            </div>
            <div className="w-full h-full absolute inset-0">
                {/* <Leva /> */}
                <Canvas className='w-full h-full'>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        <HeroCamera isMobile={isMobile} >
                            <HackerRoom
                                scale={sizes.deskScale}
                                rotation={[0, -Math.PI, 0]}
                                position={sizes.deskPosition}
                            />
                        </HeroCamera>
                        <group>

                            <Target position={sizes.targetPosition} />
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />
                        </group>
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />

                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute bottom-7 left-0 ring-0 w-full z-10 c-space ">

                <a href="#contact" className='w-fit' >
                    <Button name="Let's work together" isBeam containerClass='sm:w-fit w-full sm:min-w-96' />
                </a>
            </div>
        </section>
    );
};
