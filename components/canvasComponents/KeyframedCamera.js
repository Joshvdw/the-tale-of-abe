import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations, useHelper, OrbitControls } from '@react-three/drei'
import { useSpring, config } from "@react-spring/three";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

export function KeyframedCamera(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/glbs/camera-frames.glb')
  const { actions } = useAnimations(animations, group)
  const cameraRef = useRef()
  // useHelper(cameraRef, THREE.CameraHelper)

  useEffect(()=> {
    if(actions["camera-animation"] !== undefined) {
      actions["camera-animation"].play().paused = true;
    }
  })

  // const options = {
  //   // mass: 1,
  //   // tension: 260,
  //   // friction: 100,
  //   // precision: 0.0000001,
  //   // velocity: 2,
  //   // clamp: true,  
  // }

  const [{ y }, setScroll] = useSpring(()=> ({
    y: [0],
    config: config.molasses
  }))

  const handleScroll = () => {
    setScroll({
      y: [window.scrollY / (document.body.offsetHeight - window.screen.height)]
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll])
  
    useFrame(() => {
      y.to((y) => {
        actions["camera-animation"].time = actions["camera-animation"].getClip().duration * y
      })
    })        
        
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Camera"
         position={[0.05, 1.58, 0.91]} 
         rotation={[1.55, 0, 0]}
        >
          {/* <OrbitControls /> */}
          <PerspectiveCamera 
            ref={cameraRef} 
            name="Camera_Orientation"
            makeDefault={true} 
            // far={100} 
            // near={0.1} 
            fov={22.9} 
            rotation={[-Math.PI / 2, 0, 0]} 
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/camera-frames.glb')
