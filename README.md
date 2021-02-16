# ASongADay
ASAD began as a humble email chain between friends where we receive a song a day, listen to it and discuss. Since its inception we have traversed over 650 songs and its membership has grown to dozens in size. 

Each year we create our 'Best of 20XX' lists and needed a place to view ASAD in whole. The most convenient place to view the ASAD project was to create a Spotify playlist which we added to every day. As we progressed we found out that nearly 25% of the songs are not on the Spotify platform! These ASADs quickly became all but forgotten within the scope of the project.

Forget no more, I said.


### `seedAsad.js`
*yo dawg, I heard you like seeders, so we wrote a function to seed your seeder*
- `seedAsad.js` was written to handle the set up of the database.
- 1. Use the Gmail API to fetch a list of ASAD labeled emails from my inbox during a specifically determined time-frame.
- 2. Iterate over said list and hit the Gmail API again to get the email content from the first email in the thread.
- 3. Find the corresponding email for the next ASAD in line, set by their catalogue number and send date.
- 4. Parse the catalogue number, send date, artist name, song title and release date from the email subject line and date headers and content.
- 5. Use that information to hit the Spotify API to see if the song exists on Spotify or not. 
- 6. Write the results to `entries.json`

Then, in our seeder file we map over `entries.json` to create our `bulkInsert` array. Now that we've got all 650+ songs ready to get seeded into our database, whats next? 


### `postAsad.js`
*this place... seems familiar*
- `postAsad.js` was written to handle the daily addition of songs. It is quite similar to `seedAsad.js` but:
- 1. Use the Gmail API to fetch a list of recently sent ASAD labeled emails from my inbox.
- 2. Iterate over said list and hit the Gmail API again to get the email content from the first email in the thread.
- 3. Find the corresponding email for the next ASAD in line, set by their catalogue number and send date.
- 4. Parse the catalogue number, send date, artist name, song title and release date from the email subject line and date headers and content.
- 5. Use that information to hit the Spotify API to see if the song exists on Spotify or not. 
- 6. POST the results to our database.


### Next Steps
1. Continue writing out a front-end that has ample search, sort and pagination functionality.
2. Alter our `postAsad.js` function to also automatically add the song (if it exists on Spotify) to our main Spotify playlist.


Thus creating one place to view the entirety of our ASAD collection, Spotify be damned.
