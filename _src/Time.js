class Time{
	constructor(newId, newStartTime, newEndTime, newRawStartDate, newRawStartTime, newRawEndDate, newRawEndTime){
		this.id = newId;
		this.allMyTags = [];
		this.startTime = newStartTime;
		this.endTime = newEndTime;
		this.totalDuration = (this.endTime - this.startTime) / 100
		this.title = '';
		this.project  = null;
	}
}