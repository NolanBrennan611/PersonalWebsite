const skillCards = [
    {
        name: "React",
        usage: "React is my most common framework being utilized in almost all of my experiences. One of my first long term projects was building an *AI Chatbot* with a team of students. I served as the Lead Developer for the course of the project. My main priority was using React to build a reactive, seamless experience for someone needing assistance on a Property Management System. We used React to interface our database, built custom React hooks, interact with company RESTful API, and transfer data between our front and backends. At the moment I have four projects and two years in personal development experience with React.",
        logo: "images/react.png",
        backgroundGradient: "linear-gradient(#66DBFB, #D7D2D6)",
    },
    {
        name: "Python",
        usage: "Python is typically my go to choice for backend frameworks (FastAPI) as it is extremely easy to set up and use HTTP requests to serve certain functions. Whether that be an endpoint for my messages to go through, interacting with a database, or some form of sanitization. When I am not utilizing it for a backend, I will be using libraries to study machine learning concepts and create neural networks and classifier trees. Python has been a great tool for visualizing data into graphs or other visuals.",
        logo: "images/python.png",
        backgroundGradient: "linear-gradient(#346A9A 10%, #F7D449 100%)",
    },
    {
        name: "C#",
        usage: "C# is another choice for a backend framework to be used with .NET or inside Blazor. I have taken Microsoft certifications for C# and Blazor respectively. C# was used in one of my previous work experiences and a lot of my university courses. I have made controllers with integrated IAM roles and maintaining separation of user layers. I have also used C# within Unity to build 2D and 3D games alike. This involves a 2D side scroller with an inventory system and pickup-able items, as well as video game classics like alien invaders and pong. My 3D project was a first person shooter with complex puzzles that used the physics behind the bullets as the key to the user’s escape!",
        logo: "images/c.png",
        backgroundGradient: "linear-gradient(#876DE2 10%, #0859A0 100%)",
    },
    {
        name: "VB .NET",
        usage: ".NET was used along with C# at my previous work experience. I used .NET along with jQuery to get information and service the data into a Treasury application. This mainly composed of creating new inputs or displays for freshly created database fields. While I do not have any long term projects with .NET, I have a Microsoft certification through Coursera. I hope to use Blazor for a future work.",
        logo: "images/vb.png",
        backgroundGradient: "linear-gradient(#004E8C, #12BC95)",
    },
    {
        name: "Rasa",
        usage: "Rasa is a yaml based AI framework. This allows me to implement hard coded business logic into our chatbot model, train it on their infrastructure, and download the model locally. This is the framework we went for with the Chatbot because it was free, locally hosted, and worked out of the box. We really pushed this tool to its limits, creating custom workflows and actually brute force fixing a bug on Rasa’s end to maintain our goal of 95% accuracy. The version of Rasa we used had an issue where the bot could not register and respond accordingly to user chitchat, throwing an error at the users face. We found a work around to ensure a seamless experience for our users.",
        logo: "images/rasa.png",
        backgroundGradient: "linear-gradient(#5F1EEF, #F382EB)",
    },
    {
        name: "Vue.js",
        usage: "Vue was my first frontend experience in a formal work setting. I built an interface for uploading credit application forms and other documents where it was laid out in a table. This table was a prebuilt component from an in-house library that communicated to our database to pull user records. Vue introduced me to reactive UI components and creating complicated state management systems. When building this UI, we wanted to have each table item have a drop down list with more information about the upload. As the table was a prebuilt component, my team struggled to find an implementation that could replicate our Figma design. After many attempts, I finally had found a safe way to inject the information, saving our team from having to do a redesign!",
        logo: "images/vue.png",
        backgroundGradient: "linear-gradient(#3A4F63, #47BA87)",
    },
    {
        name: "SQL",
        usage: "SQL has been used in every single project and work experience I have ever worked on. In the beginning I couldn’t quite grasp some of the concepts and inner workings of SQL. With more and more use, primarily practicing writing queries in my web applications to interface user data, I became quite comfortable with the language. Now, I understand how to conceptualize and implement SQL databases from scratch in whatever form necessary. In the *Chatbot* project, I implemented a 4NF database to store user sessions for them to be pulled back into context on refresh. In my formal experiences, I have used SQL within jQuery and Python scripts to pull from our PostgresSQL databases.",
        logo: "images/sql.png",
        backgroundGradient: "linear-gradient(#DF6C20, #F9F9F9)",
    }
//     have character pop out when clicking a link to a ref of another skill in case of skipping
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
    [{
        name: "Personal Website",
        skillImages: ["images/vite.png", "images/python.png", "images/gsap.png"],
        link: "/projects/PersonalWebsite"
    },
    {
        name: "Spylt Website Recreation",
        skillImages: ["images/react.png", "images/python.png", "images/gsap.png"],
        link: "/projects/SpyltWebsiteRemake"
    },
    {
        name: "Cocktail Website",
        skillImages: ["images/react.png", "images/python.png", "images/gsap.png"],
        link: "/projects/CocktailWebsite"
    },
    {
        name: "Voronoi Stippling",
        skillImages: ["images/javascript.png"],
        link: "/projects/VoronoiStippling"
    },
    {
        name: "Glide POS",
        skillImages: ["images/construction.png"],
    }],
    [{
        name: "Home Inspection Website",
        skillImages: ["images/react.png", "images/python.png"],
        link: "/projects/HomeInspectionWebsite"
    },
    {
        name: "Invoice Digitizing Tool",
        skillImages: ["images/react.png"],
        link: "/projects/InvoiceDigitizingTool"
    }],
    [{
        name: "Identifying Note Practice",
        skillImages: ["images/construction.png"],
    }]
]

const projectDetails = [
    {
        projectId: "PersonalWebsite",
        projectName: "Personal Website",
        details: "Detailed information about Personal Website",
        link: "https://nolanbrennan.dev",
        src: "/videos/f1.mp4"
    },
    {
        projectId: "SpyltWebsiteRemake",
        projectName: "Spylt Website Remake",
        details: "Detailed information about Personal Website",
        link: "https://github.com/NolanBrennan611/SpyltRemake",
        src: "/videos/f1.mp4"
    },
    {
        projectId: "CocktailWebsite",
        projectName: "Cocktail Website",
        details: "Detailed information about Personal Website",
        link: "https://github.com/NolanBrennan611/CocktailWebsite",
        src: "/videos/f1.mp4"
    },
    {
        projectId: "VoronoiStippling",
        projectName: "Voronoi Stippling",
        details: "Detailed information about Project 2",
        link: "https://codepen.io/NolanBrennan611/full/JoPoWwN",
        src: "/videos/f1.mp4"
    },
    {
        projectId: "HomeInspectionWebsite",
        projectName: "Home Inspection Website",
        details: "Detailed information about Project 3",
        link: "https://github.com/NolanBrennan611/HomeInspectionWebsite",
        src: "/videos/f1.mp4"
    },
    {
        projectId: "InvoiceDigitizingTool",
        projectName: "Invoice Digitizing Tool",
        details: "Detailed information about Project 3",
        src: "/videos/f1.mp4"
    }
]

export { skillCards, educationList, projects, projectDetails };
