import { shapesWithoutRoundAngles } from '../config/constants';

export const shapeRound = (content, roundValue, shape, thickness, fitZoom, currZoom) =>
  content && !shapesWithoutRoundAngles.includes(shape)
    ? roundShape(content, roundValue, shape, thickness, fitZoom, currZoom)
    : content;

// TODO: remove duplicate
export const setStyleSettingsProperty = (model, data) => {
  for (const name in data) {
    if (name in model) {
      model[name] = data[name];
    }
  }
  return model;
};

export const setColorSettingsProperty = (model, data) => {
  for (const name in data) {
    if (name in model) {
      model[name] = data[name];
    }
  }
  return model;
};

export const moveTowardsLength = (
  movingPoint,
  targetPoint,
  amount,
) => {
  const width = targetPoint.x - movingPoint.x;
  const height = targetPoint.y - movingPoint.y;
  const distance = Math.sqrt(width * width + height * height);
  return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
};

export const moveTowardsFractional = (
  movingPoint,
  targetPoint,
  fraction,
) => {
  return {
    x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
    y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction,
  };
};

export const getPathParts = (pathString) => {
  return pathString.split(/[,\s]/).reduce((parts, part) => {
    const match = part.match('([a-zA-Z])(.+)');
    if (match) {
      parts.push(match[1]);
      parts.push(match[2]);
    } else {
      parts.push(part);
    }
    return parts;
  }, []);
};

export const getPathPartsCommand = (pathParts) => {
  return pathParts.reduce(function (commands, part) {
    if (parseFloat(part) === +part && commands.length) {
      commands[commands.length - 1].push(part);
    } else {
      commands.push([part]);
    }
    return commands;
  }, []);
};

export const pointForCommand = (cmd) => {
  return {
    x: parseFloat(cmd[cmd.length - 2]),
    y: parseFloat(cmd[cmd.length - 1]),
  };
};

export const adjustCommand = (cmd, newPoint) => {
  if (cmd.length > 2) {
    cmd[cmd.length - 2] = newPoint.x;
    cmd[cmd.length - 1] = newPoint.y;
  }
};

export const roundShape = (
  pathString,
  radius,
  shape,
  thickness,
  fitZoom,
  currZoom,
) => {
  const pathParts = getPathParts(pathString);
  const commands = getPathPartsCommand(pathParts);
  let resultCommands = [];

  if (commands.length > 1) {
    const startPoint = pointForCommand(commands[0]);
    // Handle the close path case with a "virtual" closing line
    let virtualCloseLine = null;
    if (commands[commands.length - 1][0] === 'Z' && commands[0].length > 2) {
      virtualCloseLine = ['L', startPoint.x, startPoint.y];
      commands[commands.length - 1] = virtualCloseLine;
    }
    // We always use the first command (but it may be mutated)
    resultCommands.push(commands[0]);

    for (let cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
      const prevCmd = resultCommands[resultCommands.length - 1];

      const curCmd = commands[cmdIndex];
      const nextCmd = curCmd === virtualCloseLine ? commands[1] : commands[cmdIndex + 1];
      if (nextCmd && prevCmd && prevCmd.length > 2 && curCmd[0] === 'L' && nextCmd.length > 2 && nextCmd[0] === 'L') {
        const prevPoint = pointForCommand(prevCmd);
        const curPoint = pointForCommand(curCmd);
        const nextPoint = pointForCommand(nextCmd);

        const squareRadiusPolynom =
          (-4.59266 * Math.pow(10, -8) * Math.pow(thickness, 5) * radius +
            6.69978 * Math.pow(10, -6) * Math.pow(thickness, 4) * radius -
            0.000350924 * Math.pow(thickness, 3) * radius +
            0.00778643 * Math.pow(thickness, 2) * radius -
            0.0574422 * thickness * radius +
            radius / 4) *
          (currZoom / fitZoom);

        const curveStart = moveTowardsLength(curPoint, prevPoint, shape === 'square' ? squareRadiusPolynom : radius);
        const curveEnd = moveTowardsLength(curPoint, nextPoint, shape === 'square' ? squareRadiusPolynom : radius);
        adjustCommand(curCmd, curveStart);
        curCmd.origPoint = curPoint;
        resultCommands.push(curCmd);

        const startControl = moveTowardsFractional(curveStart, curPoint, 0.5);
        const endControl = moveTowardsFractional(curPoint, curveEnd, 0.5);

        const curveCmd = ['C', startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
        // Save the original point for fractional calculations
        curveCmd.origPoint = curPoint;
        resultCommands.push(curveCmd);
      } else {
        resultCommands.push(curCmd);
      }
    }
    if (virtualCloseLine) {
      const newStartPoint = pointForCommand(resultCommands[resultCommands.length - 1]);
      resultCommands.push(['Z']);
      adjustCommand(resultCommands[0], newStartPoint);
    }
  } else {
    resultCommands = commands;
  }
  return resultCommands.reduce(function (str, c) {
    return str + c.join(' ') + ' ';
  }, '');
};

export const getRectPath = (width, height, thickness = 0) => {
  return `M0 0 L ${+width + thickness * 2} 0 L${+width + thickness * 2} ${+height + thickness * 2} L 0 ${
    +height + thickness * 2
  } Z`;
};

export const getViewBox = (width, height, thickness = 0) => {
  return `0 0 ${+width + thickness * 2} ${+height + thickness * 2}`;
};

export const getRoundValue = (width, height, round, thickness = 0) => {
  let res = +round;
  if (+round > (width + thickness * 2) / 2 || +round > (height + thickness * 2) / 2) {
    res =
      +width + thickness * 2 < +height + thickness * 2 ? (+width + thickness * 2) / 2 : (+height + thickness * 2) / 2;
  }
  return res;
};

export const setCoordinates = (type, angle) => {
  if (isNaN(angle)) {
    return '0';
  }
  const anglePI = -angle * (Math.PI / 180);
  switch (type) {
    case 'x1':
      return Math.round(50 + Math.sin(anglePI) * 50) + '%';
    case 'y1':
      return Math.round(50 + Math.cos(anglePI) * 50) + '%';
    case 'x2':
      return Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%';
    case 'y2':
      return Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%';
    default:
      return '0';
  }
};
