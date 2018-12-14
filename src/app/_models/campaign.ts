export class Campaign {
    constructor(
        public campaignName:String,
        public campaignDesc:String,
        public campaignFile:String,
        public status:Number,
        public industries:string[],
        public salesOwner:String,
        public usOnly:boolean
    ){}
}
