### bolle-sdk
Wilkommen in der doc :)

```javascript
async function get() {
  let bc = new bolleClient('mustermann.max, 'asas');
  await bc.login();

  let client = await bc.loadCourse(0);
  // bestimmten Kurs laden
  
  console.log(test.eintraege[0]);
  //aus gespeicherten Kusen Eintrag laden
  
   console.log(test.eintraege[0]);
  //aus gespeicherten Eintrag laden
  
   console.log(test. simpleBolleGETRequest);
  //gibt zürück ob man angemeldet ist
  
   console.log(test. loadProfil());
  //gibt alle USER-Daten im json Format zürück
}
get();

//PS: du brauchst dann auch await
```
