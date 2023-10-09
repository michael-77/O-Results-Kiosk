# O-Results-Kiosk
Userscript for turning SITiming HTML results into a kiosk mode

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Allow local file access if wanting to display locally exported results.
   - Chrome > More Tools > Extensions
   - For Tampermoney click "Details"
   - Switch on "Allow access to file URLs"
3. Download the [User Script from github](https://github.com/michael-77/O-Results-Kiosk/raw/main/kiosk.user.js) and install
4. Export results from SITiming to folder called "latest-results"
5. To paginate the results append "#page=1" to the end of the url once opened. The default is 4 courses per page.
6. For a more bespoke view you can use "#start=1&end=5" to display the first to fifth courses inclusive.
