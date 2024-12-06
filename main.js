// находим элементы
const form = document.querySelector("#addForm");
const newItemInput = document.querySelector("#newItemText");
const itemsList = document.getElementById("items");
const filter = document.querySelector("#filter");
const title = document.querySelector(".title");

// 1.Добавление новой задачи;

form.addEventListener("submit", addItem);

//2.Удаление элемента

itemsList.addEventListener("click", removeItem);

//3.Фильтрация

filter.addEventListener("keyup", filterItems);

// Функции

// 1. Добавление новой задачи
function addItem(event) {
  event.preventDefault();
  let newItemText = newItemInput.value.trim();

  // Проверка на пустую строку ПЕРЕД созданием элемента
  if (newItemText === "") {
    return; // Ничего не делаем, если строка пуста
  }

  // Создаем элемент задачи с текстом в одной строке
  let newElement = document.createElement("li");
  newElement.className = "list-group-item";
  newElement.innerHTML = `<span>${newItemText}</span>`;

  let buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Удалить";
  buttonDelete.className = "btn btn-light btn-sm float-right";
  // Добавляем атрибут данных
  buttonDelete.dataset.action = "delete";
  newElement.appendChild(buttonDelete);

  itemsList.prepend(newElement);
  newItemInput.value = "";
}

// 2.Удаление элемента
function removeItem(event) {
  console.log(event.target);
  if (
    event.target.hasAttribute("data-action") &&
    event.target.dataset.action === "delete"
  ) {
    if (confirm("Удалить задачу?")) {
      // если да, то удаляем элемент
      const listItem = event.target.parentElement; // Родительский элемент - это <li>
      listItem.remove();
    }
  }
}

//3.Фильтрация
function filterItems(event) {
  //получаем фразу для поиска и переводим ее в нижний регистр
  let searchedText = event.target.value.toLowerCase();

  // 1. Получаем список всех задач

  let items = itemsList.querySelectorAll("li");
  // Флаг, указывающий, найдены ли элементы.  Изначально считаем, что ничего не найдено.
  let found = false;
  // 2. Перебираем циклом все найденные теги li с задачами
  items.forEach((item) => {
    let itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(searchedText) != -1) {
      item.style.display = "block";
      found = true; // Устанавливаем found в true, если элемент найден
    } else {
      item.style.display = "none";
    }
  });
  title.textContent = found ? "Список дел" : "Ничего не найдено";
}
