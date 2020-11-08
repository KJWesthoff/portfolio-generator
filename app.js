
const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

const printProfileData = profileDataArr => {
    // Jadda Jadda
    for(let i = 0; i < profileDataArr.length; i+=1){
        console.log(profileDataArr[i]);
    };

    console.log("=============================");

    profileDataArr.forEach((profileItem) => {
        // Same as jadda jadda
        console.log(profileItem)
        
    });
}; 


printProfileData(profileDataArgs);


