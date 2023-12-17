import { GroupInput, GroupTextarea } from '@components/compound';
import { Button, Label } from '@components/primitive';
import { Checkbox, FormControlLabel, FormGroup, Rating } from '@mui/material';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useReviewMutation } from '@/query/reviews/reviewMutation';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { toast } from 'react-toastify';
export interface ICommentFormProp {
  title: string;
  className?: string;
  rating?: boolean;
  valueRating?: number;
  product_id: number;
}

const CommentForm: FC<ICommentFormProp> = ({
  title,
  className,
  rating,
  valueRating,
  product_id,
}) => {
  const [value, setValue] = useState<number>(valueRating as number | 0);
  const [text, setText] = useState<string>('');
  const token = cookieStorage?.getAccessTokenInfo();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { mutateAsync: reviewMutation, isLoading } = useReviewMutation();

  useEffect(() => {
    if (value === null || value === 0) {
      setDisabled(true);
    }
  }, [value]);

  const handleSubmit = () => {
    if (token) {
      reviewMutation({ product_id, rate: value, comment: text }).then((response: any) => {
        if (response?.status === 'success') {
          toast.success('Reviewed Successfully', { position: 'top-center' });
          setText('');
          setValue(0);
        }
        if (response.status === 'error') {
          toast.error('You have reviewed this product', { position: 'top-center' });
          setText('');
          setValue(0);
        }
      });
    } else {
      toast.error('You should sign in to reviews', { position: 'top-center' });
    }
  };
  return (
    <div className={classNames('kl-blog-comment-form', className)}>
      <div className="wrapper">
        <h1 className="title">{title}</h1>

        <Label isRequired className="comment-note">
          Your email address will not be published. Required fields are marked
        </Label>

        {rating && (
          <div className="rating">
            <span className="require-field-message">Your Rating </span>
            <span className="require">*</span>
            <Rating
              className="rating"
              classes={{
                root: 'rating-root',
                sizeLarge: 'rating -lg',
              }}
              name="simple-controlled"
              value={value}
              size="large"
              onChange={(event, newValue) => {
                console.log(newValue);
                setValue(newValue as number);
              }}
            />
          </div>
        )}
        <div className="form col-12 col-lg-12">
          <GroupTextarea
            value={text}
            onChange={({ value }) => setText(String(value))}
            placeholder="Comment"
            textareaClassName="kl-blog-field"
            name="comment"
            className="group"
            fadePlaceholderShown
          />
        </div>

        <Button
          onClick={handleSubmit}
          variant="outlined"
          endAdornment={<i className="fa-solid fa-chevron-right icon"></i>}
          color="primary"
          className="button"
          isLoading={isLoading}
          disabled={value === null || value === 0}
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
