/* eslint-disable @next/next/no-img-element */
import { isEmpty, includes } from 'lodash';
import { ImgHTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';

export interface IImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  hideOnError?: boolean;
  defaultImage?: string;
  loadingSize?: 'sm' | 'md' | 'lg';
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  [key: string]: any;
}

const imagePathRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
const urlRegex = /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/;

export function KaImage({
  src,
  hideOnError,
  defaultImage,
  className,
  loadingSize = 'md',
  objectFit,
  ...props
}: IImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    if (!imagePathRegex.test(src) || isEmpty(src)) {
      if (isMounted) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
    }

    const url =
      includes(src, 'https://') || src.startsWith('/images')
        ? src
        : `${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${src}`;
    const img = new Image();

    img.onerror = () => {
      if (isMounted) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    img.onload = () => {
      if (isMounted) {
        setImageUrl(url);
        setIsLoading(false);
      }
    };
    img.src = url;

    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    if (imageUrl) setIsLoading(false);
  }, [imageUrl]);

  if (isLoading)
    return (
      <div className="w-100 h-100 rounded-2 bg-success bg-opacity-25 d-flex align-items-center justify-content-center">
        <div className="animate-pulse w-100 h-100" />
      </div>
    );

  if (isError && hideOnError) return null;

  return (
    <img
      className={classNames('kl-image', `-${objectFit}`, className)}
      src={isError ? defaultImage : imageUrl}
      alt={props.alt}
      {...props}
    />
  );
}

KaImage.defaultProps = {
  defaultImage: '/images/error.png',
  className: '',
};
