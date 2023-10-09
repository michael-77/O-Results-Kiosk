# O-Results-Kiosk
Userscript for turning SITiming HTML results into a kiosk mode

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Allow local file access if wanting to display locally exported results.
   - Chrome > More Tools > Extensions
   - For Tampermoney click "Details"
   - Switch on "Allow access to file URLs"
3. Download the [User Script from github](https://github.com/michael-77/O-Results-Kiosk/raw/main/kiosk.user.js) and install
4. Export results from SITiming to folder called `latest-results`. If using a local folder you should set the "Override CSS URL" setting to `./skin/` and include the skin files (from `Actions > Skins Zip File`) there.
5. Open the results page with a web browser.
6. To paginate the results append `#page=1` to the end of the url. The default is 4 courses per page but this can be amended using `&courses=3` etc.
7. For a more bespoke view you can use `#start=3&end=5` to display, say, the third to fifth courses inclusive.
8. `time=33` changes the time taken for a scroll cycle and `cycles=2` changes the number of scroll cycles before a reload.
9. Use `F11` to make the display full screen.
