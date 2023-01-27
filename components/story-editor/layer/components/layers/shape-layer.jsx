import { memo, useCallback } from 'react';
import { shapesContent } from '../../../../../config/constants';
import { useAppSelector } from '../../../../../hooks';
import { getViewBox, setCoordinates, shapeRound } from '../../../../../utils/styleSettingsUtils';

export const buildGradientDefs = ({
  slidePosition,
  layer,
}) => (
  <defs>
    <filter id={`shadow${slidePosition}${layer.position}${layer._id}`} width="200%" height="200%" x="-40%" y="-40%">
      <feGaussianBlur in="SourceAlpha" stdDeviation={Number(layer.settings.generalSettings.shadow) / 10} />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <linearGradient
      id={`linearfillColor${slidePosition}${layer.position}${layer._id}`}
      x1={setCoordinates('x1', layer.settings.layerSettings.shapeStyles.fillColor.angle)}
      y1={setCoordinates('y1', layer.settings.layerSettings.shapeStyles.fillColor.angle)}
      x2={setCoordinates('x2', layer.settings.layerSettings.shapeStyles.fillColor.angle)}
      y2={setCoordinates('y2', layer.settings.layerSettings.shapeStyles.fillColor.angle)}
    >
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.fillColor.leftColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.fillColor.leftColor || 'rgba(255, 255, 255, 1)',
        }}
      />
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.fillColor.rightColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.fillColor.rightColor || 'rgba(255, 255, 255, 1)',
        }}
      />
    </linearGradient>

    <radialGradient
      id={`radialfillColor${slidePosition}${layer.position}${layer._id}`}
      cx="50%"
      cy="50%"
      r="100%"
      fx={`${layer.settings.layerSettings.shapeStyles.fillColor.horizontalDirection || 0}%`}
      fy={`${layer.settings.layerSettings.shapeStyles.fillColor.verticalDirection || 0}%`}
    >
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.fillColor.leftColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.fillColor.leftColor || 'rgba(255, 255, 255, 1)',
        }}
      />
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.fillColor.rightColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.fillColor.rightColor || 'rgba(255, 255, 255, 1)',
        }}
      />
    </radialGradient>

    <linearGradient
      id={`linearborderColor${slidePosition}${layer.position}${layer._id}`}
      x1={setCoordinates('x1', layer.settings.layerSettings.shapeStyles.borderColor.angle)}
      y1={setCoordinates('y1', layer.settings.layerSettings.shapeStyles.borderColor.angle)}
      x2={setCoordinates('x2', layer.settings.layerSettings.shapeStyles.borderColor.angle)}
      y2={setCoordinates('y2', layer.settings.layerSettings.shapeStyles.borderColor.angle)}
    >
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.borderColor.leftColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.borderColor.leftColor || 'rgba(255, 255, 255, 1)',
        }}
      />
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.borderColor.rightColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.borderColor.rightColor || 'rgba(255, 255, 255, 1)',
        }}
      />
    </linearGradient>

    <radialGradient
      id={`radialborderColor${slidePosition}${layer.position}${layer._id}`}
      cx="50%"
      cy="50%"
      r="100%"
      fx={`${layer.settings.layerSettings.shapeStyles.borderColor.horizontalDirection || 0}%`}
      fy={`${layer.settings.layerSettings.shapeStyles.borderColor.verticalDirection || 0}%`}
    >
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.borderColor.leftColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.borderColor.leftColor || 'rgba(255, 255, 255, 1)',
        }}
      />
      <stop
        offset={`${layer.settings.layerSettings.shapeStyles.borderColor.rightColorPercent || 0}%`}
        style={{
          stopOpacity: 1,
          stopColor: layer.settings.layerSettings.shapeStyles.borderColor.rightColor || 'rgba(255, 255, 255, 1)',
        }}
      />
    </radialGradient>
  </defs>
);

const ShapeLayer = ({ layer, width, height, slidePosition }) => {
  const hasDropShadow = +layer.settings.generalSettings.shadow !== 0;
  const thickness =
    layer.settings.layerSettings.shapeStyles.relativeThickness ?? layer.settings.layerSettings.shapeStyles.thickness;

  const fitZoom = useAppSelector((state) => state.helpers.fitZoomPercent);
  const currZoom = useAppSelector((state) => state.helpers.zoomPercent);

  const shapeRoundHandler = useCallback(() => {
    return shapeRound(
      shapesContent[layer.content.shape]?.d,
      +layer.settings.generalSettings.round,
      layer.content.shape,
      layer.settings.layerSettings.shapeStyles.thickness,
      fitZoom,
      currZoom,
    );
  }, [
    layer.content.shape,
    layer.settings.generalSettings.round,
    layer.settings.layerSettings.shapeStyles.thickness,
    fitZoom,
    currZoom,
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width + thickness}
      height={height + thickness}
      style={{
        display: 'flex',
        overflow: 'visible',
        filter: hasDropShadow
          ? `drop-shadow(0px 0px ${Number(layer.settings.generalSettings.shadow) / 10}px rgba(0,0,0,0.9)`
          : 'none',
        transform: `translate(${thickness / 2}px, ${thickness / 2}px)`,
      }}
      viewBox={
        layer.content.shape === 'square'
          ? getViewBox(width, height, thickness)
          : shapesContent[layer.content.shape]?.viewBox
      }
      preserveAspectRatio="none"
    >
      {buildGradientDefs({ slidePosition, layer })}
      <g>
        <g transform={`translate(${shapesContent[layer.content.shape]?.translate || 0})`}>
          <use fill="transparent" xlinkHref="#7wqva"></use>
          {layer.content.shape === 'square' ? (
            <rect
              rx={Math.min(width, height) / Math.pow(2, 100 / +layer.settings.generalSettings.round)}
              width={width + thickness * 2}
              height={height + thickness * 2}
              strokeWidth={layer.settings.layerSettings.shapeStyles.relativeThickness}
              stroke={
                layer.settings.layerSettings.shapeStyles.borderColor.type !== 'solid'
                  ? 'url(#' +
                    layer.settings.layerSettings.shapeStyles.borderColor.type +
                    'borderColor' +
                    slidePosition +
                    layer.position +
                    layer._id +
                    ')'
                  : layer.settings.layerSettings.shapeStyles.borderColor.leftColor
              }
              fill={
                layer.settings.layerSettings.shapeStyles.fillColor.type !== 'solid'
                  ? 'url(#' +
                    layer.settings.layerSettings.shapeStyles.fillColor.type +
                    'fillColor' +
                    slidePosition +
                    layer.position +
                    layer._id +
                    ')'
                  : layer.settings.layerSettings.shapeStyles.fillColor.leftColor
              }
              vectorEffect="non-scaling-stroke"
            />
          ) : (
            <path
              d={shapeRoundHandler()}
              strokeWidth={layer.settings.layerSettings.shapeStyles.relativeThickness}
              stroke={
                layer.settings.layerSettings.shapeStyles.borderColor.type !== 'solid'
                  ? 'url(#' +
                    layer.settings.layerSettings.shapeStyles.borderColor.type +
                    'borderColor' +
                    slidePosition +
                    layer.position +
                    layer._id +
                    ')'
                  : layer.settings.layerSettings.shapeStyles.borderColor.leftColor
              }
              fill={
                layer.settings.layerSettings.shapeStyles.fillColor.type !== 'solid'
                  ? 'url(#' +
                    layer.settings.layerSettings.shapeStyles.fillColor.type +
                    'fillColor' +
                    slidePosition +
                    layer.position +
                    layer._id +
                    ')'
                  : layer.settings.layerSettings.shapeStyles.fillColor.leftColor
              }
              vectorEffect="non-scaling-stroke"
            />
          )}
        </g>
      </g>
    </svg>
  );
};

export default memo(ShapeLayer);
