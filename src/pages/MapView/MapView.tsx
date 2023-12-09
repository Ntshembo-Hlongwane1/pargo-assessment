/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Online, Offline } from 'react-detect-offline';
import NoConnection from '@assets/animations/no-internet.json';
import Lottie from 'react-lottie';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MovingMarker } from '@src/Components/MovingMarker/MovingMarker';
import 'leaflet/dist/leaflet.css';
import { Text } from '@src/Components/Text/Text.component';
import './MapView.scss';
import Timeline from 'react-time-line';
import { calculateDistance } from '@src/Util/Util';

const dataCoordinate = [
  [-23.874171816854005, 29.51063201026687],
  [-23.870404295553513, 29.52985861696944],
  [-23.84779686594707, 29.539471920320732],
  [-23.83900402251348, 29.562818514173863],
  [-23.82267287427465, 29.577925133725888],
  [-23.806339670518746, 29.604018385679385],
  [-23.80005712197331, 29.619125005231403],
  [-23.784977765865463, 29.639724940984166],
  [-23.773667100731547, 29.649338244335453],
  [-23.728414607242694, 29.712511380643924],
  [-23.722128295242523, 29.730364658296317],
  [-23.718356362552548, 29.793537794604784],
  [-23.70326754091165, 29.836110995160485],
  [-23.66428001142354, 29.882804182866746],
  [-23.63534626413214, 29.90477744766969],
  [-23.624022621720524, 29.940484002974472],
  [-23.61018128494401, 29.98305720353018],
  [-23.60766452119507, 30.025630404085884],
  [-23.602630848750035, 30.080563566093247],
  [-23.59130437927481, 30.091550198494723],
  [-23.5699072678205, 30.130003401795857],
  [-23.5459887246339, 30.15472332469917],
  [-23.51828813270904, 30.173949931401747],
  [-23.501916860697314, 30.20141651240543],
  [-23.49687913689287, 30.23712306771021],
  [-23.477985957763217, 30.25634967441279],
  [-23.46160967993177, 30.276949610165552],
  [-23.46664875109747, 30.307162849269602],
  [-23.46286946575759, 30.334629430273278],
  [-23.447751242497464, 30.36346934032715],
  [-23.441451472048353, 30.393682579431196],
  [-23.423810517100453, 30.414282515183952],
  [-23.46937956404088, 30.30436648403808],
  [-23.465757179741665, 30.32542795372376],
  [-23.462134696023295, 30.35175479083086],
  [-23.44100156013234, 30.368867234950482],
  [-23.422884753140053, 30.41033200339416],
  [-23.408993520170274, 30.424811763803064],
  [-23.393288631377793, 30.438633353284292],
  [-23.3818108040142, 30.461011164825326],
  [-23.373352820796683, 30.494577879268036],
  [-23.367915261234767, 30.526170083796554],
  [-23.364109656372847, 30.56075576513571],
  [-23.366102691805963, 30.57781418274964],
  [-23.359838765310418, 30.592081222935835],
  [-23.355282996616626, 30.610070099692347],
  [-23.35243556174613, 30.6203051502607],
  [-23.336783203759094, 30.66611118360247],
  [-23.33457903295457, 30.672960478544304],
  [-23.3313577874341, 30.6762902448785],
  [-23.32737207045349, 30.679203790420917],
  [-23.32475440092161, 30.681005793430444],
  [-23.323624018034526, 30.682015827822926],
  [-23.32311276534245, 30.68212659953617],
  [-23.32269897449223, 30.6813648521648],
  [-23.322489678291763, 30.680950337798755],
  [-23.32351430251308, 30.680242234608457],
  [-23.3238950093473, 30.678122107887216],
  [-23.325205330826115, 30.67765003909369],
  [-23.325806301016886, 30.67717797030017],
  [-23.326298897546025, 30.676813189874306],
  [-23.32686991504381, 30.67637356583598],
];

let setPositionInterval: any = null;

export const MapView = () => {
  // STATE & REFS
  const [nextPosition, setNextPosition] = useState([
    -23.874171816854005, 29.51063201026687,
  ]);
  const currentIndexRef = useRef(0);
  const [distanceRemaining, setDistanceRemaining] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');

  // SETTING
  const duration = 5 * 1000; // 1000 ms = 1 sec

  const [events, setEvents] = useState([
    { ts: '2023-12-06T12:22:46.587Z', text: 'Order Paid' },
    { ts: '2023-12-07T20:22:46.587Z', text: 'Shipped' },
  ]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NoConnection,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // SIDE EFFECT INTERVAL
  useEffect(() => {
    setPositionInterval = setInterval(() => {
      currentIndexRef.current < dataCoordinate.length &&
        setNextPosition(dataCoordinate[currentIndexRef.current]);
      currentIndexRef.current = currentIndexRef.current + 1;

      try {
        const currentCoordinate = dataCoordinate[currentIndexRef.current];
        const destinationCoordinate = dataCoordinate[dataCoordinate.length - 1];
        // Calculate remaining distance
        const remainingDistance = calculateDistance(
          { latitude: currentCoordinate[0], longitude: currentCoordinate[1] },
          {
            latitude: destinationCoordinate[0],
            longitude: destinationCoordinate[1],
          },
        );

        // Assuming a constant speed of 50 km/h, calculate remaining time
        const speed = 50; // Speed in km/h
        const remainingTime = remainingDistance / speed;

        setTimeRemaining(`Remaining Time: ${remainingTime.toFixed(2)}hrs`);
        setDistanceRemaining(
          `Remaining Distance: ${remainingDistance.toFixed(2)}km`,
        );
      } catch (error) {
        setTimeRemaining(`Remaining Time: 0hrs`);
        setDistanceRemaining(`Remaining Distance: Arrived`);
        const eventsCopy = [...events];
        const deliverEvent = {
          ts: new Date().toISOString(),
          text: 'Delivered',
        };
        const signedEvent = {
          ts: new Date().toISOString(),
          text: 'Signed by Junior',
        };
        eventsCopy.push(deliverEvent);
        eventsCopy.push(signedEvent);
        setEvents(eventsCopy);
      }
    }, duration);

    return () => clearInterval(setPositionInterval);
  }, []);

  useEffect(() => {
    console.log(`MapView - 156`, navigator.onLine);
  }, []);

  return (
    <div className='trackingcontainer'>
      <div>
        <Text
          text='Track Your Pargo Order'
          variant='title'
          color='#000'
          fontSize={30}
        />
        <Offline>
          <div className='tracking_noconnection'>
            <Text
              text='No internt connection'
              variant='paragraph'
              color='red'
              fontSize={18}
            />
          </div>
        </Offline>
      </div>
      <div className='trackingcontainer_mapconatiner'>
        <div
          className='trackingcontainer_mapconatiner-map'
          style={{ width: '500px', height: '300px' }}
        >
          <Online>
            <MapContainer
              center={[-23.874171816854005, 29.51063201026687]}
              zoom={11}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <MovingMarker nextPosition={nextPosition} duration={duration} />
            </MapContainer>
          </Online>
          <Offline>
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
              isStopped={false}
              isPaused={false}
            />
          </Offline>
          <Online>
            <div className='map-content'>
              <Text
                text={distanceRemaining}
                variant='subheading'
                fontSize={20}
                color='#000'
              />
              <Text
                text={timeRemaining}
                variant='paragraph'
                fontSize={18}
                color='#000'
              />
            </div>
          </Online>
        </div>
        <div className='trackingcontainer_mapconatiner-timeline'>
          <Timeline items={events} />
        </div>
      </div>
    </div>
  );
};
