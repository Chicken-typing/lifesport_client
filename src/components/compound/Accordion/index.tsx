import { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

interface IAccordionProps {
  className?: string;
  onChange?: () => void;
  isActive?: boolean;
  hasIcon?: boolean;
  disabled?: boolean;
  // prop for title
  title: string;
  titleProps?: HTMLAttributes<HTMLLabelElement>;
  prefix?: ReactNode;
  iconPosition?: 'start' | 'end';

  // prop for content
  children: ReactNode;

  classes?: {
    root?: string;
    expanded?: string;
    summaryRoot?: string;
    summaryContent?: string;
    detailRoot?: string;
    detail?: string;
  };
}

export const Accordion: FC<IAccordionProps> = ({
  title,
  children,
  className,
  classes,
  onChange,
  titleProps,
  isActive,
  prefix,
  hasIcon,
  iconPosition,
  disabled,
}) => {
  return (
    <div className={classNames(`kl-accordion`, className)}>
      <MuiAccordion
        className={classNames(`accordion-root`, className)}
        expanded={isActive}
        onChange={onChange}
        style={{ display: disabled ? 'none' : 'block' }}
        classes={{
          root: classes?.root,
          expanded: classes?.expanded,
        }}
      >
        <MuiAccordionSummary
          className="accordion-summary"
          aria-controls="describe-content"
          classes={{
            root: classes?.summaryRoot,
            content: classes?.summaryContent,
          }}
          expandIcon={
            !prefix &&
            hasIcon &&
            iconPosition === 'end' && <i className="fa-regular fa-chevron-down fa-sm" />
          }
        >
          {prefix && !hasIcon && prefix}
          {!prefix && hasIcon && iconPosition === 'start' && (
            <i
              className={classNames(
                'fa-regular accordion-summary-icon',
                { 'fa-minus': isActive },
                { 'fa-plus': !isActive },
              )}
            />
          )}
          <label {...titleProps} className={classNames('label', titleProps?.className)}>
            {title}
          </label>
        </MuiAccordionSummary>
        <MuiAccordionDetails
          className={classNames(`accordion-details`, classes?.detail)}
          classes={{
            root: classes?.detailRoot,
          }}
        >
          {children}
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};
