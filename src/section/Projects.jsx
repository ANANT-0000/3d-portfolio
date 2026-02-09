import React, { Suspense, useState } from 'react'
import { myProjects } from '../constants'
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { CanvasLoader } from '../components/CanvasLoader';
import { DemoComputer } from '../components/DemoComputer';
import ProjectDots from '../components/ProjectDots';
const projectCount = myProjects.length;

export const Projects = () =>
{
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const currentProject = myProjects[selectedProjectIndex];
  const handleNavigation = (direction) =>
  {
    setSelectedProjectIndex((prevIndex) =>
    {
      if (direction === "previous")
      {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else
      {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    }
    )
  }
  return (
    <section id="projects" className="c-space my-20">
      <p className="head-text">
        My Work
      </p>
      <div className=" lg:flex   flex-row  gap-10 w-full">
        <div className="flex basis-1/2 flex-col gap-5 relative sm:p-10 px-5 shadow-2xl shadow-black/10">
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight"
              className='w-full h-96 object-cover rounded-xl'
            />
          </div>
          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg " style={currentProject.logoStyle}>
            <img src={currentProject.logo} alt="logo" className='w-10 h-10 shadow-sm' />
          </div>
          <div className="flex flex-col gap-5 text-white/90 my-5">
            <div className="text-white text-2xl font-semibold animatedText">{currentProject.title}</div>
            <p className="animatedText text-base font-thin">
              {currentProject.desc}{currentProject.subdesc}
            </p>
            {/* <p className="animatedText text-base font-thin">
  
</p> */}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3" >


              {currentProject.tags.map((tag, index) => (
                <div className="tech-logo" key={index}>
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>
            <a href={currentProject.href} target='_blank' rel='noreferrer' className='text-base font-light flex items-center gap-2 cursor-pointer text-white/70'>
              <p>

                Check Live Site
              </p>
              <img src="/assets/arrow-up.png" alt="arrow" className='w-3 h-3' />
            </a>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src={'/assets/left-arrow.png'} alt="left-arrow" className='w-4 h-4' />
            </button>
            <ProjectDots
              count={projectCount}
              activeIndex={selectedProjectIndex}
              onSelect={setSelectedProjectIndex}
            />
            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src={'/assets/right-arrow.png'} alt="right-arrow" className='w-4 h-4' />
            </button>

          </div>

        </div>
        <Canvas style={{ background: 'rgba(25,25,25)', borderRadius: '20px', height: '' }} >
          <ambientLight intensity={5} />
          <directionalLight position={[10, 20, 5]} intensity={3} />
          <Center>
            <Suspense fallback={<CanvasLoader />} >
              <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]} >

                <OrbitControls
                  enableZoom={false}
                />

                <DemoComputer videoTxt={myProjects[selectedProjectIndex].texture} />
              </group>

            </Suspense>

          </Center>

        </Canvas>




      </div>

    </section>
  )
}
