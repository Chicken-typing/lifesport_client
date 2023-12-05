import { KaImage, Link } from '@components/primitive';
import { Rating } from '@mui/material';
import classNames from 'classnames';
import { FC } from 'react';
import { format, isValid, parseISO } from 'date-fns';
interface ICommentProps {
  comment?: string;
  user_name: string;
  created_at: string;
  rate: number;
}
interface ICommentCardProps {
  data: ICommentProps;
  isReply?: boolean;
  className?: string;
}

export const CommentCard: FC<ICommentCardProps> = ({ data, isReply, className }) => {
  return (
    <div className={classNames('kl-comment-card', { '-reply': isReply }, className)}>
      <span className="avatar">
        <KaImage
          src="https://secure.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?s=50&d=mm&r=g"
          alt="image-user"
          ratio="square"
          objectFit="cover"
          className="image"
        />
      </span>
      <div className="content">
        <div className="rating">
          <Rating
            className="rating"
            classes={{
              root: 'rating-root',
              sizeLarge: 'rating -lg',
            }}
            value={data.rate}
            readOnly
          />
        </div>

        <div className="title">
          <h6 className="name" title={data.user_name}>
            {data.user_name}
          </h6>

          <span className="date">
            {' '}
            {isValid(parseISO(data.created_at))
              ? format(parseISO(data.created_at), 'dd/MM/yyyy')
              : 'Invalid Date'}
          </span>
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
