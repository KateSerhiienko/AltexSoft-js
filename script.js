const select = document.querySelector(".select"),
  names_place = document.querySelector(".names_place"),
  alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  options = Array.from(select);
let array = [];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < options.length; i++) {
  array.push(alphabet.splice(getRandomIntInclusive(0, alphabet.length - 1), 1).join());
  options[i].value = options[i].innerHTML = array[i];
  options[0].innerHTML = "Choose letter";
}


// for (let i = 1; i < options.length; i++) {
//   const letter = alphabet.splice(getRandomIntInclusive(0, alphabet.length - 1), 1)[0];
//   options[i].value = options[i].innerHTML = letter;
// }


const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
      
    select.addEventListener('change', () => {
      let selectValue = select.value;
      let names = [];
        
      for (let i = 0; i < data.length; i++) {
        let existName = data[i].name;
          
        if (existName[0] === selectValue) {
          names.push(existName);
        }
      }

      if (names.length === 0) {
          names_place.innerHTML = "No matches";
        }
      else {
          names_place.innerHTML = names.join("<br>");
      }


      // const names = data
      //   .map(el => el.name)
      //   .filter(name => name[0] === select.value);
      //
      // names_place.innerHTML =
      //   names.length === 0 ? "No matches" : names.join("<br>");


    })
  }
};
xmlhttp.open("GET", "list.json", true);
xmlhttp.send();

