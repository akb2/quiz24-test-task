import { string_generate } from './helpers';





//----------------------------------------------------------------------------------------------------------------------------------------
// События
//----------------------------------------------------------------------------------------------------------------------------------------


  // Запуск страницы
  $(window).off( 'load.flags_start' );
  $(window).on( 'load.flags_start', function () {
    init_flags();
  });


//----------------------------------------------------------------------------------------------------------------------------------------
// События
//----------------------------------------------------------------------------------------------------------------------------------------





//----------------------------------------------------------------------------------------------------------------------------------------
// Функции
//----------------------------------------------------------------------------------------------------------------------------------------


  // Инициализация инпутов
  function init_flags () {
    $('input[ type = radio ], input[ type = checkbox ]').each( function () {
      if ( !$(this).hasClass( 'flags-container__input' ) & !$(this).hasClass( 'flags-disabled' )) {
        let id = $(this).attr('id');
        id = typeof id === 'string'? id: '';
        id = id.length > 0? id: 'flags_element_' + string_generate( 32 );
        const has_label = $(this).next('label').length > 0? true: false;
        let placeholder = $(this).attr( 'placeholder' );
        placeholder = typeof placeholder === 'string'? placeholder: '';

        let objects = $();
        objects.push( this );


        if ( has_label ) {
          $( $(this).next('label')[0] ).attr({ 'for': id });
          $( $(this).next('label')[0] ).addClass( 'flags-container__helper' );
          objects.push( $(this).next('label')[0] );
        }

        else if ( placeholder.length > 0 ) {
          let placeholder_label = '<label class="flags-container__helper" for="' + id + '">' + placeholder + '</label>';
          $(this).after( placeholder_label );
          objects.push( $(this).next('.flags-container__helper')[0] );
        }


        let label = '<label class="flags-container__item" for="' + id + '"></label>';

        $(this).attr({ 'id': id });
        $(this).addClass('flags-container__input');
        $(this).after(label);

        objects.push( $(this).next('.flags-container__item')[0] );

        $(objects).wrapAll('<div class="flags-container"></div>');
      }
    });
  }


//----------------------------------------------------------------------------------------------------------------------------------------
// Функции
//----------------------------------------------------------------------------------------------------------------------------------------