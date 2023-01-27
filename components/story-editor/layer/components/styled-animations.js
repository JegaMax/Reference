import { keyframes } from 'styled-components';

const fadeInAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const pulseAnimation = keyframes`
  0%  {
    transform: scale(1);
  }

  25% {
    transform: scale(.95);
  }

  75% {
    transform: scale(1.05);
  }  

  100% {
    transform: scale(1);
  }
`;

const zoomInAnimation = ({ isFullscreen }) => {
  let scaleStart = 1;
  let scaleEnd = 1;

  if (isFullscreen) {
    scaleStart = 1;
    scaleEnd = 1.4;
  } else {
    scaleStart = 0.001;
    scaleEnd = 1;
  }

  return keyframes`
  0% {
    opacity: 0;
    transform: scale(${scaleStart}, ${scaleStart});
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(${scaleEnd}, ${scaleEnd});
  }
`;
};

const zoomOutAnimation = ({ isFullscreen }) => {
  let scaleStart = 1;
  let scaleEnd = 1;

  if (isFullscreen) {
    scaleStart = 1.4;
    scaleEnd = 1;
  } else {
    scaleStart = 1.9;
    scaleEnd = 1;
  }

  return keyframes`
  0% {    
    transform: scale(${scaleStart}, ${scaleStart});
  }
  100% {    
    transform: scale(${scaleEnd}, ${scaleEnd});
  }
`;
};

const twirlInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-540deg) scale(.1);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

const twirlOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: rotate(-540deg) scale(.1);
  }
`;

const panLeftAnimation = ({ width, offsetX, containerWidth }) => {
  const pos = containerWidth - width - offsetX;
  const maxOffsetX = containerWidth - width;

  return keyframes`
  0% {
    transform: translateX(${pos}px);    
  }
  100% {
    transform: translateX(${Math.abs(maxOffsetX - pos)}px);    
  }
`;
};

const panRightAnimation = ({ width, offsetX, containerWidth }) => {
  const pos = containerWidth - width - offsetX;
  const maxOffsetX = containerWidth - width;

  return keyframes`
  0% {
    transform: translateX(${Math.abs(maxOffsetX - pos)}px);    
  }
  100% {
    transform: translateX(${pos}px);    
  }
`;
};

const panUpAnimation = () => keyframes`
  0% {
    transform: translateY(-12.5%) scale(1.25);    
  }
  100% {            
    transform: translateY(12.5%) scale(1.25) ;      
  }
`;

const panDownAnimation = () =>
  keyframes`
  0% {
    transform: translateY(12.5%) scale(1.25);    
  }
  100% {
    transform: translateY(-12.5%) scale(1.25);   
  }
`;

const flyInBottom = ({ sin, cos, offsetY, containerHeight, isGroupLayer }) => {
  const differenceY = containerHeight * 3 - offsetY;

  if (isGroupLayer) {
    return keyframes`
    0% {
      opacity: 0;
      transform: translateY(${differenceY * cos}px);
    }
    1% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }`;
  }

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceY * sin}px, ${differenceY * cos}px);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;
};

const flyOutBottom = ({ sin, cos, offsetY, containerHeight, isGroupLayer }) => {
  const differenceY = containerHeight * 3 - offsetY;

  if (isGroupLayer) {
    return keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(${differenceY * cos}px);
  }
`;
  }

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceY * sin}px, ${differenceY * cos}px);
  }
`;
};

const flyInTop = ({ sin, cos, height, offsetY, isGroupLayer }) => {
  const startingPoint = -height * 3; // Maybe adjust the values so it looks like final result
  const differenceY = offsetY - startingPoint;

  if (isGroupLayer) {
    return keyframes`
    0% {
      opacity: 0;
      transform: translateY(${-differenceY}px);
    }
    1% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
    `;
  }

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceY * -sin}px, ${differenceY * -cos}px);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;
};

const flyOutTop = ({ sin, cos, height, offsetY, isGroupLayer }) => {
  const startingPoint = -height * 3;
  const differenceY = offsetY - startingPoint;

  if (isGroupLayer) {
    return keyframes`
  0% {
    opacity: 1;
    transform: translateY(0); 
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(${differenceY * -cos}px);    
  }
`;
  }

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0); 
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceY * -sin}px, ${differenceY * -cos}px);    
  }
`;
};

const flyInLeft = ({ sin, cos, offsetX, width, isGroupLayer }) => {
  const startingPoint = offsetX + width * 3;

  if (isGroupLayer) {
    return keyframes`
    0% {
      opacity: 0;
      transform: translateX(${startingPoint * -cos}px);
      -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    }
    1% {
      opacity: 1;    
      -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
      -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    }
  `;
  }

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${startingPoint * -cos}px, ${startingPoint * sin}px);
    -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
  }
  1% {
    opacity: 1;    
    -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
  }
`;
};

const flyOutLeft = ({ sin, cos, offsetX, width, isGroupLayer }) => {
  const startingPoint = offsetX + width * 3;

  if (isGroupLayer) {
    return keyframes`
    0% {
      opacity: 1;
      transform: translateX(0);
      -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    }
    99% {
      opacity: 1;    
      -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    }
    100% {
      opacity: 0;
      transform: translateX(${startingPoint * -cos}px);
      -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    }
  `;
  }

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
    -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
  }
  99% {
    opacity: 1;    
    -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
  }
  100% {
    opacity: 0;
    transform: translate(${startingPoint * -cos}px, ${startingPoint * sin}px);
    -webkit-animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);;
  }
`;
};

const flyInRight = ({ sin, cos, offsetX, containerWidth, isGroupLayer }) => {
  const differenceX = containerWidth * 3 - offsetX;

  if (isGroupLayer) {
    return keyframes`
  0% {
    opacity: 0;
    transform: translateX(${differenceX * cos}px);
    
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
`;
  }

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceX * cos}px, ${differenceX * -sin}px);
    
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;
};

const flyOutRight = ({ sin, cos, offsetX, containerWidth, isGroupLayer }) => {
  const differenceX = containerWidth * 3 - offsetX;

  if (isGroupLayer) {
    return keyframes`
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(${differenceX * cos}px);
    }
  `;
  }

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceX * cos}px, ${differenceX * -sin}px);
  }
`;
};

const rotateInLeftAnimation = ({ sin, cos, offsetX, width }) => {
  const differenceX = offsetX + width;

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceX * -cos}px, ${differenceX * sin}px) rotate(-135deg);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
`;
};

const rotateOutLeftAnimation = ({ sin, cos, offsetX, width }) => {
  const differenceX = offsetX + width;

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceX * -cos}px, ${differenceX * sin}px) rotate(-135deg);
  }
`;
};

const rotateInRightAnimation = ({ sin, cos, offsetX, containerWidth }) => {
  const differenceX = containerWidth - offsetX;

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceX * cos}px, ${differenceX * -sin}px) rotate(135deg);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
`;
};

const rotateOutRightAnimation = ({ sin, cos, offsetX, containerWidth }) => {
  const differenceX = containerWidth - offsetX;

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceX * cos}px, ${differenceX * -sin}px) rotate(135deg);
  }
`;
};

const whooshInLeftAnimation = ({ sin, cos, offsetX, width }) => {
  const differenceX = offsetX + width;

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceX * -cos}px, ${differenceX * sin}px)  scale(.15);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;
};

const whooshOutLeftAnimation = ({ sin, cos, offsetX, width }) => {
  const differenceX = offsetX + width;

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceX * -cos}px, ${differenceX * sin}px)  scale(.15);
  }
`;
};

const whooshInRightAnimation = ({ sin, cos, offsetX, containerWidth }) => {
  const differenceX = containerWidth - offsetX;

  return keyframes`
  0% {
    opacity: 0;
    transform: translate(${differenceX * cos}px, ${differenceX * -sin}px)  scale(.15);
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;
};

const whooshOutRightAnimation = ({ sin, cos, offsetX, containerWidth }) => {
  const differenceX = containerWidth - offsetX;

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(${differenceX * cos}px, ${differenceX * -sin}px)  scale(.15);
  }
`;
};

const dropInAnimation = ({ sin, cos, height, offsetY }) => {
  const startingPoint = -height;
  const differenceY = offsetY - startingPoint;
  const differenceYSin = differenceY * -sin;
  const differenceYCos = differenceY * -cos;

  return keyframes`
  0% {
    opacity: 1;
    transform: translate(${differenceYSin}px, ${differenceYCos}px);
    -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
    animation-timing-function: cubic-bezier(.5, 0, 1, 1);
  }
  29% {    
    transform: translate(0,0);
    -webkit-animation-timing-function: cubic-bezier(0, 0, .5, 1);
    animation-timing-function: cubic-bezier(0, 0, .5, 1);
  }
  45% {    
    transform: translate(${differenceYSin * 0.2812}px, ${differenceYCos * 0.2812}px);
    -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
    animation-timing-function: cubic-bezier(.5, 0, 1, 1);
  }
  61% {    
    transform: translate(0,0);
    -webkit-animation-timing-function: cubic-bezier(0, 0, .5, 1);
    animation-timing-function: cubic-bezier(0, 0, .5, 1);
  }
  71% {    
    transform: translate(${differenceYSin * 0.0956}px, ${differenceYCos * 0.0956}px);
    -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
    animation-timing-function: cubic-bezier(.5, 0, 1, 1);
  }
  80% {    
    transform: translate(0,0);
    -webkit-animation-timing-function: cubic-bezier(0, 0, .5, 1);
    animation-timing-function: cubic-bezier(0, 0, .5, 1);
  }
  85%  {    
    transform: translate(${differenceYSin * 0.0359}px, ${differenceYCos * 0.0359}px);
    -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
    animation-timing-function: cubic-bezier(.5, 0, 1, 1);
  }
  92% {    
    transform: translate(0,0);
    -webkit-animation-timing-function: cubic-bezier(0, 0, .5, 1);
    animation-timing-function: cubic-bezier(0, 0, .5, 1);
  }
  96%  {    
    transform: translate(${differenceYSin * 0.0156}px, ${differenceYCos * 0.0156}px);
    -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);
    animation-timing-function: cubic-bezier(.5, 0, 1, 1);
  }
  100% {
    opacity: 1;
    transform: translate(0,0);
    -webkit-animation-timing-function: cubic-bezier(0, 0, .5, 1);
    animation-timing-function: cubic-bezier(0, 0, .5, 1);
  }
`;
};

export default {
  drop: dropInAnimation,
  pulse: pulseAnimation,
  'fly-out-top': flyOutTop,
  'fly-out-left': flyOutLeft,
  'fly-out-right': flyOutRight,
  'fly-out-bottom': flyOutBottom,
  'fly-in-top': flyInTop,
  'fly-in-left': flyInLeft,
  'fly-in-right': flyInRight,
  'fly-in-bottom': flyInBottom,
  'pan-top': panUpAnimation,
  'zoom-in': zoomInAnimation,
  'zoom-out': zoomOutAnimation,
  'fade-in': fadeInAnimation,
  'fade-out': fadeOutAnimation,
  'twirl-in': twirlInAnimation,
  'twirl-out': twirlOutAnimation,
  'pan-left': panLeftAnimation,
  'pan-bottom': panDownAnimation,
  'pan-right': panRightAnimation,
  'whoosh-in-left': whooshInLeftAnimation,
  'whoosh-in-right': whooshInRightAnimation,
  'whoosh-out-left': whooshOutLeftAnimation,
  'whoosh-out-right': whooshOutRightAnimation,
  'rotate-in-left': rotateInLeftAnimation,
  'rotate-in-right': rotateInRightAnimation,
  'rotate-out-left': rotateOutLeftAnimation,
  'rotate-out-right': rotateOutRightAnimation,
};
