import { GroupInput, GroupTextarea } from '@components/compound';
import { Button, Label } from '@components/primitive';
import { Checkbox, FormControlLabel, FormGroup, Rating } from '@mui/material';
import classNames from 'classnames';
import { FC, useState } from 'react';
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
  const { mutateAsync: reviewMutation } = useReviewMutation();

  const handleSubmit = () => {
    if (token) {
      reviewMutation({ product_id, rate: value, comment: text }).then((response: any) => {
        console.log(response);
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
        {/* <div className="form  col-md-4 col-lg-4 col-sm-12">
          <GroupInput
            type="text"
            placeholder="Your Name *"
            className="group"
            fadePlaceholderShown
          />
          <GroupInput
            type="text"
            placeholder="Email Address *"
            className="group"
            fadePlaceholderShown
          />
          <GroupInput
            type="text"
            placeholder="Your Website"
            className="group"
            fadePlaceholderShown
          />
        </div>
        <FormGroup className="checkbox">
          <FormControlLabel
            control={<Checkbox size="small" color="default" />}
            className="icon"
            label="Save my name, email, and website in this browser for the next time I comment"
          />
        </FormGroup> */}
        <Button
          onClick={handleSubmit}
          variant="outlined"
          endAdornment={<i className="fa-solid fa-chevron-right icon"></i>}
          color="primary"
          className="button"
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
