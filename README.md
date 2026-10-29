# Welcome to LED Robotics, team6722
# *This repository contains the content that is served on team6722.com.*

Hello! We are LED Robotics, Team 6722, a non-profit team of passionate engineers from Pasco County, Florida. We take part in both VEX competitions as well as the FIRST Robotics Competition. By training high school students in the fields of engineering such as designing, building, electrical and programming, we create unique robot designs to compete in each season's new engineering challenges and competitions. This repository contains our website, where we document our mission and core values more over. Thank you for your time!

# About our site.

**Website is built in CSS, JavaScript, and HTML.** Raw code versus the use of WordPress or similar tools is used for performance and ease of modification, aiding future development.

**Our goal is to stand professional,** while keeping the vibe of LED Robotics as a whole; encapsulating the humor of the team and supporting our expresses towards the FIRST philosophies of Gracious Professionalism. LED Robotics chose to use an "MIT" license to support FIRST's cooperative values; we also apply "Coopertition" to aid our peers.

**This repo serves as the replacement for the previous website;** the page was "recreated" from scratch. The previous one is hosted on GitHub [here.](https://github.com/LED-Robotics/led-robotics.github.io) Any more information? Contact us by our email [here](mailto:contact@team6722.com) or view [our website](https://team6722.com) for contact information.

***Please provide us suggestions or comments to what should we add or change;** We strive for constructive criticism of our code and work. Our goal is that the freshman with the same spark in his eyes for web development can build up from the base that we developed.*

***(Disclaimer: the website was created and developed by Preston Espinosa; my GitHub can be found [here](https://github.com/dapetonman) and any questions related to our website are to be addressed to the team directly; include my name and I will personally respond.)***

**More information about team6722 can be found at [our website](https://team6722.com);**

# Layout of code branches.
**STABLE/MAIN - DEVELOPMENT**

Stable - Stable is the newest version of the website, including the new features that may be added or removed in testing, but they are fully functional. This is pushed directly to Cloudflare under the "main" branch and served at our domain.

Development - Exclusively owned and privated by [dapetonman on GitHub.](https://github.com/dapetonman) Any code/collaboration requests are explained in our documentations. (documents haven't been finished yet, please contact me for info.)

# Local preview

This is a static HTML, CSS, and JavaScript site. You can open `index.html` directly for a quick preview, or serve the repository root locally:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

# Cloudflare Pages deployment

- Connect this repository to Cloudflare Pages and select the production branch.
- Leave the build command empty; there is no build step due to the nature of the website being built using raw code.
- Set the build output directory to `.` (the repository root).
- Confirm the proper security rules are set and the HTTPS requirement is active.
- The root `_headers` file defines response security headers and the Content Security Policy. Check the deployed response headers and browser console after each policy change. Alternatively, Cloudflare allows to modify some of these settings as well from the dashboard.
