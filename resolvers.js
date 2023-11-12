
const { ObjectId } = require("mongodb");


const {Experience,PersonalInfo,Resume,Education,Activities,Skills}=require('./models/schema')

const resolvers = {
    //queries
    Query:{ 
        PersonalInfo: async (_, args) => {
            const personalInfo = await PersonalInfo.findOne({email: args.email});
            return personalInfo;
        },
        Education: async (_, args) => {
            const education = await Education.findOne({institution: args.institution});
            return education;
        },
        Experience: async (_, args) => {
            const experience = await Experience.findOne({company: args.company});
            return experience;
        },
        Skills: async (_, args) => {
            const skills = await Skills.findOne({skillName: args.skillName});
            return skills;
        },
        Activities: async (_, args) => {
            const activities = await Activities.findOne({activityName: args.activityName});
            return activities;
        },
        Projects:async(_,args)=>{
            const projects=await Projects.findOne({projectName:args.projectName});
            return projects;
        },
        Resume:async(_,args)=>{
            const resume=await Resume.findOne({email:args.email});
            return resume;
        }
    },
    
    //mutations
    Mutations:{
       async createPersonalInfo(_,args){
            const newPersonalInfo=new PersonalInfo({
                name:args.name,
                age:args.age,
                email:args.email,
                phoneNumber:args.phoneNumber,
                linkedIn:args.linkedIn,
                githubUsername:args.githubUsername,
                githubProfileImage:args.githubProfileImage,
                personalSiteLink:args.personalSiteLink,
                currentCity:args.currentCity,
                pets:args.pets
            })
            await newPersonalInfo.save()
            return newPersonalInfo
        },
      async  updatePersonalInfo(_,args){
           const query = { _id: ObjectId(args.id) };
            const update = await PersonalInfo.updateOne(
                query,
                { $set: { ...args } }
              );
        
              if (update.acknowledged)
                return await PersonalInfo.findOne(query);
                else
                return null;
        },
         async createEducation(_,args){
                const newEducation=new Education({
                 institution:args.institution,
                 degree:args.degree,
                 fieldOfStudy:args.fieldOfStudy,
                 startDate:args.startDate,
                 endDate:args.endDate
                })
                await newEducation.save()
                return newEducation
          },
            async updateEducation(_,args){
                const educationindex=Education.findIndex(education=>education.institution===args.institution)
                if (educationindex === -1) throw new Error('INstitution not found')
                    const query = { _id: ObjectId(args.id) };
                    const update = await Education.updateOne(
                        query,
                        { $set: { ...args } }
                    );
                
                    if (update.acknowledged)
                        return await Education.findOne(query);
                        else
                        return null;
            },
       async createExperience(_,args){
            const newExperience=new Experience({
                company:args.company,
                position:args.position,
                startDate:args.startDate,
                endDate:args.endDate,
                responsibilities:args.responsibilities
            })
            await newExperience.save()
            return newExperience
        }

    }
}