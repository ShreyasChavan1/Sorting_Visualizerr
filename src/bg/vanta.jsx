import React, { useEffect, useRef } from 'react';
// import RINGS from 'vanta/dist/vanta.rings.min';
import RINGS from 'vanta/dist/vanta.rings.min'
import * as THREE from 'three';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = RINGS({
      el: vantaRef.current,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00, 
      THREE, 
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: '100%', height: '235vh' }} />;
};

export default VantaBackground;
