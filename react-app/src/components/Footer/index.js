import "./Footer.css";


const Footer = () => {
    return (
        <div className="Footer-Container">
            <div className="Footer-Left">
                <a href="https://github.com/wtorresjr/Craftsy-Etsy-Clone" target="_blank">
                    <i class="fa-brands fa-github"></i>
                </a>
            </div>
            <div className="Footer-Middle">
                <p>Built with collaboration and communication. ❤️</p>
            </div>
            <div className="Footer-Right">
                <ul>
                    <li><a href="https://github.com/T3mousa" target="_blank">Tamara Mousa</a></li>
                    <li><a href="https://github.com/wtorresjr" target="_blank">Will Torres</a></li>
                    <li><a href="https://github.com/calderon1199" target="_blank">Daniel Calderon</a></li>
                    <li><a href="https://github.com/kryskimmel" target="_blank">Krystal Kimmel</a></li>
                    <li><a href="https://github.com/iankimm" target="_blank">Ian Kimm</a></li>
                </ul>
            </div>

        </div>
    );
}

export default Footer;
