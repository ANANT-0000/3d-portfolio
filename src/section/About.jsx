import React, { useState } from 'react'
import Globe from 'react-globe.gl'
import { Button } from '../components/Button'
import ArcSlider from '../components/ArcSlider'
import SkillWheel from '../components/SkillWheel'

export const About = () =>
{
    const [hasCopied, setHasCopied] = useState(false)
    const handleCopy = () =>
    {
        navigator.clipboard.writeText("manishkushwaha2525@gmail.com")
        setHasCopied(true)
        setTimeout(() =>
        {
            setHasCopied(false)
        }, 2000)
    }
    return (
        <section id="about" className='c-space my-20  '>
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">

                <div className="col-span-1 xl:row-span-3">

                    <div className="grid-container ">
                        <img src="/assets/grid1.png" alt="grid-1" className='w-full sm:h-[276px] h-fit object-contain' />
                        <div className="">
                            <p className='grid-headtext' >Hi, I'm Manish Kushwaha</p>
                            <p className='grid-subtext'>Driven Computer Engineering diploma student with expertise in MERN stack development. Currently pursuing my diploma at Bhagwan Mahavir University with a CGPA of 9.1.</p>
                        </div>
                    </div>

                </div>

                <div className="col-span-1 xl:row-span-3 ">
                    <div className="grid-container items-center justify-center">
                        <div className="flex items-center justify-center py-2">
                            <SkillWheel />
                        </div>
                        <div className="text-center">
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext text-sm leading-relaxed">React.js, Redux, JavaScript, TypeScript, TailwindCSS, Node.js, Express.js, MongoDB, MySQL, Python, Git & GitHub.</p>
                        </div>
                    </div>

                </div>
                <div className="col-span-1 xl:row-span-4 ">
                    <div className="grid-container items-center">
                        <div className="rounded-3xl w-full sm:h-[326px] h=fit flex justify-center items-center">
                            <Globe height={326}
                                width={326} backgroundColor='rgba(0,0,0,0)'
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                                bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'

                            />
                        </div>
                        <div>
                            <p className="grid-headtext"> I work remotely across most timezones. </p>
                            <p className="grid-subtext">I'm based in India ,with remote work available</p>
                            <Button name={'Contact Me'} isBeam containerClass={'w-full mt-10'} />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container items-center">
                        <img src="/assets/grid3.png" alt="grid3" className='w-full sm:h-[276p] h-fit object-contain' />
                        <div>
                            <p className="grid-headtext">My Passion for Coding</p>
                            <p className="grid-subtext">I love solving problems and building things through code. Winner of InnovationX Hackathon. Coding isn't just my profession - it's my passion!</p>
                        </div>
                    </div>

                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container items-center">
                        <ArcSlider />
                        <div className="space-y-2">

                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={`/assets/${hasCopied ? 'tick.svg' : 'copy.svg'}`} alt="copy" />
                                <p className='lg:text-xl md:text-xl font-medium text-gray_gradient text-white'>
                                    manishkushwaha2525@gmail.com
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}
