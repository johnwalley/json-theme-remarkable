import {
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaMapPin,
  FaPhoneAlt,
} from "react-icons/fa";

import { Info } from "./info";
import type { ResumeType } from "../schema";
import styles from "./hero.module.css";

const countryDisplayNames: Record<string, string> = {
  GB: "UK",
};

export function Hero({ basics }: { basics: ResumeType["basics"] }) {
  const { name, label, profiles, location, email, phone, url } = basics;

  const linkedin = profiles.find(({ network }) => network === "linkedin");
  const github = profiles.find(({ network }) => network === "github");

  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>{name}</h1>
      {label && <p className={styles.label}>{label}</p>}
      <ul className={styles.basicInfo}>
        {location && (
          <Info>
            <FaMapPin />
            {location.city},{" "}
            {countryDisplayNames[location.countryCode] ?? location.countryCode}
          </Info>
        )}
        {email && (
          <Info>
            <FaEnvelope />
            <a href={`mailto:${email}`}>{email}</a>
          </Info>
        )}
        {phone && (
          <Info>
            <FaPhoneAlt />
            {phone}
          </Info>
        )}
        {url && (
          <Info>
            <FaLink />
            <a href={`https://${url}`}>{url}</a>
          </Info>
        )}
        {linkedin && (
          <Info>
            <FaLinkedin />
            <a href={linkedin.url}>{linkedin.username}</a>
          </Info>
        )}
        {github && (
          <Info>
            <FaGithub />
            <a href={github.url}>{github.username}</a>
          </Info>
        )}
      </ul>
    </header>
  );
}
