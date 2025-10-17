import Link from "next/link";
import { PiCastleTurretThin } from "react-icons/pi";
import styles from "./header.module.css";

export default function Navbar2() {
  return (
    <div>
      <nav className={styles.nav}>
        <div>
          ,<Link href="">BinCastle</Link>
          <PiCastleTurretThin />
          <div>
            <ul className={styles.navLinks}>
              <li>
                <Link className={styles.navlinks} href="/home">Home </Link>
                <Link className={styles.navlinksk} href="/about">About </Link>
                <Link className={styles.navlinksk} href="/contact">Contact </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
