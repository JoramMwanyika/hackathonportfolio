Thought for 2 seconds### Joram Mwanyika Portfolio

## Project Documentation

This repository contains the source code for Joram Mwanyika's professional portfolio website, designed to showcase skills, projects, and experience as an Automation Specialist. The portfolio is built using HTML, CSS, and SQL, adhering to hackathon requirements of not using JavaScript or PHP.





## Table of Contents

- [Project Overview](#project-overview)
- [Technical Specifications](#technical-specifications)
- [File Structure](#file-structure)
- [Installation Guide](#installation-guide)
- [Database Setup](#database-setup)
- [Customization](#customization)
- [Maintenance](#maintenance)
- [Browser Compatibility](#browser-compatibility)
- [Performance Optimization](#performance-optimization)
- [Contact](#contact)


## Project Overview

This portfolio website serves as a professional showcase for Joram Mwanyika, featuring:

- Professional introduction and biography
- Skills and technical expertise visualization
- Educational background
- Work Experience
- Volunteering
- Project showcase with detailed descriptions
- Personal interests
- Contact form with database integration (Not fully integrated)
- Resume download functionality
- Social media integration


The design follows modern web standards with a focus on responsiveness, accessibility, and visual appeal.

## Technical Specifications

### Technologies Used

- **HTML5**: Semantic markup for structure and content
- **CSS3**: Advanced styling including:

- Flexbox and Grid layouts
- CSS animations and transitions
- Custom properties (variables)
- Media queries for responsive design



- **SQL**: Database structure for storing:

- Contact form submissions
- Project information
- Skills and proficiency data



- **External Resources**:

- Font Awesome (v6.4.0) for iconography
- Google Fonts (Poppins, Space Grotesk) for typography





### Key Features

- **Responsive Design**: Adapts to all screen sizes (mobile, tablet, desktop)
- **Animated Elements**: Subtle animations for enhanced user experience
- **Database Integration**: SQL database for storing and retrieving data
- **Accessibility**: Semantic HTML and appropriate color contrast
- **Cross-Browser Compatibility**: Tested on major browsers


## File Structure

```plaintext
hackathon-portfolio/
├── index.html              # Main HTML document
├── css/
│   └── style.css           # CSS stylesheet
├── assets/
│   ├── profile.jpeg        # Profile image
│   ├── project1.jpg        # Project images
│   ├── project2.jpg
│   ├── project3.jpg
│   └── joram_mwanyika_resume.pdf  # Downloadable resume
└── database_setup.sql      # SQL database setup script
```

## Installation Guide

### Prerequisites

- Web server (Apache, Nginx, etc.) or local development environment
- MySQL database server (version 5.7+ recommended)
- MySQL client or administration tool (MySQL Workbench, phpMyAdmin, etc.)


### Setup Steps

1. **Clone the repository**:

```shellscript
https://github.com/JoramMwanyika/hackathonportfolio.git
cd hackathonportfolio
```


2. **Configure web server**:

1. Point your web server to the root directory of the project
2. Ensure the server has read permissions for all files



3. **Upload files** (if deploying to remote server):

1. Use FTP, SFTP, or your preferred method to upload all files to your hosting server
2. Maintain the directory structure as shown above



4. **Verify installation**:

1. Navigate to the website URL in your browser
2. Confirm all pages load correctly and images display properly





## Database Setup

### Database Configuration

1. **Create MySQL database**:

```sql
CREATE DATABASE portfolio_db;
USE portfolio_db;
```


2. **Import database schema**:

```shellscript
mysql -u username -p portfolio_db < database_setup.sql
```

Replace `username` with your MySQL username.


3. **Verify database setup**:

```sql
SHOW TABLES;
SELECT * FROM projects;
SELECT * FROM skills;
```




### Database Tables

The database includes the following tables:

- **contacts**: Stores form submissions from visitors
- **projects**: Contains project information displayed on the portfolio
- **skills**: Stores skill names, categories, and proficiency levels
- **users**: (Optional) For admin access if needed in the future


### Database Views

- **project_details**: Provides formatted project information
- **skills_by_category**: Groups skills by their categories for easier retrieval


## Customization

### Content Customization

1. **Personal Information**:

1. Edit the `index.html` file to update name, title, description, and contact details
2. Replace profile image in the `assets` folder



2. **Projects**:

1. Update project information in the HTML or in the database
2. Replace project images in the `assets` folder



3. **Skills and Education**:

1. Modify the skills section in HTML to reflect current expertise
2. Update education cards with relevant educational background





### Visual Customization

1. **Color Scheme**:

1. Edit the CSS variables in the `:root` section of `style.css`:


```css
:root {
  --primary: #7e22ce;  /* Primary purple */
  --primary-light: #a855f7;
  --primary-dark: #6b21a8;
  /* Additional color variables */
}
```


2. **Typography**:

1. Change the Google Fonts import at the top of `style.css`
2. Update font-family properties throughout the stylesheet



3. **Layout Adjustments**:

1. Modify grid and flexbox properties in `style.css` to adjust layouts
2. Adjust padding, margins, and spacing as needed





## Maintenance

### Regular Updates

1. **Content Updates**:

1. Regularly update project information as new projects are completed
2. Keep skills and proficiency levels current



2. **Database Maintenance**:

1. Periodically check contact form submissions
2. Back up the database regularly
3. Optimize database tables if performance issues arise





### Troubleshooting

Common issues and solutions:

1. **Images not displaying**:

1. Verify file paths in HTML
2. Check file permissions on the server
3. Ensure image files are properly uploaded



2. **Database connection issues**:

1. Verify database credentials
2. Check MySQL server status
3. Ensure proper permissions are set for the database user



3. **Responsive design issues**:

1. Test on multiple devices and browsers
2. Use browser developer tools to identify CSS conflicts





## Browser Compatibility

This portfolio has been tested and optimized for:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest version)
- Mobile browsers (iOS Safari, Android Chrome)


## Performance Optimization

The following optimizations have been implemented:

1. **CSS Optimization**:

1. Efficient selectors and minimal nesting
2. Reusable utility classes
3. Optimized animations for performance



2. **Image Optimization**:

1. Appropriately sized images for different viewports
2. Proper image formats for web display



3. **HTML Optimization**:

1. Semantic HTML for better SEO and accessibility
2. Minimal DOM nesting for improved rendering


Here is the link to my hosted portfolio, feel free to go through it: [portfolio](https://startling-malabi-df7f5b.netlify.app/)


## Contact

For questions, issues, or contributions to this portfolio project:

**Joram Mwanyika**

- Email: [jorammwanyika@gmail.com](mailto:jorammwanyika@gmail.com)
- LinkedIn: [Joram Nyamawi Mwanyika](https://www.linkedin.com/in/joram-nyamawi-mwanyika-03b383282)
- GitHub: [JoramMwanyika](https://github.com/JoramMwanyika)
- WhatsApp: +254794728645


---

© 2025 Joram Nyamawi Mwanyika. All rights reserved.