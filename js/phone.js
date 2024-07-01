const loadPhone = async (searchText = "12") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const divContainer = document.getElementById("div-container");
  divContainer.textContent = "";
  //   console.log(phones);
  //   console.log(phones.length);
  const btnContainer = document.getElementById("btn-container");
  if (phones.length > 12) {
    btnContainer.classList.remove("hidden");
  } else {
    btnContainer.classList.add("hidden");
  }
  // if data nit found
  if (phones.length === 0) {
    const noDataMessage = document.createElement("p");
    noDataMessage.textContent = "No phones found.";
    noDataMessage.classList.add("text-center", "text-gray-500", "my-5");
    divContainer.appendChild(noDataMessage);
  } else {
    phones = phones.slice(0, 12);

    phones.forEach((phone) => {
      // console.log(phone);
      const phoneCard = document.createElement("div");
      phoneCard.classList = `card bg-gray-100 w-96 shadow-xl py-5 my-5`;
      phoneCard.innerHTML = `
              <figure>
                  <img
                  src="${phone.image}"
                  alt="Shoes"
                  />
              </figure>
              <div class="card-body text-center">
                <h2 class="card-title flex justify-center text-black">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                  <button onclick="showDetails('${phone.slug}')" class="btn btn-primary ">Show details</button>
                </div>
              </div>
      `;
      divContainer.appendChild(phoneCard);
    });
  }

  //   display 12 item

  loadingSpinner(false);
};

const handleSearch = () => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText);
};

const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const showDetails = async (id) => {
  //   console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  //   console.log(data, id);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const displayShowDetails = document.getElementById("display-show-details");
  displayShowDetails.innerHTML = `
    <img src="${phone.image}" alt="Shoes"/>            
    <h1 class="text-lg font-bold">${phone.name}</h1>
    <h4><b>Storage</b> : ${phone.mainFeatures.storage}</h4>
    <h4><b>Display Size</b> : ${phone.mainFeatures.displaySize}</h4>
    <h4><b>Chip Set</b> : ${phone.mainFeatures.chipSet}</h4>
    <h4><b>Memory</b> : ${phone.mainFeatures.memory}</h4>
    <h4><b>Slug</b> : ${phone.slug}</h4>
    <h4><b>Release data</b> : ${phone.releaseDate}</h4>
    <h4><b>Brand</b> : ${phone.brand}</h4>
    <h4><b>GPS</b> : ${phone?.others?.GPS || "no GPS available"}</h4>
    `;
  // <h4><b>GPS</b> : ${phone?.others?.GPS ? phone.others?.GPS : "no GPS available now"}</h4>

  show_details_modal.showModal(phone);
};
loadPhone();
