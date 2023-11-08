import { ReactNode, FC, ReactElement } from 'react';
import MuiTooltip from '@mui/material/Tooltip';
import classNames from 'classnames';

interface ITooltipProps {
  children: ReactElement;
  title: string;
  enterDelay?: number;
  leaveDelay?: number;
  arrow?: boolean;
  placement?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'left-start'
    | 'left'
    | 'left-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end';
  tooltipClassName?: string;
  popperClassName?: string;
  arrowClassName?: string;
  className?: string;
}

export const Tooltip: FC<ITooltipProps> = ({
  className,
  children,
  title,
  enterDelay,
  leaveDelay,
  arrow,
  placement,
  tooltipClassName,
  popperClassName,
  arrowClassName,
}) => {
  return (
    <MuiTooltip
      title={title}
      className={classNames('kl-tooltip', className)}
      componentsProps={{
        tooltip: {
          className: classNames('kl-tooltip-content', `-${placement}`, tooltipClassName),
        },
        popper: {
          className: classNames('kl-tooltip-popper', popperClassName),
        },
        arrow: {
          className: classNames('kl-tooltip-arrow', arrowClassName),
        },
      }}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      arrow={arrow}
      placement={placement}
    >
      {children}
    </MuiTooltip>
  );
};

Tooltip.defaultProps = {
  enterDelay: 0,
  leaveDelay: 0,
  arrow: true,
  placement: 'top',
};
