var current_row = 9;
var circle_color = null
var pc_choices = []
var clues = []

const changeColor = (color) => {
  circle_color = color
}

// function that builds a grid in the "container"
function createGrid(x) {
  for (let rows = 0; rows < 10; rows++) {
    for (let columns = 0; columns < 5; columns++) {
      if (columns == 4) {
        $("#container").append("<div class='grid grid_right '><div class='state ref_"+rows+"'></div><div class='state ref_"+rows+"'></div><div class='state ref_"+rows+"'></div><div class='state ref_"+rows+"'></div></div>");
      } else {
        $("#container").append("<div class='grid grid_inner row_" + rows + "' row='" + rows + "'></div>");
      }
    };
  };
  $(".grid").width(255/5);
  $(".grid").height(531/10);
};

// function that clears the grid
function clearGrid(){
  $(".grid").remove();
};



// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
  clearGrid();
  createGrid(6);
  pcMasterMind()
  loadGoal()
};

// create a 16x16 grid when the page loads
// creates a hover effect that changes the color of a square to black when the mouse passes over it, leaving a (pixel) trail through the grid
// allows the click of a button to prompt the user to create a new grid
$(document).ready(function() {
  createGrid(6);
  pcMasterMind()
  loadGoal()
  $(".grid").click(function() {
      if (verifyRow(this)){
        $(this).css("background-color", circle_color);
        let color_list = getColors(this)
        if (verifyColors(color_list)) {
          code_validation(color_list)
          current_row -= 1
          console.log(clues)
          game_validation()
        }
      }
    });

  $(".newGrid").click(function() {
    refreshGrid();

    $(".grid").click(function() {
      if (verifyRow(this)){
        $(this).css("background-color", circle_color);
        let color_list = getColors(this)
        if (verifyColors(color_list)) {
          code_validation(color_list)
          current_row -= 1
          console.log(clues)
          game_validation()
        }
      }
    });
  });
});

/* Verify the current row */
let verifyRow = (element) => {
  let row = parseInt(element.getAttribute("row"))
  if (row === current_row)
    return true
  else
    return false
}

let getColors = () => {
  let colors = document.getElementsByClassName('row_' + current_row)
  let color_list = Array()
  for (let i = 0; i < colors.length; i++){
    color_list.push(colors.item(i).style.backgroundColor)
  }
  return color_list
}

let verifyColors = color_list => {
  for (let i = 0; i < color_list.length; i++)
  {
    if (color_list[i] == ""){
      return false
    }
  }
  return true
}

let pcMasterMind = () => {
  const colors = ["blue", "red", "yellow", "brown", "green", "purple"];
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * colors.length);
    pc_choices.push(colors[random])
  }
}

let loadGoal = () => {
  let cajas = document.getElementsByClassName('caja')
  for (let i = 0; i < cajas.length; i++){
    cajas[i].style.backgroundColor = pc_choices[i]
  }
}

let code_validation = color_list => {
  clues.length = 0
  clues = []
  let bolas = document.getElementsByClassName('ref_' + current_row)
  for (let i = 0; i < color_list.length; i++) {
    if (pc_choices.includes(color_list[i])) {
      if (color_list[i] == pc_choices[i]) {
        clues.push('orange')
        bolas[i].style.backgroundColor = 'orange'
      }
      else {
        clues.push('white')
        bolas[i].style.backgroundColor = 'white'
      }
    }
    else {
      clues.push('')
    }
  }
};


let game_validation = () => {
  for (let i = 0; i <= 3; i++) {
    if (clues[i] != 'orange') {
      return 0
    }
  }
  alert("Ganaste")
  location.reload();
  return 1
}


/* cuenta las veces que se encuentra un color en
 pc_master vs la cantidad de ese mismo color en el input del usario
validar si existe naranja, eliminaria los blancos
 y si no, tome el primer blanco y elimine los demas blancos
 */

/* let clue_validation = (color_list) => {
  count_mastermind = []
  count_user = []
  for (let i = 0; i < color_list.length; i++) {
    if (pc_choices.includes(color_list[i])) {
      count_mastermind[color_list[i]] = pc_choices.filter((v) => (v === color_list[i])).length;
      count_user[color_list[i]] = color_list.filter((v) => (v === color_list[i])).length;
      if (count_user[color_list[i]] > count_mastermind[color_list[i]]){

      }
    }
  }
  console.log('master -> ')
  console.log(count_mastermind)
  console.log('user -> ')
  console.log(count_user)
}
 */
