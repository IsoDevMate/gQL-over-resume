export const typeDefs = `#graphql
  type PersonalInfo {
  name: String!
  email: String!
  phoneNumber: String
  linkedIn: String
  github: String!
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
type Activitiies{
    activityName: String!
    description: String!
}

type Query {
    personalInfo: PersonalInfo!
    education: [Education!]!
    experience: [Experience!]!
    skills: [Skills!]!
    activities: [Activitiies!]!
    }
`;