import {Fragment} from 'react';

import Navigator from '../../components/Navigation/index';
import Header from '../../components/Header/index';

export default function PaginaPrincipal() {
    return (
        <Fragment>
            <Header/>
            <Navigator/>
            <div>
                <h1> teste </h1>
            </div>
        </Fragment>
    )
}