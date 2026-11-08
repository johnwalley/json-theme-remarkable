import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaGithub,
  FaGitlab,
  FaLink,
  FaLinkedin,
  FaMapPin,
  FaMastodon,
  FaPhoneAlt,
  FaStackOverflow,
} from "react-icons/fa";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";

import { Info } from "./info";
import type { ResumeType } from "../schema";
import styles from "./hero.module.css";

const countryDisplayNames: Record<string, string> = {
  GB: "UK",
};

// Keyed by lower-cased JSON Resume `network`; unknown networks get FaLink.
const networkIcons: Record<string, IconType> = {
  bluesky: FaBluesky,
  github: FaGithub,
  gitlab: FaGitlab,
  linkedin: FaLinkedin,
  mastodon: FaMastodon,
  stackoverflow: FaStackOverflow,
  twitter: FaXTwitter,
  x: FaXTwitter,
};

/** JSON Resume URLs should include a protocol, but tolerate bare domains. */
function toHref(url: string) {
  return /^[a-z][a-z\d+.-]*:/i.test(url) ? url : `https://${url}`;
}

/** Display a URL without its protocol or trailing slash. */
function toDisplay(url: string) {
  return url.replace(/^[a-z][a-z\d+.-]*:\/\//i, "").replace(/\/$/, "");
}

export function Hero({ basics }: { basics: ResumeType["basics"] }) {
  const { name, label, profiles, location, email, phone, url } = basics;

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
            <a href={toHref(url)}>{toDisplay(url)}</a>
          </Info>
        )}
        {profiles.map(({ network, username, url }) => {
          const Icon = networkIcons[network.toLowerCase()] ?? FaLink;
          return (
            <Info key={url}>
              <Icon aria-hidden />
              <a href={url} aria-label={`${network}: ${username}`}>
                {username}
              </a>
            </Info>
          );
        })}
      </ul>
    </header>
  );
}
