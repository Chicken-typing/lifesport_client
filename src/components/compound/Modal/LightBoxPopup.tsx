import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDataLightBox } from '@/store/modals/selector';
import { closeModal } from '@/store/modals/slice';
import { Button, KaImage } from '@components/primitive';
import { FC, useState } from 'react';
import { isEmpty, size } from 'lodash';

const LightBoxPopup: FC = () => {
  const dispatch = useAppDispatch();

  const { defaultActive, images } = useAppSelector(selectDataLightBox);
  const [active, setActive] = useState<number>(defaultActive);

  const handleChangeImage = (action: 'next' | 'previous') => () => {
    if (isEmpty(images)) return;

    if (action === 'next' && active < size(images) - 1) {
      setActive(active + 1);
    }

    if (action === 'previous' && active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="light-box">
      <KaImage src={images[active]} alt="product" objectFit="contain" />
      <div className="group">
        <Button
          iconOnly
          color="light"
          variant="contained"
          className="button"
          onClick={handleChangeImage('previous')}
        >
          <i className="fa-light fa-chevron-left fa-lg" />
        </Button>
        <Button
          iconOnly
          color="light"
          variant="contained"
          className="button -close"
          onClick={() => dispatch(closeModal())}
        >
          <i className="fa-light fa-xmark fa-lg" />
        </Button>
        <Button
          iconOnly
          color="light"
          variant="contained"
          className="button"
          onClick={handleChangeImage('next')}
        >
          <i className="fa-light fa-chevron-right fa-lg" />
        </Button>
      </div>
    </div>
  );
};

export default LightBoxPopup;
