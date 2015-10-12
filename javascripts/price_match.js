$( "select" )
  .change( function () {
    var price = "";
    $( "select option:selected" ).val( function() {
      price = $( this ).data( "price" );
    }
  );

    $("#price").val(price);
  })
  .change();

  $( "#quantity" ).change( function () {
      var quant = $( "#quantity" ).val();
      var price = $( "#price" ).val();
      $( "#total" ).val( "$" + (quant * price).toFixed(2) );
    }
  )
  .change();
