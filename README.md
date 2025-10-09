# GradTrack

A comprehensive graduate job application tracking and analysis tool to help manage your job search effectively.

## 🚀 Features

- **Job Analysis**: AI-powered analysis of job descriptions with fit scores and insights
- **Application Tracking**: Track all applications with detailed status updates
- **Deadlines Management**: Never miss important deadlines for assessments and interviews
- **Analytics Dashboard**: Visualize application progress with charts and metrics
- **Saved Jobs**: Bookmark opportunities for later review
- **Smart Search**: Find applications by company, role, or keywords

## 📁 Project Structure

```
GradTrack/
├── assets/
│   ├── css/
│   │   └── styles.css          # All styling (3,038 lines)
│   └── js/
│       └── app.js              # All JavaScript logic (5,315 lines)
├── index.html                   # Main HTML file (1,330 lines)
├── .gitignore                   # Git ignore rules
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js for analytics visualization
- **Backend**: Supabase for data storage
- **Date/Time**: Day.js for deadline management
- **Hosting**: Vercel

## 🌐 Local Development

1. Clone the repository:
```bash
git clone https://github.com/ogpheard/GradTrack.git
cd GradTrack
```

2. Open `index.html` in your browser or use a local server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 📦 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will automatically detect the configuration
4. Click "Deploy" - your site will be live in seconds!

## 📄 Key Pages

- **Analyse**: AI-powered job description analysis
- **My Applications**: View and manage all applications
- **Saved**: Bookmarked jobs for later
- **Deadlines**: Calendar and agenda views of upcoming deadlines
- **Analytics**: Visual insights into application patterns
- **Add Application**: Manual application entry
- **Add Deadline**: Create custom deadlines

## 🎯 Environment Modes

The app supports two environment modes:
- **Test**: For development and testing
- **Production**: For real application tracking

Switch between modes using the environment selector in the header.

## 📝 License

MIT License

## 👤 Author

Created by [@ogpheard](https://github.com/ogpheard)
