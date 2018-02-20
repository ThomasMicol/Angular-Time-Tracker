class Login{
	constructor (){
		this.currentProjectId = 0
		this.currentTagId = 0;
		this.currentTimeId = 0;
		this.allMyProjects = [];
		this.allMyTags = [];
		this.unassignedTimes = [];
		this.activeProject = null;
	}
	
	createNewProject(projectName){
		let anId = this.getNewId(PROJECT_IDENTIFIER);
		let newProject = new Project(anId, projectName, this);
		this.allMyProjects.push(newProject);
	}
	
	editProjectName(targetProject, newName){
		returnedProject = this.findTarget(targetProject, PROJECT_IDENTIFIER);
		
	}
	

	createNewTime(startTime, endTime){
		let newTime = new Time(this.getNewId(TIME_IDENTIFIER), startTime, endTime);
		if(this.activeProject === null){
			this.unassignedTimes.push(newTime);
		}else{
			this.activeProject.allMyTimes.push(newTime);
			console.log(this.activeProject);
		}
		
	}
	

	createNewTag(tagName){
		let newTag = new Tag(this.getNewId(PROJECT_IDENTIFIER),tagName);
		this.allMyTags.push(newTag);
	}
	
	editTagName(targetTag, newName){
		returnedTag = this.findTarget(targetTag, TAG_IDENTIFIER);
	}
	
	deleteTag(targetTag){
		
	}
	
	findTarget(targetId, typeIdentifier){
		if(typeIdentifier === PROJECT_IDENTIFIER){
			for(let aProject of this.allMyProjects){
				if(aProject.id === targetId){
					return aProject;
				}
			}
		}
		if(typeIdentifier === TAG_IDENTIFIER){
			for(let aTag of this.allMyTag){
				if(aTag.id === targetId){
					return aTag;
				}
			}
		}
		if(typeIdentifier === TIME_IDENTIFIER){
			for(let aTime of this.unassignedTimes){
				if(aTime.id === targetId){
					return aTime;
				}
			}
		}
	}
	
	getNewId(typeIdentifier){
		if(typeIdentifier === PROJECT_IDENTIFIER){
			let newId = this.currentProjectId;
			this.currentProjectId += 1;
			return newId;
		}
		if(typeIdentifier === TAG_IDENTIFIER){
			let newId = this.currentTagId;
			this.currentTagId += 1;
			return newId;
		}
		if(typeIdentifier === TIME_IDENTIFIER){
			let newId = this.currentTimeId;
			this.currentTimeId += 1;
			return newId;
		}
		
	}
	
}