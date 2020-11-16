//----------------------------------------------------------------------------------------------------------------------------------------
// Данные
//----------------------------------------------------------------------------------------------------------------------------------------


  const loader_class = 'form-loader';
  const loader_progress_class = loader_class + '__right';
  const loader_progress_text_class = loader_class + '__checker-progress';

  const loader_over50_class = 'over-50';
  const loader_finish_class = 'over-100';
  const loader_inprogress_class = 'in-progress';

  const demo_start = 0;
  const demo_wait_time = 50;
  const progress_max = 100;
  const progress_step = 1;


//----------------------------------------------------------------------------------------------------------------------------------------
// Данные
//----------------------------------------------------------------------------------------------------------------------------------------





//----------------------------------------------------------------------------------------------------------------------------------------
// События
//----------------------------------------------------------------------------------------------------------------------------------------


  $( document ).off( 'scroll.quiz-form' );
  $( document ).on( 'scroll.quiz-form', function ( event ) {
    $( '.' + loader_class ).each( function () {
      const s_top = $( document ).scrollTop() + window.innerHeight;
      const yes = $( this ).offset().top;

      if ( s_top > yes & !demo_in_progress ( this, event ))
        { demo_progress_animation ( this, event, demo_start ); }
    });
  });


//----------------------------------------------------------------------------------------------------------------------------------------
// События
//----------------------------------------------------------------------------------------------------------------------------------------





//----------------------------------------------------------------------------------------------------------------------------------------
// Функции
//----------------------------------------------------------------------------------------------------------------------------------------


  // Установить значение прогрессбара
  export function set_progress ( context, event, progress ) {
    if ( $( context ).hasClass( loader_class )) {
      if ( $( context ).find( '.' + loader_progress_class ).length > 0 ) {
        let rotate = ( 360 * progress ) / progress_max;


        // Вспомогательный класс, если прогресс больше 50%
        if ( progress > progress_max / 2 )
          { $( context ).addClass( loader_over50_class ); }
        else
          { $( context ).removeClass( loader_over50_class ); }


        // Вспомогательный класс, если прогресс достиг лимита
        if ( progress < progress_max ) {
          $( context ).removeClass( loader_finish_class );
          $( context ).addClass( loader_inprogress_class );
        }

        else {
          $( context ).addClass( loader_finish_class );
          $( context ).removeClass( loader_inprogress_class );
        }


        $( context ).find( '.' + loader_progress_class ).css({
          transform: 'rotate( ' + rotate + 'deg )'
        });
        $( context ).find( '.' + loader_progress_text_class ).html( progress );
      }
    }
  }


//----------------------------------------------------------------------------------------------------------------------------------------
// Функции
//----------------------------------------------------------------------------------------------------------------------------------------





//----------------------------------------------------------------------------------------------------------------------------------------
// Демо функции
//----------------------------------------------------------------------------------------------------------------------------------------


  // Демонстрация прогресс бара
  function demo_progress_animation ( context, event, progress ) {
    if ( $( context ).hasClass( loader_class )) {
      set_progress ( context, event, progress );

      if ( progress < progress_max ) {
        setTimeout( function ( context, event, progress ) {
          demo_progress_animation ( context, event, progress );
        }, demo_wait_time, context, event, progress + progress_step );
      }
    }
  }


  // Получить статус
  function demo_in_progress ( context, event ) {
    if ( $( context ).hasClass( loader_class )) {
      if ( $( context ).hasClass( loader_inprogress_class ))
        { return true; }
    }


    return false;
  }


//----------------------------------------------------------------------------------------------------------------------------------------
// Демо функции
//----------------------------------------------------------------------------------------------------------------------------------------