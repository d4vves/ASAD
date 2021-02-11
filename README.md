# ASongADay
ASAD began as a humble email chain between friends where we are sent one song a day to listen to and discuss. Since its inception we have traversed over 600 songs and its membership has grown to dozens in size. 

As we approach the end of the year we all begin looking at the songs sent that year in whole to create our 'Best of 20XX' lists. The issue arose that around 75% of our songs can be found on Spotify, where we keep a running playlist of the ASADs and is the only place where we can easily view a list of all songs. This left 25% of our songs to be forgotten!

Forget no more, I said. This application will:
- using the Gmail API find the ASAD sent on todays date and parse the ASAD catalogue number, artist name, song title and release date.
- using the Spotify API find if the song exists on Spotify or not
- POST the data to  our database

Thus creating one place to view the entirety of our ASAD collection, Spotify be damned.