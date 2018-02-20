class reportsController {
	constructor(){
		this.showBasicReport = false;
		this.theLogin = theLogin;
		this.formattedUnassignedTimes = this.formatUnassignedTimes();
		this.formattedProjects = this.formatProjects();
	}
	
	formatProjects(){
		let projectArray = this.theLogin.allMyProjects;
		let formattedProjectArray = [];
		let formattedTimes = [];
		for(let aProject of projectArray){
			for(let aTime of aProject.allMyTimes){
				let formattedTime = this.makeTimeReadable(aTime);
				formattedTimes.push(formattedTime);

			}
			let formattedProject = {id:aProject.id,projectName:aProject.projectName,allMyTimes:formattedTimes,allMyTags:aProject.allMyTags,login:aProject.login}
			formattedProjectArray.push(formattedProject);
			formattedTimes = [];
		}
		return formattedProjectArray;
	}

	
	makeTimeReadable(aTime){
		let theID = aTime.id;
		let startTime = new Date(aTime.startTime);
		let endTime = new Date(aTime.endTime);
		let formattedStartTime = startTime.toString();
		let formattedEndTime = endTime.toString();
		let formattedTime = {id:theID,startTime:formattedStartTime,endTime:formattedEndTime}
		return formattedTime;
	}
	
	toggleBasicReport(){
		if(this.showBasicReport === true){
			this.showBasicReport = false;
		}else{
			this.showBasicReport = true;
		}
	}
	
	formatUnassignedTimes(){
		let timesArray = this.theLogin.unassignedTimes;
		let formattedTimesArray = [];
		for(let aTime of timesArray){
			let formattedTime = this.makeTimeReadable(aTime);
			formattedTimesArray.push(formattedTime);
		}
		console.log(formattedTimesArray);
		return formattedTimesArray;
	}
};

