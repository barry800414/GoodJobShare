import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import styles from './SiteMenu.module.css';

const Item = ({ to, text, className }) => (
  <li className={cn(styles.menuItem, className)}>
    <Link to={to} activeClassName={styles.isCurrent}>{text}</Link>
  </li>
);
Item.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const SiteMenu = () => (
  <ul className={styles.menu}>
    <li className={styles.menuItem}>
      <a href="/#section-form">開始參與</a>
    </li>
    <li className={styles.menuItem}>
      <a href="/time-and-salary">查看薪時</a>
    </li>
    <li className={styles.menuItem}>
      <a href="/#section-faq">常見問答</a>
    </li>
    <li className={styles.menuItem}>
      <a href="/about">關於我們</a>
    </li>
    <Item to="/labor-rights" text="勞動小教室" />
  </ul>
);

export default SiteMenu;
