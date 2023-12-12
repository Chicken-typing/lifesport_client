import { Link } from '@components/primitive';
import { Collapse, Drawer } from '@mui/material';
import { map } from 'lodash';
import { MouseEvent, useState } from 'react';
import { MENU_LIST } from './constants';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch } from '@/store/hooks';
import useTranslation from 'next-translate/useTranslation';

interface INavigation {
  title: string;
  route: string;
  subMenu?: INavigation[];
}

export default function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dropdown, setDropdown] = useState<string>('');
  const [subDropdown, setSubDropDown] = useState<string>('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const menu = t('navigation', {}, { returnObjects: true });

  const handleCollapse =
    (label: string, subMenu: INavigation[]) => (event: MouseEvent<HTMLElement>) => {
      if (!subMenu) return;
      event.preventDefault();
      setDropdown(dropdown !== label ? label : '');
    };

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="kl-drawer-header">
        <div className="kl-menu-drawer">
          <div className="header">
            <button onClick={onClose} className="action">
              <i className="fa-regular fa-xmark fa-xs" />
            </button>
          </div>

          <ul className="menu">
            {map(menu, (item: INavigation) => (
              <li className="item" key={`menu-${item.title}`}>
                <Link
                  rightIcon={
                    item?.subMenu && (
                      <button className="btn">
                        <span className="chevron">
                          <i
                            className={
                              dropdown !== item.title
                                ? 'fa-solid fa-chevron-right fa-2xs'
                                : 'fa-solid fa-chevron-down fa-2xs'
                            }
                          />
                        </span>
                      </button>
                    )
                  }
                  className="link _link-size"
                  title={item.title}
                  href={item.route}
                >
                  {item.title}
                  <div
                    onClick={handleCollapse(item.title, item.subMenu || [])}
                    className="overlay"
                  />
                </Link>

                <Collapse in={dropdown === item.title} timeout="auto" unmountOnExit>
                  <div className="kl-menu-drawer-content">
                    <ul className="sub">
                      {map(item.subMenu, (subItem) => (
                        <li
                          onClick={() => {
                            subItem.subMenu &&
                              setSubDropDown(subDropdown !== subItem.title ? subItem.title : '');
                          }}
                          className="item"
                          key={`sub-${subItem.title}`}
                        >
                          <Link
                            className="link _link-size"
                            title={subItem.title}
                            href={subItem.route}
                          >
                            {subItem.title}
                          </Link>
                          {subItem.subMenu && (
                            <button className="btn">
                              <span className="chevron">
                                <i
                                  className={`${
                                    subDropdown !== subItem.title
                                      ? 'fa-solid fa-chevron-right fa-2xs'
                                      : 'fa-solid fa-chevron-down fa-2xs'
                                  }`}
                                ></i>
                              </span>
                            </button>
                          )}
                          <Collapse in={subDropdown === subItem.title} timeout="auto" unmountOnExit>
                            <div className="kl-menu-drawer-children">
                              <ul className="child">
                                {map(subItem.subMenu, (child) => (
                                  <li className="item" key={`child-${child.title}`}>
                                    <Link
                                      className="link _link-size"
                                      title={child.title}
                                      href={child.route}
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Collapse>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Collapse>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  );
}
