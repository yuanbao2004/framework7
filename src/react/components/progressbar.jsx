import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7 } from '../utils/f7';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  progress? : number;
  infinite? : boolean;
  COLOR_PROPS
*/

const Progressbar = forwardRef((props, ref) => {
  const { className, id, style, progress, infinite } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const set = (newProgress, speed) => {
    if (!f7) return;
    f7.progressbar.set(elRef.current, newProgress, speed);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    set,
  }));

  const transformStyle = {
    transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
    WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
  };

  const classes = classNames(
    className,
    'progressbar',
    {
      'progressbar-infinite': infinite,
    },
    colorClasses(props),
  );

  return (
    <span
      ref={elRef}
      id={id}
      style={style}
      className={classes}
      data-progress={progress}
      {...dataAttrs}
    >
      <span style={transformStyle} />
    </span>
  );
});

Progressbar.displayName = 'f7-progressbar';

export default Progressbar;