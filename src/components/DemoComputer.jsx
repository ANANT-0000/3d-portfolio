import React, { useRef } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function DemoComputer ({ videoTxt, ...props })
{
    const groupRef = useRef()
    const { nodes, materials } = useGLTF('/models/personal_computer.glb')
    const txt = useVideoTexture(videoTxt)

    useGSAP((state, delta) =>
    {
        gsap.from(groupRef.current.rotation, {
            y: Math.PI / 2,
            duration: 1,
            ease: 'power3.out'
        })
    }, videoTxt)
    console.log(videoTxt);
    return (
        <group {...props} ref={groupRef} >
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.008}
                position={[.56, 0.8, -0.8]}
            >
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube_PC_0.geometry}
                            material={materials.material}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube_LightMat_0.geometry}
                            material={materials.LightMat}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube_Screen_0.geometry}
                            material={materials.Screen}

                        >
                            <meshBasicMaterial map={txt} />

                        </mesh>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cube_Keyboard_0.geometry}
                            material={materials.Keyboard}
                        />
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/personal_computer.glb')
