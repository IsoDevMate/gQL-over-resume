//const {buildSchema,printSchema} = require('graphql');

const typeDefs = `#graphql
  type PersonalInfo {
  name: String!
  age: Int!
  email: String!
  phoneNumber: {type:String unique: true}
  linkedIn: String
  githubUsername: String!
  githubProfileImage: String!
  personalSiteLink: String
  currentCity: String!
  pets: [String!]!

}

type Education {
  institution: String!
  degree: String!
  fieldOfStudy: String!
  startDate: String!
  endDate: String
}

type Experience {
  company: String!
  position: String!
  startDate: String!
  endDate: String
  responsibilities: [String!]!
}

type Skills {
  skillName: String!
  proficiency: String!
}
type Activitiies{githubUsername - a string
    activityName: String!
    description: String!
}
type Projects{
    projectName: String!
    description: String!
    link: {type: String, required: true}

}

type Resume {
  personalInfo: PersonalInfo!
  education: [Education!]!
  experience: [Experience!]!
  skills: [Skills!]!
  activities: [Activitiies!]!
  projects: [Projects!]!
}

type Mutation {
  createPersonalInfo(name: String!, age: Int!, email: String!, phoneNumber: String, linkedIn: String, githubUsername: String!, githubProfileImage: String!, personalSiteLink: String, currentCity: String!, pets: [String!]!): PersonalInfo!
  updatePersonalInfo(name: String!, age: Int!, email: String!, phoneNumber: String, linkedIn: String, githubUsername: String!, githubProfileImage: String!, personalSiteLink: String, currentCity: String!, pets: [String!]!): PersonalInfo!

  createProject(projectName: String!, description: String!, link: {type: String, required: true}): Projects!
  updateProject(projectName: String!, description: String!, link: {type: String, required: true}): Projects!
  deleteProject(projectName: String!): Projects!

  createEducation(institution: String!, degree: String!, fieldOfStudy: String!, startDate: String!, endDate: String): Education!
  createActivity(githubUsername: String!, activityName: String!, description: String!): Activitiies!
  updateActivity(githubUsername: String!, activityName: String!, description: String!): Activitiies!

  createskills(skillName: String!, proficiency: String!): Skills!
  updateSkills(skillName: String!, proficiency: String!): Skills!

  createExperience(company: String!, position: String!, startDate: String!, endDate: String, responsibilities: [String!]!): Experience!
  updateExperience(company: String!, position: String!, startDate: String!, endDate: String, responsibilities: [String!]!): Experience!

  createResume(personalInfo: PersonalInfo!, education: [Education!]!, experience: [Experience!]!, skills: [Skills!]!, activities: [Activitiies!]!, projects: [Projects!]!): Resume!
  updateResume(personalInfo: PersonalInfo!, education: [Education!]!, experience: [Experience!]!, skills: [Skills!]!, activities: [Activitiies!]!, projects: [Projects!]!): Resume!

}
type Query {
    personalInfo: PersonalInfo!
    education: [Education!]!
    experience: [Experience!]!
    skills: [Skills!]!
    activities: [Activitiies!]!
    projects: [Projects!]!
    resume: Resume!
    }
  
`;

//const schema = buildSchema(typeDefs);
//console.log(printSchema(schema));
module.exports = { typeDefs };