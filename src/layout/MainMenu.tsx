import React from 'react';
import { MENU_LIST } from './constant';
import { map, isEmpty } from 'lodash';
import { Link } from '@components/primitive';
import useTranslation from 'next-translate/useTranslation';

interface INavigation {
  title: string;
  route: string;
  subMenu?: INavigation[];
}

export default function MainMenu() {
  const { t } = useTranslation('common');
  const menu = t('navigation', {}, { returnObjects: true });

  return (
    <nav className="kl-main-menu">
      <div className="kl-menu-wrapper">
        <ul className="menu">
          {map(menu, (item: INavigation) => (
            <li className="item" key={item.title}>
              <Link className="link" title={item.title} href={item.route}>
                {item.title}
                {!isEmpty(item.subMenu) && (
                  <span className="chevron">
                    <i className="fa-thin fa-chevron-down fa-sm icon"></i>
                  </span>
                )}
              </Link>
              <ul className="kl-main-menu-childrens">
                {map(item.subMenu, (subItem) => (
                  <li className="item" key={subItem.title}>
                    <div className="wrapper">
                      <Link className="link" title={subItem.title} href={subItem.route}>
                        {subItem.title}
                      </Link>
                      {!isEmpty(subItem?.subMenu) && (
                        <span className="chevron">
                          <i className="fa-solid fa-chevron-right fa-xs"></i>
                        </span>
                      )}
                    </div>
                    {/* <ul className="child">
                      {!isEmpty(subItem?.submenu) &&
                        map(subItem?.submenu, (child) => (
                          <li className="item" key={child.label}>
                            <Link className="link" title={child.label} href={child.route}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                    </ul> */}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
