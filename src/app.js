
import './scripts/jquery-plugins/maskedinput';

import './scripts/flags';
import './scripts/misc';
import './scripts/quiz-form';



$( window ).off( 'load.app_loader' );
$( window ).on( 'load.app_loader', function () {
  $( 'input[ type = tel ]' ).each( function () {
    $( this ).mask( '9 (999) 999-99-99', { placeholder: '_' })
    $( this ).attr( 'placeholder', '_ (___) ___-__-__' );
  });
});






import './styles/app.scss';