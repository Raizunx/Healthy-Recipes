document
  .getElementById("insertForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mealName = document.getElementById("mealName").value;
    let Ingredient = document.getElementById("Ingredient").value;
    let Instruction = document.getElementById("Instruction").value;
    let recipeID = Date.now() + email;

    fetch("/recipeInsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        mealName: mealName,
        Ingredient: Ingredient,
        Instruction: Instruction,
        recipeID: recipeID,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Your recipe has been added");
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("mealName").value = "";
          document.getElementById("Ingredient").value = "";
          document.getElementById("Instruction").value = "";
          getData();
        } else {
          alert("Failed to add recipe please try again!");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        alert("An error occurred at recipes.js!");
      });
  });

function getData() {
  //clear any existing data
  //Create The Final Container
  let caontainer = document.getElementById("container");
  caontainer.classList.add("allRecipeRectangle");

  while (caontainer.firstChild) {
    caontainer.removeChild(caontainer.lastChild);
  }
  //refresh
  fetch("/view")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(function (item) {
        //Create Articles
        let recipeRectangleClass = document.createElement("article");
        recipeRectangleClass.classList.add("recipeRectangle");

        let recipeContent = document.createElement("article");
        recipeContent.classList.add("recipeRectangleContent");

        let frontSideClass = document.createElement("article");
        frontSideClass.classList.add("frontSideRectangle");

        let recipeImageClass = document.createElement("article");
        recipeImageClass.classList.add("recipeImage");

        let recipeNameClass = document.createElement("article");
        recipeNameClass.classList.add("recipeName");

        let backSideClass = document.createElement("article");
        backSideClass.classList.add("backSideRectangle");

        //Create Elements
        let mealNameText1 = document.createElement("p");
        mealNameText1.classList.add("p");

        let mealNameText2 = document.createElement("h1");
        mealNameText2.classList.add("recipeName");

        let IngredientText = document.createElement("p");
        IngredientText.classList.add("Ingredients");

        let InstructText = document.createElement("p");
        InstructText.classList.add("Instructions");

        let image = document.createElement("img");
        image.src = "../Media/food.jpg";
        image.classList.add("recipeImage");

        let span1 = document.createElement("span");
        span1.classList.add("recipeSubTitle");

        let span2 = document.createElement("span");
        span2.classList.add("recipeSubTitle");

        let spanText1 = document.createTextNode("Ingredients");
        let spanText2 = document.createTextNode("Instructions");

        //Get the data from JSON
        mealNameText1.textContent = item.mealName;
        mealNameText2.textContent = item.mealName;
        IngredientText.textContent = item.Ingredient;
        InstructText.textContent = item.Instruction;

        //Append to the HTML
        span1.appendChild(spanText1);
        span2.appendChild(spanText2);

        backSideClass.appendChild(mealNameText2);
        backSideClass.appendChild(span1);
        backSideClass.appendChild(IngredientText);
        backSideClass.appendChild(span2);
        backSideClass.appendChild(InstructText);

        recipeNameClass.appendChild(mealNameText1);

        recipeImageClass.appendChild(image);

        frontSideClass.appendChild(recipeImageClass);
        frontSideClass.appendChild(recipeNameClass);

        recipeContent.appendChild(frontSideClass);
        recipeContent.appendChild(backSideClass);

        recipeRectangleClass.appendChild(recipeContent);

        caontainer.appendChild(recipeRectangleClass);
      });
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred while displaying the recipes!");
    });
}
//calling function
getData();
