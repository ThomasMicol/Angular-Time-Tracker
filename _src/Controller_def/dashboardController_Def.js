const MILLI_COUNT = 1000;

class dashboardController { 
	constructor($interval){
		this.$interval = $interval;
		this.totalMilliseconds = 0;
		this.theLogin = theLogin;
		this.timerActive = false;
		this.unassignedTimes = this.theLogin.unassignedTimes;
		this.allMyProjects = this.theLogin.allMyProjects;
		this.activeProject = null;
		this.activeTimeEdit = null;
	}
	
	startTimer () { 
		let dash = this;
		
		if(!this.timerActive){
			if(this.totalMilliseconds > 0){
				this.totalMilliseconds = 0;
			}
			this.timerActive = true;
			let startTime = Date.now();
			this.promise = this.$interval(function(){
				dash.totalMilliseconds += TIME_INCREMENT;}
			,TIMER_DELAY);
		}else{
			this.timerActive = false;
			this.$interval.cancel(this.promise);
			let endTime = Date.now();
			let endString = new Date(endTime);
			let startTime = (endTime - this.totalMilliseconds);
			this.theLogin.createNewTime(startTime, endTime);
		}
	}


	
	deleteUnassignedTimes(targetTime){
		let targetIndex = this.theLogin.unassignedTimes.indexOf(targetTime);
		this.theLogin.unassignedTimes.splice(targetIndex, 1);
	}
	
	editStartTime(){
		let alteredDate = document.getElementById('editStartDate').value;
		let alteredTime = document.getElementById('editStartTime').value;
		let newDate = this.formatDate(alteredDate,alteredTime);
		let newStartTime = Date.parse(newDate);
		for(let aTime of this.activeProject.allMyTimes){
			if(aTime.id === this.activeTimeEdit.id){
				aTime.startTime = newStartTime;
				aTime.totalDuration = Math.floor(Math.abs((aTime.endTime - aTime.startTime) / MILLI_COUNT));
			}
		}
	}
	
	editEndTime(){
		let alteredDate = document.getElementById('editEndDate').value;
		let alteredTime = document.getElementById('editEndTime').value;
		let newDate = this.formatDate(alteredDate,alteredTime);
		let newEndTime = Date.parse(newDate);
		for(let aTime of this.activeProject.allMyTimes){
			if(aTime.id === this.activeTimeEdit.id){
				aTime.endTime = newEndTime;
				aTime.totalDuration = Math.floor(Math.abs((aTime.endTime - aTime.startTime) / MILLI_COUNT));
			}
		}
	}
	
	
	setActiveTimeEdit(aTime){
		this.activeTimeEdit = aTime;

	}
	
	setTimeTitle(){
		let newTitle = document.getElementById('editTimeName').value;
		for(let aTime of this.activeProject.allMyTimes){
			if(aTime.id === this.activeTimeEdit.id){
				aTime.title = newTitle;
			}
		}
	}
	
	formatDate(dateValue, timeValue){
		let splitDateArray = dateValue.split("-");
		let splitTimeArray = timeValue.split(":");
		let year = Number(splitDateArray[0]);
		let month = Number(splitDateArray[1] - 1);
		let day = Number(splitDateArray[2]);
		let hour = Number(splitTimeArray[0]);
		let minute = Number(splitTimeArray[1]);
		let fullDate = new Date(year, month, day, hour, minute);
		return fullDate;
	}
	

	
	
	createNewUnassignedTime(){
		let newStartDate = document.getElementById('newStartTimeDate').value;
		let newStartTime = document.getElementById('newStartTimeTime').value;
		let newEndDate = document.getElementById('newEndTimeDate').value;
		let newEndTime = document.getElementById('newEndTimeTime').value;
		let startDate = this.formatDate(newStartDate, newStartTime);
		let endDate = this.formatDate(newEndDate, newEndTime);
		this.theLogin.createNewTime(startDate, endDate);
	}
	
	
	createNewProject () { 
		console.log("In the create new project")
		let newProjectName = document.getElementById('newProjectName').value;
		document.getElementById('newProjectName').value = ''
		this.theLogin.createNewProject(newProjectName);
	}
	
	assignTime (targetProject, theTime) {
		targetProject.allMyTimes.push(theTime);
		let targetIndex = this.theLogin.unassignedTimes.indexOf(theTime);
		this.theLogin.unassignedTimes.splice(targetIndex, 1);
	}
	
	setActive (targetId) {
		let theProject = this.theLogin.findTarget(targetId, PROJECT_IDENTIFIER);
		if(theProject === this.theLogin.activeProject){
			this.theLogin.activeProject = null
			this.theProjectName = ''
			return;
		}
		this.theProjectName = theProject.projectName;
		this.theLogin.activeProject = theProject;
		this.activeProject = theProject;
	}
	
	submitTaskName (theTime) { 
		theTime.title = document.getElementById('newTaskName').value;
	}
	
	editProjectName (targetId) { 
		let newProjectName = document.getElementById('editedProjectName').value
		let theProject = this.$scope.theLogin.findTarget(targetId, PROJECT_IDENTIFIER);
		theProject.projectName = newProjectName;
	}
	
	deleteProject (targetObject) { 
		let targetIndex = this.theLogin.allMyProjects.indexOf(targetObject);
		if(targetObject === this.theLogin.activeProject){
			this.theLogin.activeProject = null;
		}
		this.theLogin.allMyProjects.splice(targetIndex, 1);
	}
	
	submitTagName () {
		let newTagName = document.getElementById('newTagName').value;
		this.theLogin.createNewTag(newTagName);
	}
	
	assignTagToTime(aTime, newTag){
		for(let aTag of aTime.allMyTags){
			if(aTag.ID === newTag.ID){
				console.log('This Project already has this tag');
				return;
			}
		}
		console.log("No duplicates found")
		aTime.allMyTags.push(newTag);
	}
	
	assignTagToProject(aProject, newTag){
		for(let aTag of aProject.allMyTags){
			if(aTag.ID === newTag.ID){
				return;
			}
		}
		aProject.allMyTags.push(newTag);
	}
	
}



class filter_hhmmssmm{
	constructor(){
		return function (time) {
			let mill_num = parseInt(time, 10); 
			let hours   = Math.floor(mill_num / 360000);
			let minutes = Math.floor((mill_num - (hours * 360000)) / 6000);
			let seconds = Math.floor((mill_num - (hours * 360000) - (minutes * 6000)) / 100);
			let milliseconds = mill_num - (hours * 3600000) - (minutes * 6000) - (seconds * 100);

			if (hours   < 10) {
				hours   = "0"+hours;
			}
			if (minutes < 10) {
				minutes = "0"+minutes;
			}
			if (seconds < 10) {
				seconds = "0"+seconds;
			}
			if(milliseconds < 10){
				milliseconds = "0"+milliseconds;
			}
			
			time = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
			return time;
		}
	}
}



	