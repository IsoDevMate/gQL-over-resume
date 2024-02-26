
const { ObjectId } = require("mongodb");


const {Experience,PersonalInfo,Resume,Education,Activities,Skills,Projects,User}=require('./models/schema')

console.log(User)
const resolvers = {
    //queries
    Query:{ 
        PersonalInfo: async (_, args) => {
            const personalInfo = await PersonalInfo.findOne({email: args.email});
            return { ...personalInfo._doc, _id: personalInfo.id };
           // return restaurants.map((r) => ({ ...r._doc 
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
        },
       User:async(_,args)=>{
          const user=await User.findOne({email:args.email});
          return user;

      }
    },
    
    
    //mutations
    Mutations:{
        createPersonalInfo: async (_, args) => {
            
          const { name, age, email, phoneNumber, linkedIn, githubUsername, githubProfileImage, personalSiteLink, currentCity, pets } = args;
              const newPersonalInfo = new PersonalInfo({
             name,
              age,
              email,
              phoneNumber,
              linkedIn,
              githubUsername,
              githubProfileImage,
              personalSiteLink,
              currentCity,
              pets
              });
        
              // Save the newPersonalInfo document to the database
              const savedPersonalInfo = await newPersonalInfo.save()
              .then (result => {
                console.log("PersonalInfo created successfully", result._doc)
                return { ...result._doc , _id: result.id};
               
            })
            .catch (err => {
              console.error("failled to create personalinfo", err)
              throw new Error(err);
               
            })
        
              return savedPersonalInfo;

          },
        async updatePersonalInfo(_, args) {
            const { age, email, githubProfileImage, personalSiteLink, currentCity, pets } = args;
            const result = await PersonalInfo.findOneAndUpdate({ email }, { age, email, githubProfileImage, personalSiteLink, currentCity, pets }, { new: true });
            if(!result) throw new Error('Personal Info not found');
            return result;
          },
         createEducation: async(_,args)=>{
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
          createuser: async (_, { input }) => {
            const { name, email, password,role=GUEST} = input;
            try {
              const user = await User.create(
                { name, email, password,role }
              );
              console.log(user); 
              return user;
            } catch (err) {
              throw new GraphQLError('Error creating user'); 
            }
          },


           /* async updateEducation(_,args){
                const educationindex=Education.findIndex(education=>education.institution===args.institution)
                if (educationindex === -1) throw new Error('INstitution not found')
                    const query = { _id: ObjectId(args.id) };
                    const update = await Education.updateOne(
                        query,
                       
                    );
                
                    if (update.acknowledged)
                        return await Education.findOne(query);
                        else
                        return null;
            }*/
     createExperience: async(_,args)=>{
            const newExperience=new Experience({
                company:args.company,
                position:args.position,
                startDate:args.startDate,
                endDate:args.endDate,
                responsibilities:args.responsibilities
            })
            await newExperience.save()
            return newExperience
        },
        async updateExperience(_, args) {
            const { company, position, startDate, endDate, responsibilities } = args;
            const result = await Experience.findOneAndUpdate({ company }, { company, position, startDate, endDate, responsibilities }, { new: true });
            if(!result) throw new Error('Experience not found');
            return result;
          },
      createProject: async (_, args) => {
            const { projectName, description, link } = args;
            const newProject = new Projects({
              projectName,
              description,
              link,
            });
            await newProject.save();
            return newProject;
          },
        updateProject: async (_, args) => {
            const { projectName, description, link } = args;
            const result = await Projects.findOneAndUpdate({ projectName }, { description, link }, { new: true });
            if(!result) throw new Error('Project not found');
            return result;
          },
          deleteProject: async (_, args) => {
            const { projectName } = args;
            const result = await Projects.findOneAndDelete({ projectName });
            if(!result) throw new Error('Project not found');
            return result;
          },
        createSkills: async(_,args)=>{
            const newSkills=new Skills({
                skillName:args.skillName,
                skillLevel:args.skillLevel
            })
            await newSkills.save()
            return newSkills
    },
      createpost: async (_, { input }) => {
        const { title, content, author } = input;
        const newPost = new Post({
          id: new ObjectId(),
          title,
          content,
          author,
        });
        await newPost.save();
        return newPost;
      }

}
}

module.exports=resolvers


