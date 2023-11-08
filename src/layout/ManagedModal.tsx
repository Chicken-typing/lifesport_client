import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { selectModalOpen, selectModalView } from '@/store/modals/selector';
import { closeModal } from '@/store/modals/slice';
import { Modal } from '@mui/material';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const WishlistPopup = dynamic(() => import('@components/compound/Modal/WishlistPopup')) as FC;
const TrailerPopup = dynamic(() => import('@components/compound/Modal/TrailerPopup')) as FC;
const LightBoxPopup = dynamic(() => import('@components/compound/Modal/LightBoxPopup')) as FC;
const CartPopup = dynamic(() => import('@components/compound/Modal/CartPopup')) as FC;

const ManagedModal = () => {
  const isOpen = useAppSelector(selectModalOpen);
  const view = useAppSelector(selectModalView);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => dispatch(closeModal());

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      className={classNames({ 'kl-about-modal': view === MODALS.TRAILER })}
    >
      <div className="box">
        {view === MODALS.WISHLIST && <WishlistPopup />}
        {view === MODALS.LIGHT_BOX && <LightBoxPopup />}
        {view === MODALS.TRAILER && <TrailerPopup />}
        {view === MODALS.CART && <CartPopup />}
      </div>
    </Modal>
  );
};

export default ManagedModal;
