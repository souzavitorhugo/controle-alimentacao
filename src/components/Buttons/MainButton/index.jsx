import { Link, useNavigate } from 'react-router-dom'

import alimentacaoBtn from "./append/btn-alimentacao.png";
import animaisBtn from "./append/btn-animais.png";
import pataBtn from "./append/btn-pata.png";
import vacinacaoBtn from "./append/btn-vacinacao.png";

export default function MainButton(props){
    const navigate = useNavigate();
    
    function handleClick(modulo) {
        debugger
        navigate(`/${modulo}`, {state: {modulo: modulo}})
    }

    return (
        <button onClick={() => handleClick('alimentacao')}>
            <img src="alimentacaoBtn" alt="" className="main-menu-btn"/> Alimentação
        </button>
        
    )
}