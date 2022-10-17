import React, {useState} from 'react';
// @ts-ignore
import Logo from './logo.jpeg'

const App = () => {
    const [value, setValue] = useState<number>(0)

    const onBtnClick = () => {
        setValue(value + 1)
    }

    return (
        <div>
            <img src={Logo} alt='sdf'/>
            <h1>value: {value}</h1>
            <button onClick={onBtnClick}>CLICK ME</button>
        </div>
    );
};

export default App;