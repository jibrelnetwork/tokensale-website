import React from 'react'

const LINKS = [{
  icon: 'twitter',
  link: 'https://twitter.com/JibrelNetwork',
  label: 'Twitter',
}, {
  icon: 'reddit',
  link: 'https://www.reddit.com/r/JibrelNetwork',
  label: 'Reddit',
}, {
  icon: 'bitcointalk',
  link: 'https://bitcointalk.org/index.php?topic=2057487.0',
  label: 'Bitcointalk',
}, {
  icon: 'kakaotalk',
  link: 'https://open.kakao.com/o/gJDnwxB',
  label: 'Kakaotalk',
}, {
  icon: 'medium',
  link: 'https://medium.com/@jibrelnetwork',
  label: 'Medium',
}, {
  icon: 'youtube',
  link: 'https://www.youtube.com/watch?v=LBMyd7Ql8QU',
  label: 'Youtube',
}, {
  icon: 'telegram',
  link: 'https://t.me/jibrel_network',
  label: 'Telegram',
}, {
  icon: 'slack',
  link: 'https://jibrelnetwork.slack.com',
  label: 'Slack',
}]

const Social = () => (
  <div className="Social">
    <div className="section footer">
      <div className="inner">
        <ul className="links">
          {LINKS.map(({ icon, link, label }) => (
            <li key={icon}>
              <a
                href={link}
                className={`icons big icon-big-${icon}`}
                target="_blank"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="copy">
          © 2017 Jibrel Network. All Rights Reserved.
          <br />
          Baarerstrasse 10, 6302 Zug, Switzerland
        </p>
      </div>
    </div>
  </div>
)

export default Social
