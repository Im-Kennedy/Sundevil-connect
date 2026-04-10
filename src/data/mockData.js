//make fake data for students and clubs and events
export const users = [//we'll make these users, clubs and events avaiable for other files to use
    {
        userId: "cjkenn13",
        password: "pass123",
        name: "Chris Kennedy",
        email: "cjkenn13@asu.edu",
        role: "student"
    },
    {
        userId: "mei17",
        password: "pass123",
        name: "Mei Kennedy",
        email: "mei17@asu.edu",
        role: "clubleader"
    },
    {
        userId: "rhonnie37",
        password: "pass123",
        name: "Rhonnie G",
        email: "rhonnieg@asu.edu",
        role: "admin"
    },
    {
        userId: "trebor19",
        password: "pass123",
        name: "Trebor Waihee",
        email: "trebor@asu.edu",
        role: "student"
    },
    {
        userId: "tommy88",
        password: "pass123",
        name: "Tommy Smith",
        email: "tommy@asu.edu",
        role: "student"
    }
];

export const clubs = [
    {
        clubId: "1",
        name: "Cooking Club",
        description: "We will teach you how to make quick and delicious meals for yourself or a loved one!",
        category: "social",
        members: 20,
        approvalStatus: "approved",
        leaderId: "mei17"
    },
    {
        clubId: "2",
        name: "Coffee Club",
        description: "Try our coffee club where we coffee taste beans from all around the world!",
        category: "social",
        members: 24,
        approvalStatus: "approved",
        leaderId: "mei17"
    },
    {
        clubId: "3",
        name: "Gaming Club",
        description: "Our gaming club is for anyone that loves to enjoy games on any console or system",
        category: "social",
        members: 78,
        approvalStatus: "approved",
        leaderId: "mei17"
    },
    {
        clubId: "5",
        name: "Coding Club",
        description: "Students who want to learn coding or find a job in coding for when they graduate.",
        category: "career",
        members: 40,
        approvalStatus: "approved",
        leaderId: "mei17"
    },
    {
        clubId: "7",
        name: "Photography Club",
        description: "Capture the world around you. All skill levels welcome!",
        category: "social",
        members: 0,
        approvalStatus: "approved",
        leaderId: ""
    }
];

export const events = [
    {
        eventId: "1",
        clubId: "1",
        title: "Cooking Workshop",
        date: "2026-04-15",
        location: "Main building",
        description: "Learn cooking basics!",
        category: "social",
        cost: 0,
        capacity: 30,
    },
    {
        eventId: "2",
        clubId: "6",
        title: "South Mountain Hike",
        date: "2026-04-19",
        location: "South Mountain Park",
        category: "sports",
        description: "A moderate 5 mile hike at South Mountain. Bring water and sunscreen!",
        cost: 0,
        capacity: 25
    },
    {
        eventId: "3",
        clubId: "5",
        title: "Intro to React Workshop",
        date: "2026-04-20",
        location: "Computer Science building",
        category: "tech",
        description: "Learn the basics of React.js in this hands-on workshop. Laptops required.",
        cost: 0,
        capacity: 40
    },
    {
        eventId: "4",
        clubId: "4",
        title: "Open Mic Night",
        date: "2026-04-22",
        location: "MU Ventana Room",
        category: "music",
        description: "Show off your musical talent or just come enjoy the show! All genres welcome.",
        cost: 0,
        capacity: 100
    },
    {
        eventId: "5",
        clubId: "5",
        title: "Tech Career Fair Prep",
        date: "2026-04-25",
        location: "Computer Science building",
        category: "career",
        description: "Resume reviews, mock interviews, and tips for landing a tech internship.",
        cost: 0,
        capacity: 50
    },
    {
        eventId: "6",
        clubId: "2",
        title: "Coffee Tasting",
        date: "2026-04-28",
        location: "Home Economy Building",
        category: "social",
        description: "Sample coffee beans from different coffeeshops. No experience needed!",
        cost: 5,
        capacity: 20
    },
    {
        eventId: "7",
        clubId: "3",
        title: "Gaming Tournament",
        date: "2026-05-02",
        location: "Student Pavilion",
        category: "social",
        description: "Compete in Smash Bros, Mario Kart, and Rocket League. Prizes for winners!",
        cost: 0,
        capacity: 60
    }
];
//membreship for anyone joining a club

export const memberships = [
    {
        membershipId: "m1",
        userId: "cjkenn13",
        clubId: "5",
        status: "pending",
    },
    {
        membershipId: "m2",
        userId: "tommy88",
        clubId: "3",
        status: "approved"
    },
    {
        membershipId: "m3",
        userId: "trebor19",
        clubId: "5",
        status: "pending"
    },
    {
        membershipId: "m4",
        userId: "cjkenn13",
        clubId: "4",
        status: "pending"
    }
];
//add event registraiton for new students signing up
export const eventRegistrations = [
    {
        registrationId: "r1",
        userId: "cjkenn13",
        eventId: "3",
        dateRegistered: "2026-04-08"
    },
    {
        registrationId: "r2",
        userId: "tommy88",
        eventId: "7",
        dateRegistered: "2026-04-09"
    }
];

//accountments

export const announcements = [
    {
        announcementId: "a1",
        clubId: "5",
        title: "Welcome New Members!",
        content: "We are excited to have new members joining the Coding Club this semester. We all love to code",
        date: "2026-04-05"
    },
    {
        announcementId: "a2",
        clubId: "5",
        title: "React Workshop This Month",
        content: "Join us April 20th for our Intro to React workshop in Computer science building. Sign up on the events page!",
        date: "2026-04-07"
    },
    {
        announcementId: "a3",
        clubId: "4",
        title: "Open Mic Night Signups Open",
        content: "Want to perform at Open Mic Night on April 22nd? Sign up by April 18th to get a slot!",
        date: "2026-04-06"
    }
];
