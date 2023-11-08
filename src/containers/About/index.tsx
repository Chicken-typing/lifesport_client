import KsLayout from '@/layout';
import { useAppDispatch } from '@/store/hooks';
import { MODALS } from '@/store/modals/constants';
import { openModal } from '@/store/modals/slice';
import { Button, KaImage, Link } from '@components/primitive';
import { map } from 'lodash';
import { ARCHIVE, CONTACT, EXPERIENCE, PROCESS_ITEMS } from './constants';

const About = () => {
  const { title, action, header, image, text } = EXPERIENCE;
  const dispatch = useAppDispatch();

  return (
    <KsLayout title="Giới thiệu">
      <div className="kl-about">
        <section className="kl-about-experience kl-container">
          <div className="wrapper row">
            <div className="left col-12 col-lg-6">
              <KaImage src={image} alt="experience" objectFit="cover" className="image" />
              <div className="widget">
                <KaImage
                  src="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/about-decor-2.png"
                  alt="widget"
                />
              </div>
            </div>

            <div className="right col-12 col-lg-6">
              <p className="header">{header}</p>
              <h1 className="title">{title}</h1>
              <p className="text">{text}</p>
              <Button
                variant="outlined"
                color="primary"
                className="action"
                endAdornment={<i className="fa-solid fa-chevron-right fa-2xs" />}
              >
                {action}
              </Button>

              <div className="widget">
                <KaImage
                  src="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/about-decor-1.png"
                  alt="widget"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="kl-about-process">
          <div className="content">
            <div className="wrapper row">
              {map(PROCESS_ITEMS, ({ icon, title, description }, idx) => (
                <div className="item" key={idx}>
                  <div className="icon">{icon}</div>
                  <div className="box">
                    <h3 className="title">{title}</h3>
                    <p className="description">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="kl-about-contact kl-container">
          <div className="wrapper">
            {map(CONTACT, ({ image, subtitle, title, description, action }, idx) => (
              <div
                className="content"
                key={`contact-${idx}`}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="article">
                  <p className="subtitle">{subtitle}</p>
                  <h3 className="title">{title}</h3>
                  <p className="description">{description}</p>
                  <Link
                    className="link"
                    href="/"
                    title=""
                    rightIcon={<i className="fa-solid fa-chevron-right fa-xs icon" />}
                    underline
                    color="black"
                    size="sm"
                  >
                    {action}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="kl-about-trailer">
          <div className="kl-container content">
            <div className="wrapper">
              <div className="images">
                <KaImage
                  src="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/about-bg-4.jpg"
                  alt="trailer"
                  objectFit="contain"
                  className="image"
                  ratio="square"
                />
                <div className="buttons">
                  <Button
                    onClick={() => dispatch(openModal({ view: MODALS.TRAILER }))}
                    className="button"
                    circle
                  >
                    <i className="fa-light fa-play icon" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kl-about-archivements">
          <div className="kl-container wrapper">
            <div className="heading">
              <h1 className="award">Award Winning</h1>
              <h6 className="text">what we archive</h6>
            </div>
            <div className="row">
              {map(ARCHIVE, ({ image, year, name }, idx) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg info"
                  key={`archivement-item-${idx}`}
                >
                  <div className="kl-about-archivement">
                    <div className="images">
                      <KaImage src={image} className="image" alt="image" />
                    </div>
                  </div>
                  <div className="title">
                    <div className="year">{year}</div>
                    <div className="name">{name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </KsLayout>
  );
};
export default About;
