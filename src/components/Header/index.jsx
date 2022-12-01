import Logo from './append/logo-vet.png';

import './index.css';
 
export default function Header() {
    return (
        <header className="header-container">

            <div className="header-logo">
                <img className="" src={Logo} alt="logo do aplicativo"/>
            </div>

            <div className="header-center">
                <h6> Vitor Hugo de Souza </h6>
            </div>
        </header>
    )
}