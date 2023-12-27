import { useProductQuery } from '@/query/products/get-product';
import { Accordion, CommentCard } from '@components/compound';
import CommentForm from '@containers/Blog/CommentForm';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { COMMENTS, INFORMATION } from './constants';
import { isEmpty, map, size, flatMapDepth, filter, isNull } from 'lodash';

const AccordionTab = () => {
  const [expanded, setExpanded] = useState<number>(0);
  const router = useRouter();
  const { query } = router;
  const id = Number(query?.id) || 0;
  const {
    data: product,
    isError: isErrorProductDetail,
    isFetching: isLoadingProductDetail,
  } = useProductQuery({ id });

  return (
    <div className="kl-product-accordion">
      <Accordion
        title="Description"
        className="group"
        isActive={expanded === 0}
        onChange={() => setExpanded(expanded === 0 ? -1 : 0)}
        classes={{
          root: 'accordion-root',
          expanded: 'accordion-expanded',
          summaryRoot: 'accordion-summary-root',
          summaryContent: 'accordion-summary-content flex-center-ver',
          detailRoot: 'accordion-details-root',
        }}
        hasIcon
        iconPosition="start"
      >
        <p>
          {flatMapDepth(map(product?.item, (item) => item.description.replaceAll('&#39;', "'")))}
        </p>
      </Accordion>

      <Accordion
        title="Reviews"
        classes={{
          root: 'accordion-root',
          expanded: 'accordion-expanded',
          summaryRoot: 'accordion-summary-root',
          summaryContent: 'accordion-summary-content flex-center-ver',
          detailRoot: 'accordion-details-root',
        }}
        isActive={expanded === 2}
        onChange={() => setExpanded(expanded === 2 ? -1 : 2)}
        hasIcon
        iconPosition="start"
      >
        <div className="comments">
          {!isEmpty(flatMapDepth(map(product?.item, (item) => item?.comments))) && (
            <div className="comments">
              {map(
                flatMapDepth(map(product?.item, (item) => item?.comments)),
                (commentData, idx) => {
                  // Kiểm tra xem commentData có tồn tại và không phải là null không
                  if (commentData && commentData.rate !== null) {
                    const data = {
                      rate: commentData.rate,
                      comment: commentData.comment,
                      created_at: commentData.created_at,
                      user_name: commentData.user_name,
                    };

                    return (
                      !isEmpty(data) && (
                        <div key={`comment-${idx}`} className="kl-product-comment">
                          <CommentCard className="card" data={data} />
                        </div>
                      )
                    );
                  }
                },
              )}
            </div>
          )}
        </div>

        <CommentForm
          product_id={product?.item[0]?.id ? product?.item[0]?.id : 0}
          rating
          valueRating={0}
          className="kl-product-review"
          title="Add A Review"
        />
      </Accordion>
    </div>
  );
};

export default AccordionTab;
