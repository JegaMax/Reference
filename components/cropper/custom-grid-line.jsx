import { parseClip } from 'utils/croppingUtils';

const CustomGridLine = {
  name: 'customGridLine',
  props: {},
  events: {},
  render(moveable) {
    const clipValues = parseClip(moveable?.props?.frame?.clipStyle);
    const { pos1, pos2, pos3, pos4 } = moveable.state;
    const jsxs = [];

    // Adjust positions with clip
    pos1[0] = pos1[0] + clipValues[3];
    pos1[1] = pos1[1] + clipValues[0];

    pos2[0] = pos2[0] - clipValues[1];
    pos2[1] = pos2[1] + clipValues[0];

    pos3[0] = pos3[0] + clipValues[3];
    pos3[1] = pos3[1] - clipValues[2];

    pos4[0] = pos4[0] - clipValues[1];
    pos4[1] = pos4[1] - clipValues[2];

    // Cook vertical lines
    for (let i = 1; i <= 2; ++i) {
      const startPos = [(pos1[0] * (3 - i) + pos2[0] * i) / 3, (pos1[1] * (3 - i) + pos2[1] * i) / 3];
      const endPos = [(pos3[0] * (3 - i) + pos4[0] * i) / 3, (pos3[1] * (3 - i) + pos4[1] * i) / 3];

      const dx = endPos[0] - startPos[0];
      const dy = endPos[1] - startPos[1];
      const rad = Math.atan2(dy, dx);
      const size = Math.sqrt(dx * dx + dy * dy);

      jsxs.push(
        <div
          key={`customLine-vertical-${i}`}
          className="moveable-line vertical"
          style={{
            transform: `translate(${startPos[0]}px, ${startPos[1]}px) rotate(${rad}rad)`,
            width: `${size}px`,
          }}
        />,
      );
    }

    // Cook horizontal lines
    for (let i = 1; i <= 2; ++i) {
      const startPos = [(pos1[0] * (3 - i) + pos3[0] * i) / 3, (pos1[1] * (3 - i) + pos3[1] * i) / 3];
      const endPos = [(pos2[0] * (3 - i) + pos4[0] * i) / 3, (pos2[1] * (3 - i) + pos4[1] * i) / 3];

      const dx = endPos[0] - startPos[0];
      const dy = endPos[1] - startPos[1];
      const rad = Math.atan2(dy, dx);
      const size = Math.sqrt(dx * dx + dy * dy);

      jsxs.push(
        <div
          key={`customLine-horizontal-${i}`}
          className={`moveable-line horizontal ${i}`}
          style={{
            transform: `translate(${startPos[0]}px, ${startPos[1]}px) rotate(${rad}rad)`,
            width: `${size}px`,
          }}
        />,
      );
    }

    return jsxs;
  },
};

export default CustomGridLine;
