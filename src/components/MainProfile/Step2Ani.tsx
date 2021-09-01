import { useSpring, animated, config } from "react-spring";
import { texts } from "../../assets/text";
import { ScaleLoader } from 'react-spinners'
import './Profile.css'

const Step2Ani = () => {

  const [springProps, api] = useSpring(() => ({
    to: { marginTop: 0, opacity: 1 },
    from: { marginTop: -500, opacity: 0 },
    config: config.molasses,
  }));

  api.start({to: { opacity: 0 },
      from: { opacity: 1 },
      delay: 4000,
      config: config.molasses })

  return ( 
    <animated.div style={springProps} className='userCard'>
      <p >{texts.step3}</p>
      <ScaleLoader color='green' loading/>
    </animated.div>
  )
};

export default Step2Ani;
