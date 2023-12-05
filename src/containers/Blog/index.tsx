import KsLayout from '@/layout';
import { CommentCard } from '@components/compound';
import { KaImage, Link, Tag } from '@components/primitive';
import Sidebar from '@containers/Blogs/Sidebar';
import QuoteIcon from '@svg/quote.svg';
import { routes } from '@utils/routes';
import { map } from 'lodash';
import { ReactNode } from 'react';
import CommentForm from './CommentForm';
import { COMMENTS, TAGS } from './constant';

const Blog = () => {
  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      Home Page
    </Link>,
    <Link href={routes.BLOGS} title="homepage" key="blogs" className="kl-page-header-link">
      Blogs
    </Link>,
    <p className="kl-page-header-text" key="blog">
      Blog
    </p>,
  ];
  return (
    <KsLayout
      title=""
      hasPageHeader
      hasPageHeaderTitle={false}
      pageHeaderBackground="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/blog-bc-bg.jpg"
      breadcrumbs={breadcrumbs}
      breadcrumbsColor="white"
      hasOverlay={true}
    >
      <div className="kl-blog kl-container">
        <div className="kl-blog-layout">
          <div className="content">
            <section className="kl-blog-details">
              <div className="header">
                <div className="introduction">
                  <Link className="categories" href="/" title="">
                    HEALTH & NUTRITION
                  </Link>
                  <div className="author">
                    <span>POST BY </span>
                    <Link className="link" href="/" title="">
                      ADMIN
                    </Link>
                  </div>
                </div>
                <h1 className="heading _heading-style">Chamomile: Herbal Tea of the Month</h1>
              </div>

              <div className="content">
                <KaImage
                  className="image"
                  src="https://dm4fv4ltmsvz0.cloudfront.net/cd1ce960-8913-419f-a677-ef1bf5ee5c3e.png"
                  alt=""
                  objectFit="cover"
                />
                <p className="describe">
                  There are many variations of passages of Lorem Ipsum available, but the majority
                  have suffered alteration in some form, by injected humour, or randomised words
                  which don’t look even slightly believable. Store your odds and ends in a breezy,
                  beach house style with these stylish agora bins! Handcrafted of 100% jute for a
                  natural, casual feel, these baskets are perfect for plants, laundry, toys…
                </p>

                <h2 className="heading  _heading-style">
                  As important as dreams are, they arent enough. Dreams don’t take you where you
                  want to go.
                </h2>

                <p className="describe">
                  Bethany Hamilton lives in Hawaii — her passion is surfing — her dream is to become
                  a professional surfer. She spends every available minute in the water, even
                  home-schooling so she can have more time to pursue her vision. At 8 years of age
                  she entered her first major competition taking the division championships that
                  year.
                </p>

                <div className="article">
                  <div className="action">
                    <KaImage
                      className="image"
                      src="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/single-blog.jpg"
                      alt=""
                      objectFit="cover"
                    />
                    <div className="note">This is caption. Picture by Unsplash</div>
                  </div>

                  <div className="description">
                    <div className="describe">
                      In that spirit of tempered optimism, and with the disclaimer that all of these
                      events are subject to change based on our capricious spinning friend…
                    </div>
                    <div className="describe">
                      Sir Dorian continues to keep us guessing as we stock up on water and consider
                      what pairs best with beef jerky and peanut butter. As of this writing, it
                      looks like the Orlando area may be spared the brunt of the storm, but it’s
                      always best to plan for the worst while we’re hoping for the best.
                    </div>
                  </div>
                </div>

                <div className="quote">
                  <span className="container">
                    <QuoteIcon className="icon" />
                  </span>

                  <p className="text">
                    A weekend that will be long remembered in my memory as a beautiful experience of
                    God’s healing hand at work through a community of loving.
                  </p>
                </div>

                <p className="describe">
                  Sir Dorian continues to keep us guessing as we stock up on water and consider what
                  pairs best with beef jerky and peanut butter. As of this writing, it looks like
                  the Orlando area may be spared the brunt of the storm, but it’s always best to
                  plan for the worst while we’re hoping for the best.
                </p>

                <div className="tags">
                  <p className="title">Tags:</p>
                  <div className="list">
                    {map(TAGS, ({ title, route }, idx) => (
                      <Tag key={`tags-${idx}`} label={title} link={route} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="kl-blog-navigation">
              <div className="nav -prev">
                <i className="fa-thin fa-arrow-left-long fa-2xl icon"></i>
                <div className="actions">
                  <Link href="/" title="" className="label">
                    Previous Article
                  </Link>
                  <Link href="/" title="" className="title">
                    Fresh Coconut: your most diuretic infusion
                  </Link>
                </div>
              </div>
              <div className="nav -next">
                <div className="actions">
                  <Link href="/" title="" className="label">
                    Next Article
                  </Link>
                  <Link href="/" title="" className="title">
                    Fresh Coconut: your most diuretic infusion
                  </Link>
                </div>
                <i className="fa-thin fa-arrow-right-long fa-2xl icon"></i>
              </div>
            </div>

            <div className="kl-blog-comments">
              <div className="kl-container content">
                <h2 className="title">Comment</h2>
                {/* <div className="comments">
                  {map(COMMENTS, ({ data, reply }, idx) => (
                    <div key={`comment-${idx}`} className="comment">
                      <CommentCard data={data} />
                      {map(reply, ({ data }, idx) => (
                        <div key={`reply-${idx}`} className="reply">
                          <CommentCard data={data} isReply />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <CommentForm title="Leave A Reply" /> */}
              </div>
            </div>
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </div>
    </KsLayout>
  );
};
export default Blog;
