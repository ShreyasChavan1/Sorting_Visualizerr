import React, { useEffect, useRef } from 'react';
import RINGS from 'vanta/dist/vanta.rings.min'
import WAVES from 'vanta/dist/vanta.waves.min'
import NET from 'vanta/dist/vanta.net.min'
import GLOB from 'vanta/dist/vanta.globe.min'
import * as THREE from 'three';
import vantaWavesMin from 'vanta/dist/vanta.waves.min';
import DOTS from 'vanta/dist/vanta.dots.min'


const VantaBackground2 = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = GLOB({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        THREE
      })

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: '100%', height: '103vh' }} />;
};

export default VantaBackground2;
