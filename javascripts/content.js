var savedInvoices = {}; // Global variable for saved invoices

// Actions displayed here, initialized at the bottom
(function () {

  $.formEvents = function () {
    this.initialize();
  };

  $.formEvents.prototype.initialize = function (htmlData) {
    $("#customer-name").find("input").focus();

    if (!htmlData) {
      this.addContent();
      this.itemPrice();
      this.itemTotal();
      this.addRow();
      this.removeRow();
      this.defaultDate();
      this.saveInvoice();
    } else {
      $("form").html(htmlData);
    };
  };

  // Adds line items to select menu
  $.formEvents.prototype.addContent = function () {
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
  };

  //Set date to today by default
  $.formEvents.prototype.defaultDate = function () {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;

    $("#date").find("input").val(today);
  };

  // Change item price on select event
  $.formEvents.prototype.itemPrice = function () {
    $( ".line-items" ).change( function () {
      var price = "";
      var row = $(this).parent().parent();

      $(row).find( ".line-items" ).val( function() {
        price = $( this ).data( "price" );
      });

      $(row).find(".price").val( (price).toFixed(2) );
    }).change();
  };

  // Change line total on select event, or quantity/price change
  $.formEvents.prototype.itemTotal = function () {
    $( "select, .quantity, .price, .sales-tax" ).change( function () {
      var row = $(this).parent().parent();
      var quant = $(row).find( ".quantity" ).val();
      var price = $(row).find( ".price" ).val();
      var tax = $(".sales-tax").val();
      var lineTotal = $(row).find( ".total" );
      var sum = 0;

      lineTotal.val( "$" + (quant * price).toFixed(2) );
      lineTotal.data("line-total", quant * price);

      $(".total").each( function (idx, total) {
        sum += ($(total).data("line-total"));
      })

      $(".sub-total").val( "$" + (sum).toFixed(2) );
      $(".sum-total").val( "$" + (sum + sum * tax).toFixed(2) );
    }).change();
  };

  // Add new row after row where button is clicked
  $.formEvents.prototype.addRow = function () {
    $(".add-item").on( "click", function (e) {
      e.preventDefault();

      if ($(".input-row").size() >= 20) {
        alert("Spreadsheet cannot contain more than 20 rows!")
        return;
      };

      var row = $(this).parent();
      var newRow = $(row).clone(true);

      $(row).after( newRow );
      $(row).find("select").trigger("change");
    }).bind(this);
  };

  // Remove row when clicked
  $.formEvents.prototype.removeRow = function () {
    $(".remove-item").on( "click", function (e) {
      e.preventDefault();

      if ($(".input-row").size() === 1) {
        alert("Spreadsheet must contain at least one row!");
        return;
      };

      $(this).parent().remove();
      $("select").trigger("change");
    }).bind(this);
  };

  // Save form to local variable and render in DOM when user clicks "Save" button
  $.formEvents.prototype.saveInvoice = function () {
    $("#save-invoice").on("click", function (e) {
      e.preventDefault();

      var form = $("#invoice-form");
      var number = form.find("#invoice-number").find("input").val();
      var name = form.find("#customer-name").find("input").val();

      if (number === "") {
        alert("You need to supply an invoice number!")
        $("#invoice-number").find("input").focus();
      } else if ( number in savedInvoices  ){
        alert("Invoice already exists with this number!")
      } else {
        savedInvoices[number] = form;
        $.formEvents.prototype.addSavedInvoice(number, name)
      }
    });
  };

  // Function to render saved invoices
  $.formEvents.prototype.addSavedInvoice = function (number, name) {
    name = name === "" ? "NO NAME" : name;

    $(".saved-invoices").append(
      $("<tr/>", {
        "class": "saved-invoice",
        html: "<td>Invoice: <a>" + number.toUpperCase() + ", " + name.toUpperCase() + "</a></td>"
      })
      .data("invoice", number)
    );

    // Load invoice data to DOM
    $(".saved-invoice").on("click", function (e) {
      e.preventDefault();

      var number = $(this).data("invoice");
      var newForm = $(savedInvoices[number]).html();

      $("html").off();
      new $.formEvents(newForm);
    });
  };

  // Sets listener functions
  $.fn.formActions = function () {
    new $.formEvents();
  };
})();

// START HERE
// Display invoice form when user clicks 'New' button
$("#create-new, form").on("click", function (e) {
  e.preventDefault();
  $("form").off();
  var originalForm = $("form").html();

  // If first form for session, unhide--else, reset form
  if ($(".input-row").css("display") === "none") {
    $(".total-fields, #save-invoice").css("display", "block");
    $(".input-row").css("display", "flex");
  } else {
    $("form").html(originalForm);
  };

  $("html").formActions(); //Enable jQuery listeners
});
