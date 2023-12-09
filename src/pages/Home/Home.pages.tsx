import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '@assets/animations/Pargo-Delivery.json';
import { AnimatedText } from '@src/Components/AnimatedText/AnimatedText.component';
import './Home.styles.scss';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate after 8 seconds (8000 milliseconds)
    const timeoutId = setTimeout(() => {
      // Use the navigate function to go to another page
      navigate('/track');
    }, 8000);

    // Clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className='homecontainer'>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
      />
      <div className='homecontainer_animatedtext'>
        <AnimatedText
          texts={[
            'Track Your Pargo: Effortless Order Monitoring!',
            'Pargo Delivers: Seamless Delivery Experience!',
            'Click & Collect Magic: Your Items, Your Way!',
          ]}
        />
      </div>
    </div>
  );
};
