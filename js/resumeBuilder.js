/*
	Biographical information entered in JSON format.
*/
var bio = {
	"name": "Glenn Hepler",
	"role": "Web&nbsp;Developer",
	"contacts": {"mobile": "(336) 259-4775", "email": "gbhepler@zoho.com", "github": "blueaudi", "location": "High Point, NC"},
	"photo": "images/gbh.jpg",
	"welcomeMessage": "&ldquo;I seek challenging employment with a progressive company that fosters and rewards creativity and innovation.&nbsp; Areas of particular interest include front-end Web development, Web application development, software development, penetration testing, computer forensics, Help Desk&nbsp;/ troubleshooting&nbsp;/ software support, and computer security.&rdquo;",
	"skills": ["HTML/CSS", "JavaScript/jQuery", "Java", "C/C+", "Python", "Digital Forensics"]
};
/*
	bio.display() method - used to add biographical information to webpage
*/
bio.display = function() {
	var formattedName = HTMLheaderName.replace("%data%", bio.name);
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	$("#header").prepend(formattedRole);
	$("#header").prepend(formattedName);
	var formattedContact;
	for (contact in bio.contacts) {
		if (contact === "email") {
			formattedContact = HTMLemail.replace(/%data%/g, bio["contacts"][contact]);
		} else {
			formattedContact = HTMLcontactGeneric.replace("%contact%", contact)
			formattedContact = formattedContact.replace("%data%", bio["contacts"][contact]);
		}
		$("#topContacts").append(formattedContact);
		$("#footerContacts").append(formattedContact);
	}
	var formattedBioPic = HTMLbioPic.replace("%data%", bio.photo);
	$("#header").append(formattedBioPic);
	var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
	$("#header").append(formattedWelcomeMsg);
	if (bio.skills.length != 0) {
		$("#header").append(HTMLskillsStart);
		var formattedSkill;
		for (skill in bio.skills) {
			formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
			$("#skills").append(formattedSkill);
		}
	}
};

/*
	Employment information entered in JSON format
*/
var work = {
	"jobs": [
		{
			"employer": "Dixon Hughes Goodman PLLC",
			"location": "High Point, NC",
			"title": "Digital Forensic Examiner (Senior Associate)",
			"dates": "May 2005 - March 2009",
			"description": "Performed digital forensic services for clients of a large, regional accounting and consulting firm",
			"duties": [
				"Responsible for the imaging of digital media, including computer hard drives, flash memory devices, CDs&nbsp;/ DVDs, cell phones, digital voice recorders, etc. in accordance with established forensic procedures.",
				"Most examinations focused on theft of intellectual property, but others involved divorce settlements, financial fraud, email recovery, Internet history reconstruction, and RAID reconstruction.",
				"Interacted with attorneys and other legal professionals to present forensic findings.&nbsp; Prepared legal documents, including affidavits, for filing with courts of law.",
				"Experienced with EnCase, Forensic Toolkit (FTK), and numerous other forensic software tools.",
				"Maintained a forensic laboratory with six computers, including the performance of software updates and repairs&nbsp;/ hardware upgrades."
			]
		},
		{
			"employer": "Dixon Hughes Goodman PLLC",
			"location": "High Point, NC",
			"title": "Accounting Proofreader",
			"dates": "February 1987 - April 2005",
			"description": "Performed technical review of tax returns, financial statements, and other accounting documents",
			"duties": [
				"Responsible for reviewing financial statements, tax returns, and other accounting documents&nbsp;/ reports&nbsp;/ governmental filings for numerical accuracy and technical consistency, as well as grammar and formatting.&nbsp; The documents reviewed ranged in size from compiled financial statements of fewer than 10 pages to audits of governmental entities and SEC filings exceeding 200 pages in length.",
				"Developed complex macros for use with Microsoft Word and Excel to allow rapid formatting of financial statements and other accounting documents.",
				"Authored a detailed manual to accompany the Microsoft Word macros and provided one-on-one and group training to employees.",
				"Provided administrative support to a partner specializing in the banking industry."
			]
		}
	]		
};
/*
	work.displayHistory() method - used to add employment information to webpage
*/
work.displayHistory = function() {
	var formattedWorkEmployer, formattedWorkLocation, formattedWorkTitle;
	var formattedEmployerLocation, formattedWorkDates, formattedWorkDescription;
	var formattedWorkDuties;
	for (job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);
		formattedWorkEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		formattedWorkLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
		formattedEmployerLocation = formattedWorkEmployer + formattedWorkLocation;
		formattedWorkTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		formattedWorkDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		formattedWorkDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
		$(".work-entry:last").append(formattedEmployerLocation);
		$(".work-entry:last").append(formattedWorkTitle);
		$(".work-entry:last").append(formattedWorkDates);
		$(".work-entry:last").append(formattedWorkDescription);
		if (work.jobs[job].duties.length > 0) {
			$(".work-entry:last").append(HTMLworkDutiesStart);
			for (duty in work.jobs[job].duties) {
				formattedWorkDuties = HTMLworkDuties.replace("%data%", work.jobs[job].duties[duty]);
				$(".duties-entry:last").append(formattedWorkDuties);
			}
		}
	}
};

/*
	Education information entered in JSON format
*/
var education = {
	"schools": [
		{
			"name": "High Point University",
			"location": "High Point, NC",
			"GPA": "3.90/4.00",
			"degree": "Bachelor of Arts (summa cum laude)",
			"graduationDate": "August 2005",
			"major": "Computer Science",
			"honors": ""
		},
		{
			"name": "North Carolina State University",
			"location": "Raleigh, NC",
			"GPA": "3.882/4.000",
			"degree": "Completed 132 semester hours",
			"graduationDate": "",
			"major": "Chemical Engineering",
			"honors": "Inducted into The Honor Society of Phi Kappa Phi"
		}
	],
	"onlineCourses": [
		{
			"title": "Front-End Web Developer Nanodegree",
			"school": "Udacity",
			"dates": "In progress",
			"url": "https://www.udacity.com/course/nd001"
		},
		{
			"title": "Intro to HTML and CSS",
			"school": "Udacity",
			"dates": "January 2015",
			"url": "https://www.udacity.com/course/ud304"
		},
		{
			"title": "Intro to jQuery",
			"school": "Udacity",
			"dates": "January 2015",
			"url": "https://www.udacity.com/course/ud245"
		},
		{
			"title": "JavaScript Basics",
			"school": "Udacity",
			"dates": "April 2015",
			"url": "https://www.udacity.com/course/ud804"
		}
	]
};
/*
	education.displayHistory() method - used to add education history to webpage
*/
education.displayHistory = function() {
	var formattedSchoolName, formattedNameLocation, formattedSchoolDegree,  formattedNameGPA;
	var formattedSchoolLocation, formattedSchoolMajor, formattedSchoolDates, formattedSchoolHonors;
	for (school in education.schools) {
		$("#education").append(HTMLschoolStart);
		formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
		formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
		formattedNameLocation = formattedSchoolName + formattedSchoolLocation;
		$(".education-entry:last").append(formattedNameLocation);
		formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
		$(".education-entry:last").append(formattedSchoolDegree);
		if (education.schools[school].graduationDate != "") {
			formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].graduationDate);
			$(".education-entry:last").append(formattedSchoolDates);
		}
		formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
		$(".education-entry:last").append(formattedSchoolMajor);
		if (education.schools[school].honors != "") {
			formattedSchoolHonors = HTMLschoolHonors.replace("%data%", education.schools[school].honors);
			$(".education-entry:last").append(formattedSchoolHonors);
		}
		formattedSchoolGPA = HTMLschoolGPA.replace("%data%", education.schools[school].GPA);
		$(".education-entry:last").append(formattedSchoolGPA);
	}
	var formattedOnlineTitle, formattedOnlineSchool, formattedOnlineSchoolTitle, formattedOnlineDates, formattedOnlineURL;
	if (education.onlineCourses.length > 0) {
		$("#education").append(HTMLonlineClasses);
		for (course in education.onlineCourses) {
			formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
			formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
			formattedOnlineSchoolTitle = formattedOnlineTitle + formattedOnlineSchool;
			formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
			formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);
			formattedOnlineURL = formattedOnlineURL.replace("%url%", education.onlineCourses[course].url);
			$("#education").append(HTMLschoolStart);
			$(".education-entry:last").append(formattedOnlineSchoolTitle);
			$(".education-entry:last").append(formattedOnlineDates);
			$(".education-entry:last").append(formattedOnlineURL);
		}
	}
};

/*
	Completed projects information entered in JSON format
*/
var projects = {
	"projects": [
		{
			"title": "Project 1 - Web Browser Homepage",
			"dates": "Fall 2014",
			"description": "This project involved the creation of a 'favorites' homepage.&nbsp; The first image shows a webpage optimized for display on a large monitor and includes current weather and time information.&nbsp; This webpage allows for changing the background image, color scheme and formatting by selecting from the choices at the bottom of the screen.&nbsp; The second and third images show a 'favorites' page variant designed for viewing on a large monitor and a laptop screen, respectively, with the format changing automatically based on the detected display width.",
			"images": ["images/project1_a_medium.png", "images/project1_b_med_monitor.png", "images/project1_b_med_laptop.png"],
			"image_descr": ["Favorites page with time, date, weather, and background changeability", "Favorites page for large monitor (autodetects display size)", "Favorites page for laptop/tablet (autodetects display size)"],
			"image_alt": ["Project 1 image 1", "Project 1 image 2", "Project 1 image 2"]
		},
		{
			"title": "Project 2 - Simple Webpage Design Based on Provided Mockup",
			"dates": "January 2015",
			"description": "This project involved the creation of a simple webpage based on a provided design mockup.",
			"images": ["images/project2_medium.png"],
			"image_descr": ["Simple webpage based on a provided design mockup"],
			"image_alt": ["Project 2 image"]
		},
	]
};
/*
	projects.display() method - used to add information about projects to webpage
*/
projects.display = function() {
	var formattedProjectTitle, formattedProjectDates, formattedProjectDescription, formattedProjectImage;
	for (project in projects.projects) {
		$("#projects").append(HTMLprojectStart);
		formattedProjectTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		formattedProjectDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
		formattedProjectDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
		$(".project-entry:last").append(formattedProjectTitle);
		$(".project-entry:last").append(formattedProjectDates);
		$(".project-entry:last").append(formattedProjectDescription);
		if (projects.projects[project].images.length > 0) {
			for (image in projects.projects[project].images) {
				formattedProjectImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
				formattedProjectImage = formattedProjectImage.replace("%title%", projects.projects[project].image_descr[image]);
				formattedProjectImage = formattedProjectImage.replace("%alt%", projects.projects[project].image_alt[image]);
				$(".project-entry:last").append(formattedProjectImage);
			}
		}
	}
}

/*
	method calls to build resume and add Google map
*/
bio.display();
work.displayHistory();
education.displayHistory();
projects.display();
$("#mapDiv").append(googleMap);