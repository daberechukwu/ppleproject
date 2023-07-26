function openMapApp() {
    const address = document.getElementById('address').textContent;

    // Check if it's an iOS device (iPhone, iPad, iPod) and open in Apple Maps
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.location.href = `maps://maps.apple.com/?q=${encodeURIComponent(address)}`;
    } else {
        // If not an iOS device, open in Google Maps (fallback to web URL)
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
}

// Attach the openMapApp function to the address element
const addressElement = document.getElementById('address');
addressElement.addEventListener('click', openMapApp);




  // JavaScript code to handle the modal functionality
  document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.querySelector(".modal-overlay");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    function openModal() {
        modalOverlay.style.display = "block";
    }

    function closeModal() {
        modalOverlay.style.display = "none";
    }

    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});

/* for calling the event api*/
async function getEventDetails() {
    try {
      const apiUrl = "https://api.ppleapp.com/api/v1/event/get-event-by-ref?eventRef=" + this.$route.params.eventRef;
      const response = await fetch(apiUrl);

      if (response.ok && response.status === 200) {
        const data = await response.json();
        updateHTMLWithEventData(data);
      } else {
        console.log('Something is wrong: ' + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function updateHTMLWithEventData(data) {
    // Update the elements in the HTML template with the received data
    document.getElementById("result").textContent = JSON.stringify(data, null, 2);
    document.getElementById("eventTitle").textContent = data?.event?.title || 'Event Title Not Available';
    document.getElementById("eventFirstname").textContent = data?.event?.user?.firstname || 'Event firstname Not Available';
    document.getElementById("eventLastname").textContent = data?.event?.user?.lastname || 'Event lastname Not Available';
    document.getElementById("eventUsername").textContent = data?.event?.user?.username  || 'Event username Not Available';
    document.getElementById("eventAvatar").src = data?.event?.user?.avatar || 'Event avatar Not Available';
    document.getElementById("eventDescription").textContent = data?.event?.detail || 'Event Description Not Available';
    document.getElementById("eventImage").src = data?.event?.mediaPosition1 || 'placeholder_image_url.png';
    document.getElementById("eventLocation").textContent = data?.event?.location?.address || 'Event Location Not Available';
    document.getElementById("guestLimit").textContent = data.guestLimit || 'guest limit not available';

    // Update other elements as needed based on the data structure from the API

    // Access and format the startDate
  const startDate = data?.event?.startDate;
  const formattedStartDate = startDate ? new Date(startDate).toLocaleString() : 'Start Date Not Available';
  document.getElementById("startTime").textContent = formattedStartDate;

  }

  // Directly call the getEventDetails() function when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    getEventDetails();
  });


  /*verified badge*/
  const verificationImage = document.getElementById("verificationImage");

  // Set the visibility of the image based on the verification status
  function showImageIfVerified(isVerified) {
    if (isVerified) {
      verificationImage.style.display = "inline"; // Show the image
    } else {
      verificationImage.style.display = "none";   // Hide the image
    }
  }

  
  const isVerified = false; // Replace this with your actual verification status
  showImageIfVerified(isVerified);