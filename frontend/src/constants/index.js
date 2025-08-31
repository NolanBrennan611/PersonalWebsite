const skillCards = [
    {
        name: "React",
        usage: "React in this project",
        experience: "/project",
        logo: "images/react.png",
        backgroundGradient: "linear-gradient(#66DBFB, #D7D2D6)",
        project: "Project 1",
    },
    {
        name: "Python",
        usage: "Python in this project",
        experience: "/project",
        logo: "images/python.png",
        backgroundGradient: "linear-gradient(#346A9A 10%, #F7D449 100%)",
        project: "Project 2",
    },
    {
        name: "C#",
        usage: "C# in this project",
        experience: "/project",
        logo: "images/c.png",
        backgroundGradient: "linear-gradient(#876DE2 10%, #0859A0 100%)",
        project: "Project 3",
    },
    {
        name: "VB .NET",
        usage: "VB .NET in this project",
        experience: "/project",
        logo: "images/vb.png",
        backgroundGradient: "linear-gradient(#004E8C, #12BC95)",
        project: "Project 4",
    },
    {
        name: "Rasa",
        usage: "Rasa in this project",
        experience: "/project",
        logo: "images/rasa.png",
        backgroundGradient: "linear-gradient(#5F1EEF, #F382EB)",
        project: "Project 5",
    },
    {
        name: "Vue.js",
        usage: "Vue.js in this project",
        experience: "/project",
        logo: "images/vue.png",
        backgroundGradient: "linear-gradient(#3A4F63, #47BA87)",
        project: "Project 6",
    },
    {
        name: "SQL",
        usage: "SQL in this project",
        experience: "/project",
        logo: "images/sql.png",
        backgroundGradient: "linear-gradient(#DF6C20, #F9F9F9)",
        project: "Project 7",
    }
//     have character pop out when clicking a link to a ref of another skill incase of skipping
    // have blur effect behind navbar and add links to sections for jumping
    // add business skills somewhere, communication, understanding of software dev practice,
    //potentially add rotation
]

const educationList = [
    {
        id: "first",
        title: "C# Certification Microsoft",
        subtitle: "",
        image: "images/microsoftlogo.svg",
        altTag: "Microsoft Logo",
    },
    {
        id: "second",
        title: "Bachelor of Honours ACS",
        subtitle: "University of Winnipeg",
        image: "images/universitylogo.svg",
        altTag: "University of Winnipeg Logo",
    },
    {
        id: "third",
        title: "Development Black Belts",
        subtitle: "Coding Dojo",
        image: "images/codingdojologo.svg",
        altTag: "Coding Dojo Logo",
    }
]

const projects = [
    {
        name: "Project 1",
        description: "Description for Project 1",
        skills: ["React", "FastAPI"],
        link: "/projects/project1"
    },
    {
        name: "Project 2",
        description: "Description for Project 2",
        skills: ["Python", "Rasa"],
        link: "/projects/project2"
    },
    {
        name: "Project 3",
        description: "Description for Project 3",
        skills: ["C#", ".NET"],
        link: "/projects/project3"
    }   
]

const projectDetails = [
    {
        projectId: "PersonalWebsite",
        projectName: "Personal Website",
        details: "Detailed information about Personal Website"
    },
    {
        projectId: "project2",
        projectName: "Project 2",
        details: "Detailed information about Project 2"
    },
    {
        projectId: "project3",
        projectName: "Project 3",
        details: "Detailed information about Project 3"
    }
]

export { skillCards, educationList, projects, projectDetails };
