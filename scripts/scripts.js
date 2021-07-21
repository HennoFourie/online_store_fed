//Get the button
var toTopButton = document.getElementById("topButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Initialize and add the map
function initMap() {
  // The location of Cape Town
  const capetown = { lat: -33.9036, lng: 18.4205 };
  // The map, centered at Cape Town
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: capetown,
  });
  // The marker, positioned at Cape Town
  const marker = new google.maps.Marker({
    position: capetown,
    map: map,
  });
}