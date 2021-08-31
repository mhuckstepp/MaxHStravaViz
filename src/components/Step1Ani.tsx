import React from "react";
import { useSpring, animated, config } from "react-spring";
import { texts } from "../assets/text";
import { ScaleLoader } from 'react-spinners'
import './Profile/Profile.css'

const Step1Ani = () => {
  const springProps = useSpring({
    to: { marginTop: 0 },
    from: { marginTop: -500 },
    config: config.molasses,
  });

  return ( 
    <animated.div style={springProps} className='userCard'>
      <p >{texts.step1}</p>
      <ScaleLoader color='green' loading/>
    </animated.div>
  )
};

export default Step1Ani;
