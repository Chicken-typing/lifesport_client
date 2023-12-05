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
        title="Mô tả"
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
          quasi architecto beatae vitae dicta sunt explicabo.
          <br />
          <br />
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
          est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
          numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
      </Accordion>

      <Accordion
        title="Thông tin sản phẩm"
        classes={{
          root: 'accordion-root',
          expanded: 'accordion-expanded',
          summaryRoot: 'accordion-summary-root',
          summaryContent: 'accordion-summary-content flex-center-ver',
          detailRoot: 'accordion-details-root',
        }}
        isActive={expanded === 1}
        onChange={() => setExpanded(expanded === 1 ? -1 : 1)}
        hasIcon
        iconPosition="start"
      >
        <table className="table-info">
          <tbody className="body">
            {map(INFORMATION, ({ label, value }, idx) => (
              <tr className="rows" key={`info-${idx}`}>
                <th className="heading">{label}</th>
                <td className="content">
                  <p className="text">{value}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Accordion>

      <Accordion
        title="Bình luận (5)"
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
