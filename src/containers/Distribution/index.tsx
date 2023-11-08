import KsLayout from '@/layout';
import { Accordion } from '@components/compound';
import { KaImage, Link } from '@components/primitive';
import { routes } from '@utils/routes';
import { map } from 'lodash';
import { ReactNode, useState } from 'react';
import { DISTRIBUTION, URL_IMAGES } from './constants';

const Distribution = () => {
  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      Trang Chủ
    </Link>,
    <p className="kl-page-header-text" key="shop">
      Hệ Thống Phân Phối
    </p>,
  ];

  const [expandedCity, setExpandedCity] = useState<string>('');
  const [expandedDistrict, setExpandedDistrict] = useState<string>('');

  return (
    <KsLayout
      title="Hệ Thống Phân Phối"
      hasPageHeader
      pageHeaderTitle="Hệ Thống Phân Phối"
      pageHeaderBackground="https://demo2.wpopal.com/teapoz/wp-content/uploads/2023/05/shop-bc-bg.jpg"
      breadcrumbs={breadcrumbs}
    >
      <div className="kl-distribution kl-container">
        <div className="kl-distribution-layout">
          <div className="content">
            <h2 className="title">Hệ Thống Phân Phối</h2>

            <ul className="city">
              {map(DISTRIBUTION, ({ province, districts }, idx) => (
                <li key={`city-${idx}`}>
                  <Accordion
                    title={province}
                    classes={{
                      root: 'city-root',
                      summaryRoot: 'city-summary-root',
                      summaryContent: 'city-summary-content flex-center-ver',
                      detail: 'city-detail',
                    }}
                    onChange={() => setExpandedCity(province === expandedCity ? '' : province)}
                    isActive={province === expandedCity}
                    hasIcon
                    iconPosition="start"
                  >
                    {map(districts, ({ branchs, name }, idx) => (
                      <Accordion
                        title={name}
                        key={`districts-${idx}`}
                        classes={{
                          root: 'districts-root',
                          summaryRoot: 'districts-summary-root',
                          summaryContent: 'districts-summary-content flex-center-ver',
                          detail: 'districts-detail',
                        }}
                        onChange={() => setExpandedDistrict(name === expandedDistrict ? '' : name)}
                        isActive={name === expandedDistrict}
                        hasIcon
                        iconPosition="start"
                      >
                        {map(branchs, (branch, index) => (
                          <div className="branch" key={`branch-${index}`}>
                            <Link href="/" title="" className="link">
                              {branch}
                            </Link>
                          </div>
                        ))}
                      </Accordion>
                    ))}
                  </Accordion>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar">
            {map(URL_IMAGES, (url, idx) => (
              <KaImage
                key={`distribution-image-${idx}`}
                src={url}
                alt="image"
                className="image"
                objectFit="contain"
              />
            ))}
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default Distribution;
