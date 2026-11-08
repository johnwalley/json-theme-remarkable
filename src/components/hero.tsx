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
import { toDisplay, toHref } from "../lib/url";
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

export function Hero({ basics }: { basics: ResumeType["basics"] }) {
  const { name, label, profiles, location, email, phone, url } = basics;
  const place = [
    location?.city,
    location?.countryCode &&
      (countryDisplayNames[location.countryCode] ?? location.countryCode),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>{name}</h1>
      {label && <p className={styles.label}>{label}</p>}
      <ul className={styles.basicInfo}>
        {place && (
          <Info>
            <FaMapPin />
            {place}
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
            <Info key={`${network}:${username}`}>
              <Icon aria-hidden />
              {url ? (
                <a href={url} aria-label={`${network}: ${username}`}>
                  {username}
                </a>
              ) : (
                username
              )}
            </Info>
          );
        })}
      </ul>
    </header>
  );
}
