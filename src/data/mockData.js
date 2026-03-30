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
    }
];

export const clubs = [
    {
        clubId: "1",
        name: "Cooking Club",
        description: "We will teach you how to make quick and delicious meals for yourself or a loved one!",
        category: "social",
        members: 20
    },
    {
        clubId: "2",
        name: "Coffee Club",
        description: "Try our coffee club where we coffee taste beans from all around the world!",
        category: "social",
        members: 24
    },
    {
        clubId: "3",
        name: "Gaming Club",
        description: "Our gaming club is for anyone that loves to enjoy games on any console or system",
        category: "social",
        members: 78
    },
    {
        clubId: "5",
        name: "Coding Club",
        description: "Students who want to learn coding or find a job in coding for when they graduate.",
        category: "career",
        members: 40
    }
];

export const events = [
    {
        eventId: "1",
        clubId: "1",
        title: "Cooking Workshop",
        date: "2026-04-15",
        location: "Main building",
        description: "Learn cooking basics!"
    },
    {
        eventId: "2",
        clubId: "2",
        title: "Hiking tour",
        date: "2026-04-10",
        location: "Old Building 2",
        description: "We will hike trails behind Old Building 2"
    }
];