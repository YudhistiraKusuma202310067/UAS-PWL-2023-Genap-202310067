import React from 'react';

const Home = () => {
    return (
        <div className='row p-5' style={{marginTop: "150px"}}>
            <div className='col'>
                <h1><strong>Temukan Teman dan Keluarga Baru mu Disini</strong></h1>   
                <h4 style={{marginTop: 25}}>CurhatIn hadir untuk mendengarkan segala cerita Kamu, karena Kami sadar betapa pentingnya dan betapa berharganya cerita mu</h4>
            </div>
            <div className='col d-flex flex-center mt-5'>
                <img src={require('../../../asset/image 1.png') } style={{
                    objectFit:"cover", 
                    height:"300px"
                }}/>
            </div>
        </div>
    );
}

export default Home;
