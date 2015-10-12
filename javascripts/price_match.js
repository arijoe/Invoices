$( "select" )
  .change( function () {
    var price = "";
    $( "select option:selected" ).val( function() {
      price = $( this ).data( "price" );
    });

    $("#price").val(price);
  })
  .change();
