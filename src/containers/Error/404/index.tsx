import KsLayout from '@/layout';
import { KaImage, Link, Button } from '@components/primitive';

export default function Error404() {
  return (
    <KsLayout title="Page not found">
      <div className="kl-page-not-found">
        <div className="kl-container content ">
          <div className="wrapper">
            <div className="images">
              <KaImage
                src="https://demo2.wpopal.com/teapoz/wp-content/themes/teapoz/assets/images/404/404-img.png"
                alt="404 Page"
                className="image"
              />
            </div>
            <div className="error-content">
              <div className="page-title">
                <h1 className="title">404</h1>
              </div>
              <div className="error-text">
                <span className="description">We can’t find the page your are looking for</span>
              </div>
              <div className="error-button">
                <Link href="/" title="" className="link">
                  <Button
                    variant="outlined"
                    endAdornment={<i className="fa-solid fa-chevron-right icon" />}
                    color="primary"
                    className="button"
                  >
                    Back To HomePage
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
}
