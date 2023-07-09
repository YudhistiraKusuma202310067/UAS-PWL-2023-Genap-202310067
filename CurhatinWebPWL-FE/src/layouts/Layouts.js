import React from 'react';
import Header from './components/header/Header';

const Layouts = (props) => {
    return (
        <div id="main-layout">
            <Header />

            <main className='mt-20 py-10'>
                {props.children}
            </main>

            {/* <Footers />
            <ModalPopUp /> */}
        </div>
    );
}

export default Layouts;
