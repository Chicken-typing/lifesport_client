import { Modal } from '@mui/material';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { map, isArray } from 'lodash';
import { TYPES } from './constant';

interface ISweetModalProps {
  className?: string;
  description: string;
  handleOpen: boolean;
  handleClose: () => void;
  type: keyof typeof TYPES;
  button: ReactNode[] | ReactNode;
}

export const SweetModal: FC<ISweetModalProps> = ({
  className,
  description,
  handleOpen,
  handleClose,
  type,
  button,
}) => {
  return (
    <Modal
      open={handleOpen}
      onClose={handleClose}
      className={classNames('kl-sweet-modal', className)}
    >
      <div className="box">
        <div className={classNames('wrapper', `-${type}`)}>
          <i className={TYPES[type].icon} />
        </div>
        <h3 className="header">{TYPES[type].text}</h3>
        <p className="description">{description}</p>
        <div className="buttons">
          {isArray(button) ? map(button, (component) => component) : button}
        </div>
      </div>
    </Modal>
  );
};

SweetModal.defaultProps = {
  handleOpen: false,
  type: 'success',
};
