import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import image_ilk from './images/ilk_resim.jpg';
import image_bos from './images/bos_kare.jpg';
import image_mayin from './images/mayin.jpg';
import image_sayi1 from './images/sayi_1.jpg';
import image_sayi2 from './images/sayi_2.jpg';
import image_sayi3 from './images/sayi_3.jpg';
import image_sayi4 from './images/sayi_4.jpg';

function Kare( props )
{
    let image = props.image_ilk;

    if( props.value == 'M' )
        image = props.image_mayin;
    else if( props.value == 1 )
        image = props.image_sayi1;
    else if( props.value == 2 )
        image = props.image_sayi2;
    else if( props.value == 3 )
        image = props.image_sayi3;
    else if( props.value == 4 )
        image = props.image_sayi4;
    else if( props.value == 0 )
        image = props.image_bos;

    return (
        <img className="kare" onClick={props.onclick} src={image}>
        </img>
    );
}

class Tahta extends React.Component
{

    kareOlustur( ind ){

        return <Kare key={ind}
                     value={this.props.karler[ind]}
                     image_ilk={image_ilk}
                     image_bos={image_bos}
                     image_mayin={image_mayin}
                     image_sayi1={image_sayi1}
                     image_sayi2={image_sayi2}
                     image_sayi3={image_sayi3}
                     image_sayi4={image_sayi4}
                     onclick={()=>this.props.handClick(ind)}
        />
    }

    render() {

        const kareler = [];

        let kareSira = 0;
        for ( let h = 0 ; h < 10 ; h++ )
        {
            for ( let w = 0; w < 10 ; w++ )
            {
                kareler.push(this.kareOlustur(kareSira));
                kareSira++;
            }
        }

        return (
            <div>
                {kareler}
            </div>
        );
    }
}

class Oyun extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            kareler:Array(100).fill(null),
            mayinlar:mayinDose(),
            oyunBitti:false,
        }
    }

    handleClick = function ( ind )
    {
        if( this.state.oyunBitti ) return;

        const kopyaKareler = this.state.kareler.slice();

        let value = this.state.mayinlar[ind];
        let oyunBitti = false;

        kopyaKareler[ind] = value;
        if( value == "M" ) // mayınnnnn.
            oyunBitti = true;

        this.setState({
            kareler: kopyaKareler,
            oyunBitti: oyunBitti
        })

    }

    render() {

        let title = "Oyunumuza Hoş Geldiniz";
        let durum = "";

        if( this.state.oyunBitti )
            durum = "KAYBETTİNİZ";

        return (

            <div>
                <div><h3>Merhaba</h3>{title}</div>
                <div className="tahtaCervece">
                    <Tahta
                        karler={this.state.kareler}
                        handClick ={(i) => this.handleClick(i)}
                    >
                    </Tahta>
                </div>

                <div><h3 className="durumClass">{durum}</h3></div>

            </div>

        )
    }
}

function mayinDose()
{
    const min = 0;
    const max = 99;
    const mayinArr = Array(100).fill(0);

    let mayin_sayisi = 4;
    let yerlestirilen = 0;
    let index = 0;

    for( yerlestirilen ; yerlestirilen < mayin_sayisi ;yerlestirilen++ )
    {
        const rand = parseInt(min + Math.random() * (max - min) );

        if( mayinArr[rand] != "M" ) // indexde mayın yok
        {
            mayinArr[rand] = "M";

            if( rand % 10 != 0  ) // en solda olduğu için sol tarafı kontrol edilmeyecek
            {
                index = rand-11;
                if( index >= 0 && mayinArr[index] != "M" )
                    mayinArr[index]++;

                index = rand-1;
                if( index >= 0 && mayinArr[index] != "M" )
                    mayinArr[index]++;

                index = rand+9;
                if( index < 100 && mayinArr[index] != "M" )
                    mayinArr[index]++;
            }

            if( rand % 10 != 9 ) // en sağda olduğu için sağ tarafı kontrol edilmeyecek
            {
                index = rand-9;
                if( index >= 0 && mayinArr[index] != "M" )
                    mayinArr[index]++;

                index = rand+1;
                if( index < 100 && mayinArr[index] != "M" )
                    mayinArr[index]++;

                index = rand+11;
                if( index < 100 && mayinArr[index] != "M" )
                    mayinArr[index]++;
            }


            index = rand-10;
            if( index >= 0 && mayinArr[index] != "M" )
                mayinArr[index]++;

            index = rand+10;
            if( index < 100 && mayinArr[index] != "M" )
                mayinArr[index]++;

        }

    }

    return mayinArr;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Oyun>

  </Oyun>
);