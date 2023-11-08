import { KaImage, Link } from '@components/primitive';
import { Rating } from '@mui/material';
import classNames from 'classnames';
import { FC } from 'react';
interface ICommentProps {
  avatar: string;
  comment: string;
  name: string;
  date: string;
}
interface ICommentCardProps {
  data: ICommentProps;
  isReply?: boolean;
  className?: string;
  hasRating?: boolean;
  valueRating?: number;
}

export const CommentCard: FC<ICommentCardProps> = ({
  data,
  isReply,
  className,
  hasRating = false,
  valueRating,
}) => {
  return (
    <div className={classNames('kl-comment-card', { '-reply': isReply }, className)}>
      <span className="avatar">
        <KaImage
          src={data.avatar}
          alt={data.name}
          ratio="square"
          objectFit="cover"
          className="image"
        />
      </span>
      <div className="content">
        {hasRating && (
          <div className="rating">
            <Rating
              className="rating"
              classes={{
                root: 'rating-root',
                sizeLarge: 'rating -lg',
              }}
              value={valueRating}
              readOnly
            />
          </div>
        )}
        <div className="title">
          <h6 className="name" title={data.name}>
            {data.name}
          </h6>
          <span className="date">{data.date}</span>
        </div>
        <p className="comment">{data.comment}</p>
        {isReply && (
          <Link href="/" className="link" title="">
            Reply
          </Link>
        )}
      </div>
    </div>
  );
};
