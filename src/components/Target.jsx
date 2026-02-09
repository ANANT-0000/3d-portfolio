import { useGSAP } from '@gsap/react'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { useRef } from 'react'

export const Target = (props) =>
{
    const targetRef = useRef(null)
    const { scene } = useGLTF('/models/react_logo.glb')
    useGSAP(() =>
    {
        gsap.to(targetRef.current.position, {
            y: targetRef.current.position.y + 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true
        })
    })
    return (
        <>
            <mesh  {...props} scale={2} ref={targetRef} rotation={[0, Math.PI / 5, 0]} >

                <primitive object={scene} />
            </mesh>
        </>
    )
}
