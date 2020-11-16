//----------------------------------------------------------------------------------------------------------------------------------------
// События
//----------------------------------------------------------------------------------------------------------------------------------------


  // Запуск страницы
  $(window).off( 'load.correct_scroll' );
  $(window).on( 'load.correct_scroll', function ( event ) {
    correct_scroll( this, event );
    attach_footer( this, event );
  });


  // Скроллинг страницы
  $(document).scroll( function ( event ) {
    correct_scroll( this, event );
  });


  // Изменение размера окна
  $(window).off( 'resize.attach_footer' );
  $(window).on( 'resize.attach_footer', function ( event ) {
    correct_scroll( this, event );
    attach_footer( this, event );
  });


//----------------------------------------------------------------------------------------------------------------------------------------
// События
//----------------------------------------------------------------------------------------------------------------------------------------





//----------------------------------------------------------------------------------------------------------------------------------------
// Функции
//----------------------------------------------------------------------------------------------------------------------------------------


  // Скорректировать горизонтальный скролл
  function correct_scroll ( context, event ) {
    const scroll = $(document).scrollLeft();

    if ( scroll > 0 )
      { $(document).scrollLeft(0); }
  }


  // Зафиксировать подвал снизу
  function attach_footer ( context, event ) {
    const page = $('main#page')[0];
    const footer = $(page).children('footer')[0];
    let o_height = 0;
    let h_height = header_height();
    let d_height = window.innerHeight;
    let m_height = d_height - h_height - $(footer).outerHeight( true );
    let last_elm = new Object();



    // Растянуть единственную секцию
    if ( $(page).children('.expand-section').length > 0 ) {
      $(page).children('.expand-section').css({
        'min-height': ( d_height - h_height - $(footer).outerHeight( false )),
        'height': 'auto'
      });
    }

    // Обыная фиксация подвала
    else {
      const filters = [
        '.section-1',
        '.section-2',
        '.section-3',
        '.component_level',
        '.slider-section',
        '*[ id ^= "comp_" ]',
      ];

      $(page).children().each( function ( i ) {
        for ( let selector of filters ) {
          if ( $(this).filter( selector ).length > 0 ) {
            o_height += $(this).outerHeight( true );
            last_elm = this;
            break;
          }
        }
      });



      if ( m_height > o_height ) {
        let padding = parseInt( $(last_elm).css( 'padding-bottom' ));
        padding = isNaN(padding)? 0: padding;

        $(last_elm).css({ 'padding-bottom': ( m_height - o_height ) + 'px' });
      }
    }
  }


  // Высота шапки
  function header_height () {
    let d_width = window.innerWidth;
    let ret = 0;


    // Отступы шапки для десктопа
    if ( d_width > 900 ) {
      ret =
        $( $( $('main#page')[0] ).children('header')[0] ).outerHeight( true ) +
        $('.main-menu').outerHeight( true )
      ;
    }


    // Отступы шапки для телефона
    else
      { ret = $('.header-block__element_mobile').outerHeight( true ); }


    return ret;
  }


//----------------------------------------------------------------------------------------------------------------------------------------
// Функции
//----------------------------------------------------------------------------------------------------------------------------------------