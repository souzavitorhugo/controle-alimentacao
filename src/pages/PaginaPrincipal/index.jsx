import { Link } from 'react-router-dom'

import alimentacaoBtn from "../../append/btn-alimentacao.png";
import animaisBtn from "../../append/btn-animais.png";
import vacinacaoBtn from "../../append/btn-vacinacao.png";

import './index.css'

export default function PaginaPrincipal(props) {

    return (

        <div className="btn-container">
            <Link to="/animais">
                <button className="btn-menu"> <img src={animaisBtn} alt="botão menu da tela" /> <span> Animais </span>  </button>
            </Link>

            <Link to="/alimentacao">
                <button className="btn-menu"> <img src={alimentacaoBtn} alt="botão menu da tela" /> <span> Alimentação </span>  </button>
            </Link>

            <Link to="/vacinacao">
                <button className="btn-menu"> <img src={vacinacaoBtn} alt="botão menu da tela" /> <span> Vacinação </span>  </button>
            </Link>
        </div>

    )
}