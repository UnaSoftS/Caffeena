import Image from "next/image";
import styles from "./AnimatedMascot.module.css";

export default function AnimatedMascot() {
  return (
    <div className={styles.floating}>
      <Image
        src='/images/mascot.png' // ضع هنا مسار صورتك (يمكن SVG أو PNG)
        alt="Mascot"
        width={300}
        height={300}
        priority
      />
    </div>
  );
}
