$("#create-new").click( function (e) {
  e.preventDefault();
  
});

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

$( "select" ).change( function () {
    var price = "";
    var row = $(this).parent();

    $( "select option:selected" ).val( function() {
      price = $( this ).data( "price" );
    });

    $(row).find(".price").val( (price).toFixed(2) );
}).change();

$( "select, .quantity, .price" ).change( function () {
  var row = $(this).parent();
  var quant = $(row).find( ".quantity" ).val();
  var price = $(row).find( ".price" ).val();


  $(row).find( ".total" ).val( "$" + (quant * price).toFixed(2) );
}).change();

$(".add-item").on( "click", function(e) {
  e.preventDefault();

  var selected = $(this).parent().find("option:selected").html();
  var row = $(this).parent();
  var newRow = $(row).clone(true, true);

  $(row).after( newRow );
  $(newRow).find("select").val("'" + selected + "'");
});
