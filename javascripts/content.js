console.log( data.line_items );

data.line_items.forEach( function (item) {
  $(".line-items").append(
    $("<option/>", {
      "value": item.name,
      html: item.name
    })
  );
});
