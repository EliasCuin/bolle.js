
# Betterbolle.js Documentation
![A BetterBolle Project](https://ibb.co/1LHNX4z)
A little Documentation about betterbolle.js


## Before reading this

This is not a project from Bolle Software (https://bolle-software.de/) - it is an unofficial project to automatically retrieve data from this website.


As you will surely notice afterwards, many functionalities of this sdk are still missing. Also, the code is unfortunately very unclean.

❗❗**There will therefore be a completely rewritten sdk in the future.**❗❗
## Installation

Install betterbolle.js with npm (Will only work in the new version not yet released)

```bash
  npm install betterbolle.js
```


## Usage

Example with usage of "async" and "await" 

```javascript
async function main()() {
 
  let client = new bolleClient("Account Name", 'Account Password');
  await bc.login();

  //Load the course with the ID 0. ID 0 represent all courses 
  let course = await bc.loadCourse(0);

  /* 
    Load a course from a specific course id 
    * You can find out a course's id by looking 
      at BetterBolle's URL while on a course page
  */
  

  eintrag.eintraege[0]
  // Returns an array with the Course  
  
   console.log(test. simpleBolleGETRequest);
  // Returns a bool that determines if your sessions is still valid
  
   console.log(test.loadProfil());
  // Returns a JSON with all Profil informations. 
}
main()();

```
