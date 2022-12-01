import { useNavigate } from 'react-router-dom'

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