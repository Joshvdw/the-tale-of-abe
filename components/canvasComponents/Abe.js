import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Abe(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/glbs/Abe.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['walk'].play()
  },[])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="abe"
         rotation={[Math.PI / 2, 0, 0]} 
         scale={0.01}
         >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh frustumCulled={false} name="Ch39" geometry={nodes.Ch39.geometry} material={materials.Ch39_Body} skeleton={nodes.Ch39.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/Abe.glb')
