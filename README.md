# vigilantioe-app

### VigilantIOE SPA Exercise: GET, parse, and display system data from Graphite JSON request to chart.js graphs.

## REQUIREMENTS:

1. Using a JavaScript framework of your choice, create a single page application that does the following: Using the targets below make API calls to graphite and return performance data . 


2. The web page should include: 

	a. One line graph 

	b. One Pie Chart. 

	c. One line and pie chart is the minimum , not maximum. Add as many charts and other types of charts you want! 

		i. A heavy focus of VigilantIoE is connecting people processes (IoE) with device data (IoT). We’re predominantly in the telecom space currently and have a large focus on how we visualize data to users and how they can interact with it. 

	d. One selector to change targets in one chart. 

	e. Auto-refreshing options 

		i. Controlled by a drop-down menu with the options of 5 minutes, 30 minutes, and 1 hour. 

		ii. Only the data in the panel should refresh. 

	f. Time period selector 

		i. Controlled by a drop down menu that pulls data from the following presets: 

			1. Last hour 

			2. Last 7 days 

			3. 30 Days until yesterday 

3. Store your code on a public Git repository (GitHub, Bitbucket, GitLab, etc) . 

	a. Deploy your application to a cloud platform such as Heroku 

4. Create a ‘readme’ file with instructions on how to run your application locally.


# README:
#### REQUIREMENTS:
###### npm

## Step1

### Installation

###### Create Directory

> mkdir projectName

###### Move into new directory 

> cd projectName

###### clone github repo

> git clone https://www.github.com/DevLab2020/vigilantioe-app

###### move to new directory

> cd vigilantioe-app

###### Run Application

> npm run start	

###### Open browser and visit this url:

> http://localhost:3000
