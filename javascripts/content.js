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
