import React from 'react';
import { Link } from '@components/primitive';
import { MENU_BOTTOM } from './constant';
import { map } from 'lodash';
export default function MenuBottom() {
  return (
    <div className="kl-menu-bottom">
      <div className="wrapper">
        {map(MENU_BOTTOM, ({ title, className, route }, idx) => (
          <Link key={`menu-bottom-${idx}`} href={route} title="" className="action">
            <i className={className}></i>
            <div className="title">{title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
