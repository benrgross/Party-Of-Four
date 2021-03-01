// Get references for the search
var $autocomplete = $("#autocomplete");

var IS = {
  getIngredients: function(request, response) {
    return $.ajax({
      url: "/api/ingredientsList",
      method: "POST",
      data: { term: request.term },
      dataType: "jsonp",
      success: function(data) {
        response(data);
      }
    });
  },
  getMeasures: function(food_name) {
    return $.ajax({
      url: "/api/measures",
      method: "POST",
      data: { food_name: food_name },
      dataType: "jsonp"
    });
  },
  addIngredient: function(ingredient_name, ingredient_img) {
    return $.ajax({
      url: "/api/ingredient",
      method: "POST",
      data: { ingredientName: ingredient_name, ingredientImg: ingredient_img },
      dataType: "json"
    });
  },
  addRecipe: function(newRecipe) {
    return $.ajax({
      url: "/api/recipes",
      method: "POST",
      data: newRecipe,
      dataType: "json"
    });
  },
  addRecipeIngredients: function(ingredients) {
    $.ajax({
      url: "/api/recipe_ingredients",
      method: "POST",
      data: { ingredients: JSON.stringify(ingredients) },
      dataType: "json"
    }).then(function() {
      location.reload();
    });
  }
};

$(document).ready(function() {
  //Autocomplete
  $autocomplete
    .autocomplete({
      source: function(request, response) {
        IS.getIngredients(request, response);
      },
      minLength: 2,
      select: function(event, ui) {
        $(this).val(ui.item.food_name);
        renderIngredient(ui);
        return false;
      },
      close: function() {
        $(this).val("");
      }
    })
    .data("ui-autocomplete")._renderItem = function(ul, item) {
    return $("<li></li>")
      .data("item.autocomplete", item)
      .append("<img src='" + item.photo + "' style='width:80px;height:70px'/>")
      .append("<span>" + item.food_name + "</span>")
      .appendTo(ul);
  };

  //Remove ingredients
  $(document).on("click", ".fa-trash-alt", function() {
    $(this)
      .parent()
      .parent()
      .empty();
  });
});

function renderIngredient(ui) {
  IS.addIngredient(ui.item.food_name, ui.item.photo).then(function(
    addedIngredient
  ) {
    IS.getMeasures(ui.item.food_name).then(function(data) {
      var tr = $("<tr>").addClass("d-flex");

      var td_image = $("<td>").addClass("col-2");
      td_image.append(
        $("<img>")
          .addClass("img-fluid rounded")
          .attr("src", addedIngredient.ingredientImg)
          .attr("alt", "(:)")
      );

      var td_ingredient = $("<td>")
        .addClass("col-4 ingredient_name")
        .attr("data-ingredient", addedIngredient.ingredientId)
        .text(addedIngredient.ingredientName);

      var td_quantity = $("<td>").addClass("col-2");
      td_quantity.append(
        $("<input required>")
          .addClass("form-control ingredient_quantity")
          .attr("type", "number")
          .attr("id", "quantity1")
          .attr("placeholder", "0")
      );

      var td_meas = $("<td>").addClass("col-3");
      var select = $("<select>")
        .addClass("custom-select d-block")
        .attr("id", "measure1");

      /* Add avaliable meas. per ingredient*/
      //select.append($("<option required>").val(data[0].measureId).text(data[0].measureName));

      for (let index = 0; index < data.length; index++) {
        select.append(
          $("<option>")
            .val(data[index].measureId)
            .text(data[index].measureName)
        );
      }

      td_meas.append(select);

      var td_removes = $("<td>").addClass("col-1");
      td_removes.append($("<i>").addClass("fas fa-trash-alt btn align-middle"));

      tr.append(td_image);
      tr.append(td_ingredient);
      tr.append(td_quantity);
      tr.append(td_meas);
      tr.append(td_removes);

      $("#list_ingredients").append(tr);
    });
  });
}

$("#submit").on("click", function() {
  event.preventDefault();
  if (checkValidity()) {
    var newRecipe = {
      recipeName: $("#name").val(),
      recipeDescription: $("#recipe-description").val()
    };

    //Send the POST request.
    IS.addRecipe(newRecipe).then(function(data) {
      var ingredients = [];

      $(document)
        .find("tr")
        .each(function() {
          ingredients.push({
            quantity: $(this)
              .find(".ingredient_quantity")
              .val(),
            ingredientsIngredientId: $(this)
              .find(".ingredient_name")
              .attr("data-ingredient"),
            measureMeasureId: $(this)
              .find("select :selected")
              .val(),
            recipesRecipeId: data.recipeId
          });
        });

      IS.addRecipeIngredients(ingredients);
    });
  }
});

function checkValidity() {
  if ($("#name").val()) {
    if ($("#name").hasClass("is-invalid")) {
      $("#name").removeClass("is-invalid");
    }
    if ($(document).find(".ingredient_quantity").length > 0) {
      var invalidElements = 0;
      var quantities = $(document)
        .find(".ingredient_quantity")
        .toArray();
      quantities.forEach(element => {
        if (parseInt($(element).val()) > 0) {
          if ($(element).hasClass("is-invalid")) {
            $(element).removeClass("is-invalid");
          }
        } else {
          $(element).addClass("is-invalid");
          invalidElements++;
        }
      });
      return invalidElements === 0;
    } else {
      $("#myModal").modal("show");
    }
  } else {
    $("#name").addClass("is-invalid");
  }
  return false;
}
