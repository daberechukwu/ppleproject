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
    // Helper function to set text content and handle null elements
    function setTextContent(elementId, text) {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = text;
      }
    }
  
    // Helper function to set image source and handle null elements
    function setImageSource(elementId, src) {
      const element = document.getElementById(elementId);
      if (element) {
        element.src = src;
      }
    }
  
    // Update the elements in the HTML template with the received data
    setTextContent("eventTitle", data?.event?.title || 'Event Title Not Available');
    setTextContent("eventFirstname", data?.events?.user?.firstname || 'Event firstname Not Available');
    setTextContent("eventLastname", data?.events?.user?.lastname || 'Event lastname Not Available');
    setTextContent("eventUsername", data?.events?.user?.email || 'Event username Not Available');
    setImageSource("eventAvatar", data?.events?.user?.avatar || 'Event avatar Not Available');
    setTextContent("eventDescription", data?.events?.detail || 'Event Description Not Available');
    setImageSource("eventImage", data?.events?.mediaPosition1 || 'placeholder_image_url.png');
    setTextContent("eventLocation", data?.events?.location?.address || 'Event Location Not Available');
    setTextContent("guestLimit", data?.events?.guestLimit || 'guest limit not available');
  
    // Update other elements as needed based on the data structure from the API
  
    // Access and format the startDate
    const startDate = data?.events.startDate;
    const formattedStartDate = startDate ? new Date(startDate).toLocaleString() : 'Start Date Not Available';
    setTextContent("startTime", formattedStartDate);
  }
  
  
  // Directly call the getEventDetails() function when the page loads
  document.addEventListener("DOMContentLoaded", function() {
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



