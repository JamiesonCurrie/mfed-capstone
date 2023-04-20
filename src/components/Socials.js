import {
  faGithub
, faLinkedin
, faMedium
, faStackOverflow
} from "@fortawesome/free-brands-svg-icons";

const socials = [
    {
        icon: faGithub,
        url: "https://github.com",
    }
,   {
        icon: faLinkedin,
        url: "https://www.linkedin.com",
    }
,   {
        icon: faMedium,
        url: "https://medium.com",
    }
,   {
        icon: faStackOverflow,
        url: "https://stackoverflow.com",
    }
];

const Socials = () => {
    return (
        <nav>
            {socials.map((social) => {
                return (
                    <li>
                        <a key={social.url} href={social.url}>
                            <FontAwesomeIcon icon={social.icon} size='2x' />
                        </a>
                    </li>
                );
            })}
        </nav>
    );
};

export default Socials;