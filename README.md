# team6722
# *This repository contains the content that is served on team6722.com.*

Hello! We are LED Robotics, Team 6722, a non-profit team of passionate engineers from Pasco County, Florida. We take part in both VEX competitions as well as the FIRST Robotics Competition. By training high school students in the fields of engineering such as designing, building, electrical and programming, we create unique robot designs to compete in each season's new engineering challenges and competitions. This repository contains our website, where we document our mission and core values more over. Thank you for your time!

# ABOUT WEBSITE

1. Website is built in CSS, JavaScript, and HTML. Raw code is used for performance and ease of modification, aiding future development.

2. This website is professional, while keeping the vibe of LED-Robotics as a whole; encapsulating the humor of the team!

3. This website was recreated from scratch. The previous one is hosted at: (https://github.com/LED-Robotics/led-robotics.github.io)

4. Please provide me suggestions or comments to what should I add or change; I am always up for constructive critic reviews of my code and work. The goal is that the freshman with the same spark in his eyes for web development can build up from this.

**More information is found below;**

# LAYOUT
**RELEASE - STABLE - DEVELOPMENT**

Release - Updated almost never, only for major releases.

Stable - Stable is the newest version of the website, including the new features that may be added or removed in testing but they are fully functional.

Development - Exclusively owned and privated by dapetonman on GitHub.

# Local preview

This is a static HTML, CSS, and JavaScript site. You can open `index.html` directly for a quick preview, or serve the repository root locally to test nested pages and response behavior:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

# Cloudflare Pages deployment

- Connect this repository to Cloudflare Pages and select the production branch.
- Leave the build command empty; there is no build step.
- Set the build output directory to `.` (the repository root).
- Confirm the production custom domain and HTTPS are active.
- The root `_headers` file defines response security headers and the Content Security Policy. Check the deployed response headers and browser console after each policy change.
