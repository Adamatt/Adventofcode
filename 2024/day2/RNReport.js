
export default class RNReport {

	gapMin = 1
	gapMax = 3
	unsafeTolerance = 1
	
	value = []
	isSafe = undefined
	
	constructor(reportArray){
		this.value = reportArray
		this.isSafe = this.checkSafety()
	}

	checkSafety(report=this.value, toleranceLevel=this.unsafeTolerance){
		let expectedVariation = Math.sign(report[1]-report[0]) // Getting weither it's increasing or decreasing

		for(let i=1; i<report.length; i++){

			let gap = Math.abs(report[i]-report[i-1]) // Calculating the difference between a pair
			let currentVariation = Math.sign(report[i]-report[i-1]) // Calculating the variation between a pair

			if(expectedVariation!=currentVariation // Comparing the current level variation against the expected variation
				|| gap > this.gapMax || gap < this.gapMin){ // And comparing the current gap against the min/max accepted values

				if(toleranceLevel==0)return false

				// If we still tolerate removing 1 more element, we keep trying to find one safe combination
				let altReports = this.generateAltReports(report)

				for(let y=0; y<altReports.length; y++){ 
					if(this.checkSafety(altReports[y], toleranceLevel-1))return true // If at least one sub-report is safe, return true immediatly
				}

				return false
			}
		}
		return true
	}

	// Generate reports with all combination while removing one element each time 
	generateAltReports(report){ 
		return report.map((level, index)=>report.toSpliced(index, 1))
	}

}

