import { Link, useNavigate } from 'react-router-dom'

import alimentacao from "./append/btn-alimentacao.png";
import animais from "./append/btn-animais.png";
// import pataBtn from "./append/btn-pata.png";
// import vacinacaoBtn from "./append/btn-vacinacao.png";

export default function MainButton(props){
    const modulos = props.modulos;

    const navigate = useNavigate();
    
    function handleClick(modulo) {
        navigate(`/${modulo}`, {state: {modulo: modulo}})
    }

    const listModulos = modulos.map((modulo) => {
        <button onClick={() => handleClick}>
            <img src={modulo} alt="" className="main-menu-btn"/> {modulo}
        </button>
    })

    const listaTeste = modulos.map((modulo) => {
        <button>
            {modulo}
        </button>
    })

    return (
        <li> {listaTeste} </li>
    )
}