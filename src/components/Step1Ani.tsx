import React from "react";
import { useSpring, animated, config } from "react-spring";
import { texts } from "../assets/text";

const Step1Ani = () => {
  const springProps = useSpring({
    to: { marginTop: 0 },
    from: { marginTop: -500 },
    config: config.molasses,
  });

  return <animated.p style={springProps}>{texts.step1}</animated.p>;
};

export default Step1Ani;
