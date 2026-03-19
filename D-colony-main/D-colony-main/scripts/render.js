function renderStars(rating) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) stars.push('<i class="fa fa-star"></i>');
  if (half) stars.push('<i class="fa fa-star-half-o"></i>');
  while (stars.length < 5) stars.push('<i class="fa fa-star-o"></i>');

  return stars.join('');
}

function createProductCard(product) {
   const priceValue = parseFloat(product.price.replace('$', '')) || 0;
  return `
    <div class="pro" onclick="window.location.href='pages/products-details.html?id=${product.id}'">
      <img src="${product.imageUrl}" alt="${product.name || 'Product Image'}">
      <div class="des">
        <span>${product.brand || "D|Colony"}</span>
        <h5>${product.name || 'Unnamed Product'}</h5>
        <div class="star">
           ${renderStars(product.ratings || 0)}
        </div>
        <h4>$${priceValue.toFixed(2)}</h4>
      </div>
      <a href="pages/products-details.html?id=${product.id}"><i class="fas fa-shopping-cart cart"></i></a>
    </div>
  `;
}



fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    const featuredRow = document.getElementById('featured-products-row');
    const latestRow1 = document.getElementById('latest-products-row-1');
    const latestRow2 = document.getElementById('latest-products-row-2');

    const featured = data.filter(p => p.category === 'featured').slice(0, 3);
    const latest = data.filter(p => p.category === 'latest').slice(0, 6);

    featured.forEach(product => {
      featuredRow.innerHTML += createProductCard(product);
    });

    latest.slice(0, 3).forEach(product => {
      latestRow1.innerHTML += createProductCard(product);
    });

    latest.slice(3, 6).forEach(product => {
      latestRow2.innerHTML += createProductCard(product);
    });
  })
  .catch(err => console.error('Error loading products:', err));


const trustees = [
    {
      photo: "images/leon.jpeg",
      name: "Leon Obaniyan",
      position: "Treasurer",
      expertise: "Financial Strategist"
    },
    {
      photo: "images/wal.jpeg",
      name: "Mustapha Wale",
      position: "Chairperson",
      expertise: "Technology Innovation"
    },
    {
      photo: "images/osaze.jpeg",
      name: "Osazenovban okundaye",
      position: "Vice Chair",
      expertise: "Fashion Industry Leader"
    },
    {
      photo: "images/Aize.jpeg",
      name: "Aizenosa okundaye",
      position: "Secretary",
      expertise: "Sustainable Fashion Advocate"
    },
    {
      photo: "images/sherifat.jpeg",
      name: "Enigbokan Faheezah",
      position: "Trustee",
      expertise: "Brand Development"
    },
  
    {
      photo: "images/gilbert.jpeg",
      name: "Brisk Brino Gilbert",
      position: "Trustee",
      expertise: "Global Supply Chain"
    },
    {
      photo: "images/oma.jpeg",
      name: "Sule Omachi",
      position: "Trustee",
      expertise: "Financial Strategist"
    },
    {
      photo: "images/delight.jpeg",
      name: "John Delight ",
      position: "Trustee",
      expertise: "Asst Financial Strategist"
    },


];

function renderTrustees() {
    const container = document.getElementById('trustees-container');
    container.innerHTML = ''; // Clear existing content
    
    trustees.forEach(trustee => {
        const trusteeCard = document.createElement('div');
        trusteeCard.className = 'trustee-card';
        trusteeCard.innerHTML = `
            <img src="${trustee.photo}" alt="${trustee.name}">
            <h3>${trustee.name}</h3>
            <p class="position">${trustee.position}</p>
            <p class="expertise">${trustee.expertise}</p>
        `;
        container.appendChild(trusteeCard);
    });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', renderTrustees);



document.addEventListener('DOMContentLoaded', function() {
  // Event data
  const events = [
    {
        id: 1,
        title: "Summer Collection Launch",
        description: "Join us for the exclusive launch of our summer collection with live models, music, and special discounts for attendees.",
        date: "June 15, 2023",
        time: "6:00 PM - 9:00 PM",
        location: "D Colony Flagship Store, 123 Fashion Ave",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 2,
        title: "Fashion Design Workshop",
        description: "Learn the basics of fashion design from our in-house experts. All materials provided. Limited seats available.",
        date: "July 8, 2023",
        time: "10:00 AM - 2:00 PM",
        location: "D Colony Creative Studio",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    },
    {
        id: 3,
        title: "Sustainable Fashion Panel",
        description: "Discussion with industry leaders about the future of sustainable fashion and how consumers can make eco-friendly choices.",
        date: "August 22, 2023",
        time: "4:00 PM - 6:00 PM",
        location: "City Convention Center",
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
        id: 4,
        title: "VIP Shopping Night",
        description: "Exclusive shopping event for our VIP members with 30% off entire store, complimentary drinks, and personal stylists.",
        date: "September 5, 2023",
        time: "7:00 PM - 10:00 PM",
        location: "D Colony Flagship Store",
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
        id: 5,
        title: "Fall/Winter Preview",
        description: "First look at our upcoming fall/winter collection before it hits stores. RSVP required.",
        date: "October 12, 2023",
        time: "5:30 PM - 8:30 PM",
        location: "D Colony Showroom",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
];

  // Function to render events
  function renderEvents() {
    const eventContainer = document.getElementById('event');
    
    events.forEach((event, index) => {
      const eventBox = document.createElement('div');
      eventBox.className = 'event-box';
      
      eventBox.innerHTML = `
        <div class="event-img">
            <img src="${event.image}" alt="${event.title}">
        </div>
        <div class="event-details">
            <h4>${event.title}</h4>
            <p>${event.description}</p>
            <p class="event-date">Date: ${event.date} | ${event.time}</p>
            <p class="event-location">Location: ${event.location}</p>
            <button class="register-btn" onclick="registerForEvent(${event.id})">Register Now</button>
        </div>
        <h1>${String(index + 1).padStart(2, '0')}</h1>
      `;
      
      eventContainer.appendChild(eventBox);
    });
  }

  // Register for event function
  window.registerForEvent = function(eventId) {
      const event = events.find(e => e.id === eventId);
      if (event) {
          alert(`You've registered for: ${event.title}\nDate: ${event.date}\nLocation: ${event.location}`);
          // In a real application, you would send this to your backend
      }
  };

  renderEvents();
});