// Event data
const events = [
    {
        id: 1,
        title: "Summer Collection Launch",
        description: "Join us for the exclusive launch of our summer collection with live models, music, and special discounts for attendees.",
        date: "2025-08-15",
        time: "6:00 PM - 9:00 PM",
        location: "D Colony Flagship Store, 123 Fashion Ave",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1470&q=80",
        isFeatured: true,
        status: "Upcoming"
    },
    {
        id: 2,
        title: "Fashion Design Workshop",
        description: "Learn the basics of fashion design from our in-house experts. All materials provided. Limited seats available.",
        date: "2025-07-30",
        time: "10:00 AM - 2:00 PM",
        location: "D Colony Creative Studio",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80",
        isFeatured: false,
        status: "Upcoming"
    },
    {
        id: 3,
        title: "Sustainable Fashion Panel",
        description: "Discussion with industry leaders about the future of sustainable fashion and how consumers can make eco-friendly choices.",
        date: "2025-09-10",
        time: "4:00 PM - 6:00 PM",
        location: "City Convention Center",
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1374&q=80",
        isFeatured: true,
        status: "Upcoming"
    },
    {
        id: 4,
        title: "VIP Shopping Night",
        description: "Exclusive shopping event for our VIP members with 30% off entire store, complimentary drinks, and personal stylists.",
        date: "2025-07-10",
        time: "7:00 PM - 10:00 PM",
        location: "D Colony Flagship Store",
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1374&q=80",
        isFeatured: false,
        status: "Past"
    },
    {
        id: 5,
        title: "Fall/Winter Preview",
        description: "First look at our upcoming fall/winter collection before it hits stores. RSVP required.",
        date: "2025-10-12",
        time: "5:30 PM - 8:30 PM",
        location: "D Colony Showroom",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1470&q=80",
        isFeatured: true,
        status: "Upcoming"
    }
];

// Populate marquee with featured and upcoming events
const marquee = document.getElementById('eventMarquee');

const featuredEvents = events.filter(event => event.isFeatured && event.status === "Upcoming");

marquee.innerHTML = featuredEvents.map(event =>
    `<span>${event.title} - ${event.date} at ${event.time}, ${event.location}</span>`
).join(' • ');
