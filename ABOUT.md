Stock Tracker
-------------
Tracks stocks and will let you group them together.

Should have:
- Text box that will search for a ticker
- Area for chart
- Place to add multiple tickers
- Be able to turn off and on lines
- Group tickers together to see their performance

### Plans

Version 1:
[X] Search bar for ticker
[X] Chart for ticker data

Version 2:
[ ] Set up Redux for one ticker's data
    [ ] Move data formatting logic into sagas
[X] Have Column to store past searches
[X] Store data for multiple tickers

Version 3:
[X] Have Different Time periods
[X] Option to Normalize Data (just view percentage)
[X] Have different colors for tickers/lines

Version 4:
[ ] Group tickers into folders
    [ ] Combine their data
    [ ] View only folder specific data
[ ] Ability to name folders
[ ] Delete folders

Command to deploy to gh-pages:
git subtree push --prefix build/ origin gh-pages
