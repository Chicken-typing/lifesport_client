import React, { useEffect, useState } from 'react';
import { Link } from '@components/primitive';
import { MENU_LANGUAGE, MENU_CURRENCY } from './constant';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export default function TopMenu() {
  const router = useRouter();
  const locale = router.locale || {};
  const { t } = useTranslation('common');

  return (
    <div className="kl-top-menu">
      <div className="kl-top-menu-wrapper">
        <ul className="left">
          <div className="title _text-sm">{t('top_menu.title')}</div>
        </ul>
        <ul className="right">
          <li className="language">
            <div className="selected">
              <span className="label _text-sm">
                {locale === 'vi' ? 'Vietnamese (vi)' : 'English (en)'}
              </span>
              <span className="chevron">
                <i className="fa-thin fa-chevron-down fa-2xs icon _icon-hover -font-icon"></i>
              </span>
            </div>
            <ul className="menu">
              {map(MENU_LANGUAGE, (item) => (
                <li key={item.name} className="list">
                  <Link
                    locale={item?.locale}
                    href={router.pathname}
                    title="locale"
                    className="choices"
                  >
                    <div className="other-choices">{item.name}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {/* <li className="monetary">
            <div className="selected">
              <span className="currency">
                <i className="fa-light fa-dong-sign fa-sm _icon-hover"></i>
              </span>
              <span className="label _text-sm">VNĐ</span>
              <span className="chevron">
                <i className="fa-thin fa-chevron-down fa-2xs icon _icon-hover -font-icon"></i>
              </span>
            </div>
            <ul className="menu">
              {map(MENU_CURRENCY, ({ icon, name }) => (
                <li key={name} className="list">
                  <div className="choices">
                    <i className={icon} />
                    <div className="name">{name}</div>
                  </div>
                </li>
              ))}
            </ul>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
