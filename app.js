const inquirer = require('inquirer');
const { prototype } = require('inquirer/lib/objects/choice');
const {writeFile, copyFile} = require('./utils/generate-site.js')

const generatePage = require('./src/page-template.js');






const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your name?',
            validate: nameInput => {
              if(nameInput){
                return true;
              } else {
                console.log("please enter your name");
                return false;
              }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter github user name',
            validate: nameInput => {
              if(nameInput){
                return true;
              } else {
                console.log("please enter your name");
                return false;
              }
            }
        },
        {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "About" section?',
          default: true,
           
        },
        {
          type: 'input',
          name: 'about',
          message: "type some info about",
          when: ({confirmAbout}) => {
            if(confirmAbout) {
              return true;
            } else {
              return false;
            }
          }
        }
    ]);
};



const promptProject = portfolioData => {
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }
    
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("please enter your name");
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
          if(nameInput){
            return true;
          } else {
            console.log("please enter your name");
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ]).then(projectData => {
      portfolioData.projects.push(projectData);
      if(projectData.confirmAddProject){
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
    })
    .then(pageHTML => {
      return writeFile(pageHTML);  
    })
    .then(writeFileReponse => {
      console.log(writeFileReponse);
      return copyFile();
    })
    .then(copyFileReponse => {
      console.log(copyFileReponse);
    })
    .catch(err => {
      console.log(err);
    });
  



  
