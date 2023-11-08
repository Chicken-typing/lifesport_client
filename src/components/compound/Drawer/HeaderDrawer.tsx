import { Link } from '@components/primitive';
import { Collapse } from '@mui/material';
import { map } from 'lodash';
import { MouseEvent, useState } from 'react';
import { MENU_LIST } from './constants';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch } from '@/store/hooks';

export default function MenuDrawer() {
  const [dropdown, setDropdown] = useState<string>('');
  const [subDropdown, setSubDropDown] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleCollapse = (label: string, submenu: any) => (event: MouseEvent<HTMLElement>) => {
    if (!submenu) return;
    event.preventDefault();
    setDropdown(dropdown !== label ? label : '');
  };

  return (
    <div className="kl-menu-drawer">
      <div className="header">
        <button onClick={() => dispatch(closeDrawer())} className="action">
          <i className="fa-regular fa-xmark fa-xs" />
        </button>
      </div>

      <ul className="menu">
        {map(MENU_LIST, ({ label, route, submenu }) => (
          <li className="item" key={`menu-${label}`}>
            <Link
              rightIcon={
                submenu && (
                  <button className="btn">
                    <span className="chevron">
                      <i
                        className={
                          dropdown !== label
                            ? 'fa-solid fa-chevron-right fa-2xs'
                            : 'fa-solid fa-chevron-down fa-2xs'
                        }
                      />
                    </span>
                  </button>
                )
              }
              className="link _link-size"
              title={label}
              href={route}
            >
              {label}
              <div onClick={handleCollapse(label, submenu)} className="overlay" />
            </Link>

            <Collapse in={dropdown === label} timeout="auto" unmountOnExit>
              <div className="kl-menu-drawer-content">
                <ul className="sub">
                  {map(submenu, (subItem) => (
                    <li
                      onClick={() => {
                        subItem.submenu &&
                          setSubDropDown(subDropdown !== subItem.label ? subItem.label : '');
                      }}
                      className="item"
                      key={`sub-${subItem.label}`}
                    >
                      <Link className="link _link-size" title={subItem.label} href={subItem.route}>
                        {subItem.label}
                      </Link>
                      {subItem.submenu && (
                        <button className="btn">
                          <span className="chevron">
                            <i
                              className={`${
                                subDropdown !== subItem.label
                                  ? 'fa-solid fa-chevron-right fa-2xs'
                                  : 'fa-solid fa-chevron-down fa-2xs'
                              }`}
                            ></i>
                          </span>
                        </button>
                      )}
                      <Collapse in={subDropdown === subItem.label} timeout="auto" unmountOnExit>
                        <div className="kl-menu-drawer-children">
                          <ul className="child">
                            {map(subItem.submenu, (child) => (
                              <li className="item" key={`child-${child.label}`}>
                                <Link
                                  className="link _link-size"
                                  title={child.label}
                                  href={child.route}
                                >
                                  {child.label}
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
  );
}
