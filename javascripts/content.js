// Display invoice form when user clicks 'New' button
$("#create-new").click( function (e) {
  e.preventDefault();

  // Set date to today by default
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

  $('#date').val(today);
  $("form").css("display", "block");
});

// Populate select menu with data from library
data.line_items.forEach( function (item) {
  $(".line-items").append(
    $("<option/>", {
      "class": "line-item",
      "value": item.name,
      html: item.name
    })
    .data("price", item.price)
  );
});

// Change item price on select event
$( "select" ).change( function () {
    var price = "";
    var row = $(this).parent();

    $( "select option:selected" ).val( function() {
      price = $( this ).data( "price" );
    });

    $(row).find(".price").val( (price).toFixed(2) );
}).change();

// Change line total on select event, or quantity/price change
$( "select, .quantity, .price" ).change( function () {
  var row = $(this).parent();
  var quant = $(row).find( ".quantity" ).val();
  var price = $(row).find( ".price" ).val();


  $(row).find( ".total" ).val( "$" + (quant * price).toFixed(2) );
}).change();

// Add new row after row where button is clicked
$(".add-item").on( "click", function (e) {
  e.preventDefault();

  var selected = $(this).parent().find("option:selected").html();
  var row = $(this).parent();
  var newRow = $(row).clone(true, true);

  $(row).after( newRow );
  $(newRow).find("select").val("'" + selected + "'");
});

// Save form to local variable and render in DOM when user clicks "Save" button
var savedInvoices = {};
$("#save-invoice").on("click", function (e) {
  e.preventDefault();

  var form = $(this).parent();
  var number = $(this).parent().find("#invoice-number").val();
  var name = $(this).parent().find("#customer-name").val();

  if (number === "") {
    alert("You need to supply an invoice number!")
  } else if ( number in savedInvoices  ){
    alert("Invoice already exists with this number!")
  } else {
    savedInvoices[number] = form;
    addSavedInvoice(number, name)
  }
});

// Function to render saved invoices
addSavedInvoice = function (number, name) {
  name = name === "" ? "NO NAME" : name;

  $(".saved-invoices").append(
    $("<tr/>", {
      "class": "saved-invoice",
      html: "<td><a>Invoice: " + number + ", " + name + "</a></td>"
    })
    .data("invoice", number)
  );

  // Load invoice data to DOM
  $(".saved-invoice").on("click", function (e) {
    e.preventDefault();

    var number = $(this).data("invoice");
    var form = $("form");
    var newForm = $(savedInvoices[number]);

    console.log(newForm);
  });
};
