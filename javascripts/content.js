data.line_items.forEach( function (item) {
  $(".line-items").append(
    $("<option/>", {
      "class": "line_item",
      "value": item.name,
      html: item.name
    })
    .data("price", item.price)
  );
});

$( "select" )
  .change( function () {
    var price = "";
    $( "select option:selected" ).val( function() {
      price = $( this ).data( "price" );
    }
  );

    $("#price").val( (price).toFixed(2) );
  })
  .change();

  $( "select, #quantity, #price" ).change( function () {
      var quant = $( "#quantity" ).val();
      var price = $( "#price" ).val();
      $( "#total" ).val( "$" + (quant * price).toFixed(2) );
    }
  )
  .change();

$( "#add-item").click(function() {
  $(this).parent().after( $( ".input-row" ).clone() );
});
