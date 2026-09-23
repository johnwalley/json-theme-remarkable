import {
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaMapPin,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

import { Info } from "./info";
import { ResumeType } from "../App";
import styles from "./hero.module.css";

const countryDisplayNames: Record<string, string> = {
  GB: "UK",
};

export function Hero({ basics }: { basics: ResumeType["basics"] }) {
  const { name, profiles, location, email, phone, url } = basics;

  const linkedin = profiles.find(({ network }) => network === "linkedin");
  const github = profiles.find(({ network }) => network === "github");
  const twitter = profiles.find(({ network }) => network === "twitter");

  return (
    <div className={styles.hero}>
      <div className={styles.title}>{name}</div>
      <div className={styles.basicInfo}>
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
        {twitter && (
          <Info>
            <FaTwitter />
            <a href={twitter.url}>{twitter.username}</a>
          </Info>
        )}
      </div>
    </div>
  );
}
