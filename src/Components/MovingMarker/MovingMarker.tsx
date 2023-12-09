/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

// LEAFLET
// @ts-ignore
import L from 'leaflet';
import 'leaflet.motion/dist/leaflet.motion';
import { Marker, useMap } from 'react-leaflet';

declare module 'leaflet' {
  interface L {
    motion: any; // Replace 'any' with the actual type of the 'motion' property
  }
}

export const MovingMarker = ({ nextPosition, duration }: any) => {
  // CONTEXT
  const mapContext = useMap();

  // STATE
  const [prevPosition, setPrevPosition] = useState(nextPosition);
  const [isMoving, setIsMoving] = useState(true);

  // ICON
  const iconCar = L.icon({
    iconUrl: 'https://pargo.co.za/wp-content/themes/pargo/assets/img/logo.svg',
    iconSize: L.point(30, 30),
  });

  // SIDE EFFECT LEAFLET MOTION
  useEffect(() => {
    if (
      prevPosition[0] !== nextPosition[0] &&
      prevPosition[1] !== nextPosition[1]
    ) {
      setIsMoving(true);
      setPrevPosition(nextPosition);

      // CREATE ANIM MOVING
      // @ts-ignore
      L.motion
        .polyline(
          [prevPosition, nextPosition],
          {
            color: 'red',
            weight: 6,
          },
          {
            auto: true,
            duration: duration,
            // @ts-ignore
            easing: L.Motion.Ease.linear,
          },
          {
            removeOnEnd: true,
            showMarker: true,
            icon: iconCar,
          },
        )
        .addTo(mapContext);

      // FOLLOW MARKER
      mapContext.setView(nextPosition, mapContext.getZoom());
    }
    if (
      nextPosition[0] === -23.32686991504381 &&
      nextPosition[1] === 30.67637356583598
    ) {
      setIsMoving(false);
    }
  }, [nextPosition]);

  return !isMoving && <Marker position={prevPosition} icon={iconCar} />;
};
